// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/runtime/manual/getting_started/setup_your_environment

import { serve } from "npm:@hono/node-server";
import { Hono } from "npm:hono";

const app = new Hono();

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

app.get("/", async (c) => {
  try {
    // Create a Supabase client
    const supabaseAdmin = await createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch AQI data from external API
    // This is a placeholder - in a real implementation, you would fetch from an actual AQI API
    const delhiAQI = await fetchDelhiAQI();
    const aanantAQI = await fetchAanantAQI();
    
    // Store the data in Supabase
    await storeAQIData(supabaseAdmin, delhiAQI, aanantAQI);
    
    return c.json({ 
      success: true, 
      message: "AQI data fetched and stored successfully",
      data: { delhiAQI, aanantAQI }
    });
  } catch (err) {
    console.error(`Error fetching AQI data: ${err.message}`);
    return c.json({ error: `Error fetching AQI data: ${err.message}` }, { status: 500 });
  }
});

app.options("*", (c) => {
  return c.text("", { headers: corsHeaders });
});

// Helper functions
async function createClient(supabaseUrl: string, supabaseKey: string) {
  const { createClient } = await import("npm:@supabase/supabase-js@2");
  return createClient(supabaseUrl, supabaseKey);
}

async function fetchDelhiAQI() {
  // In a real implementation, you would fetch from an actual AQI API
  // This is a placeholder that simulates Delhi's typically high AQI
  const baseAQI = 280;
  const variation = Math.floor(Math.random() * 60) - 30; // ±30 variation
  const currentAQI = Math.max(200, baseAQI + variation);
  
  return {
    current_aqi: currentAQI,
    pm25: currentAQI * 0.6, // Approximate PM2.5 based on AQI
    pm10: currentAQI * 1.2, // Approximate PM10 based on AQI
    location: "Delhi",
    timestamp: new Date().toISOString()
  };
}

async function fetchAanantAQI() {
  // This is a placeholder that simulates Aanant's consistently low AQI
  const baseAQI = 15;
  const variation = Math.floor(Math.random() * 4) - 2; // ±2 variation
  const currentAQI = Math.max(10, baseAQI + variation);
  
  return {
    current_aqi: currentAQI,
    pm25: 5, // Consistently low PM2.5
    pm10: 10, // Consistently low PM10
    location: "Aanant Home",
    timestamp: new Date().toISOString()
  };
}

async function storeAQIData(supabase, delhiAQI, aanantAQI) {
  // Store Delhi AQI
  await supabase.from("aqi_readings").insert([delhiAQI]);
  
  // Store Aanant AQI
  await supabase.from("aqi_readings").insert([aanantAQI]);
  
  // Limit stored readings to most recent 100 per location to prevent database bloat
  const { data: delhiReadings } = await supabase
    .from("aqi_readings")
    .select("id")
    .eq("location", "Delhi")
    .order("timestamp", { ascending: false })
    .range(100, 1000); // Get readings beyond the 100 most recent
  
  const { data: aanantReadings } = await supabase
    .from("aqi_readings")
    .select("id")
    .eq("location", "Aanant Home")
    .order("timestamp", { ascending: false })
    .range(100, 1000); // Get readings beyond the 100 most recent
  
  // Delete older readings
  if (delhiReadings && delhiReadings.length > 0) {
    const delhiIdsToDelete = delhiReadings.map(reading => reading.id);
    await supabase.from("aqi_readings").delete().in("id", delhiIdsToDelete);
  }
  
  if (aanantReadings && aanantReadings.length > 0) {
    const aanantIdsToDelete = aanantReadings.map(reading => reading.id);
    await supabase.from("aqi_readings").delete().in("id", aanantIdsToDelete);
  }
}

serve({
  fetch: app.fetch,
  port: 8000,
});