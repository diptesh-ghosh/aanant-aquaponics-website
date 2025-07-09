// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/runtime/manual/getting_started/setup_your_environment

import { serve } from "npm:@hono/node-server";
import { Hono } from "npm:hono";
import { Stripe } from "npm:stripe@13.9.0";

const app = new Hono();

// Initialize Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Get the webhook signing secret from environment variables
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

app.get("/", (c) => {
  return c.text("Stripe webhook endpoint is running!");
});

app.options("*", (c) => {
  return c.text("", { headers: corsHeaders });
});

app.post("/", async (c) => {
  try {
    const signature = c.req.header("stripe-signature");
    
    if (!signature) {
      return c.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const body = await c.req.text();
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return c.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
    }

    // Create a Supabase client
    const supabaseAdmin = await createClient(supabaseUrl, supabaseServiceKey);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        
        // Handle course enrollment
        if (session.metadata?.type === "course") {
          await handleCourseEnrollment(supabaseAdmin, session);
        }
        
        // Handle product purchase
        if (session.metadata?.type === "product") {
          await handleProductPurchase(supabaseAdmin, session);
        }
        
        // Handle service booking
        if (session.metadata?.type === "service") {
          await handleServiceBooking(supabaseAdmin, session);
        }
        
        // Handle visit booking
        if (session.metadata?.type === "visit") {
          await handleVisitBooking(supabaseAdmin, session);
        }
        
        break;
      }
      
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        
        // Record the payment
        await recordPayment(supabaseAdmin, paymentIntent);
        
        break;
      }
      
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        
        // Handle subscription
        await handleSubscription(supabaseAdmin, subscription);
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (err) {
    console.error(`Error processing webhook: ${err.message}`);
    return c.json({ error: `Error processing webhook: ${err.message}` }, { status: 500 });
  }
});

// Helper functions
async function createClient(supabaseUrl: string, supabaseKey: string) {
  const { createClient } = await import("npm:@supabase/supabase-js@2");
  return createClient(supabaseUrl, supabaseKey);
}

async function handleCourseEnrollment(supabase, session) {
  const userId = session.client_reference_id;
  const courseId = session.metadata.courseId;
  
  // Create enrollment record
  await supabase.from("enrollments").insert({
    user_id: userId,
    course_id: courseId,
    enrollment_date: new Date().toISOString(),
    progress: 0,
  });
  
  // Update user's enrolledCourses array
  const { data: profile } = await supabase
    .from("profiles")
    .select("enrolledCourses")
    .eq("id", userId)
    .single();
  
  if (profile) {
    const enrolledCourses = profile.enrolledCourses || [];
    if (!enrolledCourses.includes(courseId)) {
      await supabase
        .from("profiles")
        .update({ 
          enrolledCourses: [...enrolledCourses, courseId] 
        })
        .eq("id", userId);
    }
  }
}

async function handleProductPurchase(supabase, session) {
  const userId = session.client_reference_id;
  const items = JSON.parse(session.metadata.items || "[]");
  
  // Create order record
  await supabase.from("orders").insert({
    user_id: userId,
    items: items,
    total: session.amount_total,
    status: "processing",
  });
  
  // Clear cart items
  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);
}

async function handleServiceBooking(supabase, session) {
  const userId = session.client_reference_id;
  const serviceId = session.metadata.serviceId;
  const bookingDate = session.metadata.bookingDate;
  
  // Create service booking record
  await supabase.from("service_bookings").insert({
    user_id: userId,
    service_id: serviceId,
    booking_date: bookingDate,
    status: "confirmed",
    payment_status: "paid",
  });
}

async function handleVisitBooking(supabase, session) {
  const userId = session.client_reference_id;
  const locationId = session.metadata.locationId;
  const visitDate = session.metadata.visitDate;
  const groupSize = session.metadata.groupSize || 1;
  
  // Create visit booking record
  await supabase.from("visit_bookings").insert({
    user_id: userId,
    location_id: locationId,
    date: visitDate,
    status: "confirmed",
    group_size: groupSize,
    payment_status: "paid",
  });
}

async function recordPayment(supabase, paymentIntent) {
  const userId = paymentIntent.metadata?.userId;
  
  if (userId) {
    // Record payment
    await supabase.from("payments").insert({
      user_id: userId,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      stripe_payment_id: paymentIntent.id,
    });
  }
}

async function handleSubscription(supabase, subscription) {
  const userId = subscription.metadata?.userId;
  
  if (userId) {
    // Update user's subscription status
    await supabase
      .from("profiles")
      .update({ 
        subscription_status: subscription.status,
        subscription_id: subscription.id,
        subscription_data: subscription
      })
      .eq("id", userId);
  }
}

serve({
  fetch: app.fetch,
  port: 8000,
});