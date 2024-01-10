import { withAuth } from "next-auth/middleware";
import { Roles } from "./types/roles.type";
import { Pages } from "./types/pages.type";

const isAuthorisedForPages: Record<string, string[]> = {
  [Roles.USER]: [Pages.HOME],
  [Roles.ADMIN]: [Pages.HOME],
};
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) {
          return req.nextUrl.pathname === Pages.LOGIN;
        } else {
          return req.nextUrl.pathname === Pages.LOGIN || isAuthorisedForPages["USER"]?.some((item) => req.nextUrl.pathname.startsWith(item));
        }
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
