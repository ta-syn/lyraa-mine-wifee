"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      window.location.href = nextPath;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

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
          <h1 className="auth-title">Welcome, my love</h1>
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
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

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
