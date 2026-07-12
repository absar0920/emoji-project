import { NextRequest, NextResponse } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = await decrypt(req.cookies.get(SESSION_COOKIE)?.value);
  const authed = session?.sub === "superadmin";

  if (!authed && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  if (authed && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
