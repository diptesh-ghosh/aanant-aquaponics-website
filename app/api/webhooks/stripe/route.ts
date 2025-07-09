import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Handle course enrollment
        if (session.metadata?.type === 'course') {
          await handleCourseEnrollment(supabase, session)
        }
        
        // Handle product purchase
        if (session.metadata?.type === 'product') {
          await handleProductPurchase(supabase, session)
        }
        
        // Handle service booking
        if (session.metadata?.type === 'service') {
          await handleServiceBooking(supabase, session)
        }
        
        // Handle visit booking
        if (session.metadata?.type === 'visit') {
          await handleVisitBooking(supabase, session)
        }
        
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Record the payment
        await recordPayment(supabase, paymentIntent)
        
        break
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Handle subscription
        await handleSubscription(supabase, subscription)
        
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 })
  }
}

// Helper functions
async function handleCourseEnrollment(supabase: any, session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id
  const courseId = session.metadata?.courseId
  
  if (!userId || !courseId) return
  
  // Create enrollment record
  await supabase.from('enrollments').insert({
    user_id: userId,
    course_id: courseId,
    enrollment_date: new Date().toISOString(),
    progress: 0,
  })
  
  // Update user's enrolledCourses array
  const { data: profile } = await supabase
    .from('profiles')
    .select('enrolledCourses')
    .eq('id', userId)
    .single()
  
  if (profile) {
    const enrolledCourses = profile.enrolledCourses || []
    if (!enrolledCourses.includes(courseId)) {
      await supabase
        .from('profiles')
        .update({ 
          enrolledCourses: [...enrolledCourses, courseId] 
        })
        .eq('id', userId)
    }
  }
}

async function handleProductPurchase(supabase: any, session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id
  const items = JSON.parse(session.metadata?.items || '[]')
  
  if (!userId || !items.length) return
  
  // Create order record
  await supabase.from('orders').insert({
    user_id: userId,
    items: items,
    total: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
    status: 'processing',
  })
  
  // Clear cart items
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
}

async function handleServiceBooking(supabase: any, session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id
  const serviceId = session.metadata?.serviceId
  const bookingDate = session.metadata?.bookingDate
  
  if (!userId || !serviceId || !bookingDate) return
  
  // Create service booking record
  await supabase.from('service_bookings').insert({
    user_id: userId,
    service_id: serviceId,
    booking_date: bookingDate,
    status: 'confirmed',
    payment_status: 'paid',
  })
}

async function handleVisitBooking(supabase: any, session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id
  const locationId = session.metadata?.locationId
  const visitDate = session.metadata?.visitDate
  const groupSize = session.metadata?.groupSize || 1
  
  if (!userId || !locationId || !visitDate) return
  
  // Create visit booking record
  await supabase.from('visit_bookings').insert({
    user_id: userId,
    location_id: locationId,
    date: visitDate,
    status: 'confirmed',
    group_size: parseInt(groupSize as string),
    payment_status: 'paid',
  })
}

async function recordPayment(supabase: any, paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata?.userId
  
  if (!userId) return
  
  // Record payment
  await supabase.from('payments').insert({
    user_id: userId,
    amount: paymentIntent.amount / 100, // Convert from cents
    status: paymentIntent.status,
    stripe_payment_id: paymentIntent.id,
  })
}

async function handleSubscription(supabase: any, subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  
  if (!userId) return
  
  // Update user's subscription status
  await supabase
    .from('profiles')
    .update({ 
      subscription_status: subscription.status,
      subscription_id: subscription.id,
      subscription_data: subscription
    })
    .eq('id', userId)
}