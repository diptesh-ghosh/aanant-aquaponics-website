import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  try {
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
    
    // Get location from query params
    const url = new URL(req.url)
    const location = url.searchParams.get('location')
    
    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      )
    }
    
    // Get the latest AQI reading for the specified location
    const { data, error } = await supabase
      .from('aqi_readings')
      .select('*')
      .eq('location', location)
      .order('timestamp', { ascending: false })
      .limit(1)
    
    if (error) {
      console.error('Error fetching AQI data:', error)
      return NextResponse.json(
        { error: 'Failed to fetch AQI data' },
        { status: 500 }
      )
    }
    
    if (!data || data.length === 0) {
      // If no data exists, return simulated data
      if (location.toLowerCase() === 'delhi') {
        return NextResponse.json({
          current_aqi: 280,
          pm25: 168,
          pm10: 336,
          location: 'Delhi',
          timestamp: new Date().toISOString(),
          status: 'Very Unhealthy',
          simulated: true
        })
      } else if (location.toLowerCase() === 'aanant' || location.toLowerCase() === 'aanant home') {
        return NextResponse.json({
          current_aqi: 15,
          pm25: 5,
          pm10: 10,
          location: 'Aanant Home',
          timestamp: new Date().toISOString(),
          status: 'Good',
          simulated: true
        })
      } else {
        return NextResponse.json(
          { error: 'No AQI data found for the specified location' },
          { status: 404 }
        )
      }
    }
    
    // Determine AQI status
    let status = 'Unknown'
    const aqi = data[0].current_aqi
    
    if (aqi <= 50) status = 'Good'
    else if (aqi <= 100) status = 'Moderate'
    else if (aqi <= 150) status = 'Unhealthy for Sensitive Groups'
    else if (aqi <= 200) status = 'Unhealthy'
    else if (aqi <= 300) status = 'Very Unhealthy'
    else status = 'Hazardous'
    
    return NextResponse.json({
      ...data[0],
      status
    })
  } catch (error) {
    console.error('Error handling AQI request:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    )
  }
}