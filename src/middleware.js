import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("middleware executed");
  const secret = process.env.NEXTAUTH_SECRET;
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: secret });

  const publicPaths = [
    "/videos/",
    "/api/auth/",
    "/_next/static/",
    "/favicon.ico",
    "/login",
    "/home",
    "/about-us",
    "/contact",
    "/locations",
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isPublicPath && !token && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname === "/locations") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/locations")) {
    const pathSegments = pathname.split("/");
    const locationIdFromPath = pathSegments[2];

    if (locationIdFromPath === "unauthorized") {
      return NextResponse.next();
    }

    if (locationIdFromPath) {
      const locationIdNumber = parseInt(locationIdFromPath, 10);
      if (!token || (token && token.locationId !== locationIdNumber)) {
        console.warn(`User does not have correct authorization`);
        return NextResponse.redirect(
          new URL("/locations/unauthorized", req.url)
        );
      }
    } else {
      console.warn("No locationId provided in the path");
      return NextResponse.redirect(new URL("/locations", req.url));
    }
  }
  console.log("Token found, proceeding to next reponse");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/locations/:path*",
    "/login",
    "/((?!_next/static|_next/image|favicon.ico|api).*)/",
  ],
};
