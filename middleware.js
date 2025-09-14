import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes you want to protect
const ProtectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/editor(.*)",
  "/api/(.*)", // 👈 protect all API routes
]);

export default clerkMiddleware(async (auth, req) => {
  if (ProtectedRoutes(req)) {
    const session = await auth();
    if (!session.userId) {
      return session.redirectToSignIn();
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard(.*)", "/editor(.*)", "/api/(.*)"],
};
