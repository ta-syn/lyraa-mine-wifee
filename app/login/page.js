"use client";

import { useEffect, useState } from "react";
import { playAuthActionSfx } from "../lib/actionSfx";

export default function LoginPage() {
  const [showEntryLoader, setShowEntryLoader] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowEntryLoader(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    playAuthActionSfx("login");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Login failed");
        setLoading(false);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/";
      window.sessionStorage.setItem("wifee_login_celebration", "1");
      window.sessionStorage.setItem("wifee_login_celebration_until", String(Date.now() + 10000));
      window.location.href = nextPath;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (showEntryLoader) {
    return (
      <div id="loader" role="status" aria-live="polite" aria-label="Loading login page">
        <div id="lcanv" aria-hidden="true" />
        <div className="ld-wrap">
          <div className="ld-ring" aria-hidden="true">
            <div className="ld-ring-inner">
              <span className="ld-ico">💖</span>
            </div>
          </div>
          <h2 className="ld-names">
            Yuki <em>&amp;</em> Lyraa
          </h2>
          <p className="ld-sub">Preparing your private space...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-right" aria-hidden="true">
        <div className="auth-brand-wrap">
          <div className="auth-brand-top">A private love story, written only for you</div>
          <div className="auth-brand-main">
            <span className="auth-name yuki">Yuki</span>
            <span className="auth-amp">&amp;</span>
            <span className="auth-name lyraa">Lyraa</span>
          </div>
          <div className="auth-brand-bottom">March 4, 2026 · Forever</div>
        </div>
      </section>

      <section className="auth-left">
        <div className="auth-shell">
          <span className="auth-eyebrow">Our Private Space</span>
          <h1 className="auth-title">Welcome, mine love</h1>
          <p className="auth-subtitle">Enter your credentials to open the story of us.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="auth-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />

            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <div className="auth-password-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="auth-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="auth-pass-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      d="M3 3l18 18m-9-3c-4.8 0-8.7-2.7-10.5-6 1-1.9 2.5-3.6 4.5-4.7m4.5-1.3c4.8 0 8.7 2.7 10.5 6-.7 1.4-1.7 2.7-3 3.7M9.9 9.9A3 3 0 0012 15a3 3 0 002.1-.9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      d="M2.5 12S6.3 5.5 12 5.5 21.5 12 21.5 12 17.7 18.5 12 18.5 2.5 12 2.5 12Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>

            {error ? <p className="auth-error">{error}</p> : null}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Unlocking..." : "Enter Our Story"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
