# Wifee

Private Next.js website with a login gate and an authenticated main page experience.

## Requirements

- Node.js 20+
- npm

## Environment Variables

Create a `.env.local` file in the project root:

```env
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
AUTH_COOKIE_VALUE=wifee-authorized
```

Notes:
- `LOGIN_USERNAME` and `LOGIN_PASSWORD` are required for login.
- `AUTH_COOKIE_VALUE` is optional. If omitted, `wifee-authorized` is used.

## Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Auth Flow

- Public paths: `/login`, `/api/auth/login`, `/api/auth/logout`
- Other paths require the `wifee_auth` cookie
- Unauthorized users are redirected to `/login?next=<requested-path>`

## Key Files

- `proxy.js`: route protection and redirect behavior
- `app/login/page.js`: login UI and submit handling
- `app/api/auth/login/route.js`: credential validation and auth cookie set
- `app/api/auth/logout/route.js`: auth cookie clear
