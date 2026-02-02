import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

// If Clerk is not configured, use a simple passthrough middleware
function simpleMiddleware(req: NextRequest) {
  // Block dashboard access if Clerk is not configured
  if (isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

// Check if Clerk is configured
const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default hasClerkKey
  ? clerkMiddleware(async (auth, req) => {
      const { userId, redirectToSignIn } = await auth()

      if (!userId && isProtectedRoute(req)) {
        return redirectToSignIn()
      }

      return NextResponse.next()
    })
  : simpleMiddleware

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
}
