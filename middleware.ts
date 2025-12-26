import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAdminApiRoute = request.nextUrl.pathname.startsWith("/api/admin");

  // Check token for admin routes
  if (isAdminRoute || isAdminApiRoute) {
    // Require ADMIN_TOKEN to be set
    if (!adminToken) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    const token = request.nextUrl.searchParams.get("token");

    // Check if token is valid
    if (token === adminToken) {
      return NextResponse.next();
    }

    // For API routes, return 401
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For page routes, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
