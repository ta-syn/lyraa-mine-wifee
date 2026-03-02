# 💖 Wifee

> A private, login-protected Next.js website crafted for a personalized **Wife Day** experience.

---

## 📌 Contents

- [✨ Highlights](#-highlights)
- [🧰 Tech Stack](#-tech-stack)
- [✅ Requirements](#-requirements)
- [🚀 Quick Start](#-quick-start)
- [🔑 Environment Variables](#-environment-variables)
- [📜 Scripts](#-scripts)
- [🛡️ Authentication Flow](#️-authentication-flow)
- [🧩 Homepage Sections](#-homepage-sections)
- [📁 Project Structure](#-project-structure)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📝 Notes](#-notes)

## ✨ Highlights

- 🔐 Cookie-based authentication with protected routes
- 🎉 Beautiful multi-section romantic landing page
- 🎵 Support for local image and song assets
- ⚡ Built with latest Next.js App Router setup

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Linting | ESLint 9 |

## ✅ Requirements

- Node.js 20+
- npm

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after the dev server starts.

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
LOGIN_USERNAME=your_username
LOGIN_PASSWORD=your_password
AUTH_COOKIE_VALUE=wifee-authorized
```

- `LOGIN_USERNAME` → required
- `LOGIN_PASSWORD` → required
- `AUTH_COOKIE_VALUE` → optional (default: `wifee-authorized`)

## 📜 Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## 🛡️ Authentication Flow

- Public routes: `/login`, `/api/auth/login`, `/api/auth/logout`
- All other routes are protected
- Auth cookie name: `wifee_auth`
- Unauthorized access redirects to: `/login?next=<requested-path>`

## 🧩 Homepage Sections

Homepage content is modular and managed from `app/sections/`:

- Hero, Countdown, Wife Day, Reasons, Timeline
- Notes, Promises, Memories, Stats
- Letter, Quote, Marquee, Closing, Footer

## 📁 Project Structure

```text
app/
  page.js
  login/page.js
  api/auth/login/route.js
  api/auth/logout/route.js
  sections/*
public/
  image/*
  song/*
proxy.js
```

## 🛠️ Troubleshooting

- If `next dev` shows lock error (`Unable to acquire lock at .next/dev/lock`), another dev server is already running.
- To free the port and restart cleanly:

```bash
lsof -iTCP:3000 -sTCP:LISTEN -n -P
kill -9 <PID>
npm run dev
```

## 📝 Notes

- Keep credentials only in `.env.local`
- Restart server after changing environment values
- Do not commit secret values to git
