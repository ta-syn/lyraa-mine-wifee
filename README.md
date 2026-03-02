# Wifee

A private, login-protected Next.js website with a personalized “Wife Day” experience.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- ESLint 9

## Requirements

- Node.js 20+
- npm

## Environment Variables

Create `.env.local` in the project root:

```env
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
AUTH_COOKIE_VALUE=wifee-authorized
```

- `LOGIN_USERNAME` and `LOGIN_PASSWORD` are required.
- `AUTH_COOKIE_VALUE` is optional (default: `wifee-authorized`).

## Available Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Authentication Flow

- Public routes: `/login`, `/api/auth/login`, `/api/auth/logout`
- Protected routes: all other routes
- Auth cookie name: `wifee_auth`
- Unauthenticated users are redirected to `/login?next=<requested-path>`

## Main App Sections

The homepage is composed from section components under `app/sections/`, including:

- Hero, Countdown, Wife Day, Reasons, Timeline
- Notes, Promises, Memories, Stats
- Letter, Quote, Marquee, Closing, Footer

## Project Structure

- `app/page.js` — protected main page
- `app/login/page.js` — login screen
- `app/api/auth/login/route.js` — login API
- `app/api/auth/logout/route.js` — logout API
- `app/sections/*` — homepage sections
- `proxy.js` — auth gate and redirect logic
- `public/image/*` — image assets
- `public/song/*` — audio assets

## Notes

- Keep secrets in `.env.local` only.
- If auth values change, restart the dev server.
