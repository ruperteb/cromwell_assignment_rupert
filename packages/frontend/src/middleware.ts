import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { VerifyResponse } from "./lib/definitions";

// Specifying public and private routes
const userRoutes = ["/profile"];
const adminRoutes = ["/users"];
/* const publicRoutes = ["/login", "/register", "/", "about"]; */

export default async function middleware(req: NextRequest) {
  // Checking the status of current route
  const path = req.nextUrl.pathname;
  const isUserRoute = userRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);
  /* const isPublicRoute = publicRoutes.includes(path); */

  // Verifying existing token (if present). This function call should be cached
  let session: VerifyResponse | undefined;
  const reqHeaders = await headers();
  try {
    const verify = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify`,
      {
        // By default, cookies are not passed in a server-side fetch call for security reasons
        headers: reqHeaders,
      }
    );
    session = await verify.json();
  } catch (e) {
    console.error(e);
  }

  // Removing session cookie if verification fails
  const cookieStore = await cookies();
  if (!session?.isAuth) {
    cookieStore.delete("session");
  }

  // Redirect to /login if the user is not authenticated
  if (isUserRoute && !session?.isAuth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAdminRoute && !(session?.role === "admin")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Could potentially have other redirects if the user is authenticated e.g.
  /*   if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  } */

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
