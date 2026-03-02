import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "wifee_auth_v2";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const validUsername = process.env.LOGIN_USERNAME;
    const validPassword = process.env.LOGIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json({ error: "Server auth is not configured." }, { status: 500 });
    }

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const cookieValue = process.env.AUTH_COOKIE_VALUE || "wifee-authorized";
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
