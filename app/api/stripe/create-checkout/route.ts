import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: Record<string, any>) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: Record<string, any>) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get request body
    const { items, type, successUrl, cancelUrl, metadata = {} } = await req.json()
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required and must be an array' },
        { status: 400 }
      )
    }
    
    // Create line items for Stripe
    const lineItems = await Promise.all(items.map(async (item: any) => {
      // For courses and bundles, use the stripe_price_id if available
      if (type === 'course' || type === 'bundle') {
        const table = type === 'course' ? 'courses' : 'course_bundles'
        const { data } = await supabase
          .from(table)
          .select('stripe_price_id')
          .eq('id', item.id)
          .single()
        
        if (data?.stripe_price_id) {
          return {
            price: data.stripe_price_id,
            quantity: item.quantity || 1,
          }
        }
      }
      
      // For products and services, use the stripe_price_id if available
      if (type === 'product' || type === 'service') {
        const table = type === 'product' ? 'products' : 'services'
        const { data } = await supabase
          .from(table)
          .select('stripe_price_id')
          .eq('id', item.id)
          .single()
        
        if (data?.stripe_price_id) {
          return {
            price: data.stripe_price_id,
            quantity: item.quantity || 1,
          }
        }
      }
      
      // If no stripe_price_id is available, create a price on the fly
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity || 1,
      }
    }))
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/checkout/cancel`,
      client_reference_id: session.user.id,
      metadata: {
        type,
        ...metadata,
      },
    })
    
    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}