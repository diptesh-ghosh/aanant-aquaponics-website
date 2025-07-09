import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, any>) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: Record<string, any>) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  // Check for protected routes that require authentication
  const authRequiredPaths = [
    '/dashboard',
    '/analytics',
    '/analytics/advanced',
  ]

  const url = new URL(request.url)
  const isProtectedRoute = authRequiredPaths.some(path => 
    url.pathname === path || url.pathname.startsWith(`${path}/`)
  )

  if (isProtectedRoute) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Redirect to login if no session is found
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // For admin-only routes, check if user has admin role
    const adminOnlyPaths = [
      '/analytics',
      '/analytics/advanced',
    ]

    const isAdminRoute = adminOnlyPaths.some(path => 
      url.pathname === path || url.pathname.startsWith(`${path}/`)
    )

    if (isAdminRoute) {
      // Get user profile to check role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        // Redirect to dashboard if user is not an admin
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return response
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}