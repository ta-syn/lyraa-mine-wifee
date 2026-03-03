"use client";

import { useState } from "react";
import { playAuthActionSfx } from "../lib/actionSfx";

export default function NavBar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    if (isLoggingOut) return;
    playAuthActionSfx("logout");

    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <nav id="nav" aria-label="Primary navigation">
      <a className="nav-logo" href="#hero">
        Yuki <span>&amp;</span> Lyraa
      </a>
      <div className="nav-links">
        <a className="nav-link active" href="#hero">
          Home
        </a>
        <a className="nav-link" href="#wifeday">
          Wife Day
        </a>
        <a className="nav-link" href="#letter">
          Letter
        </a>
        <a className="nav-link" href="#reasons">
          Reasons
        </a>
        <a className="nav-link" href="#promises">
          Promises
        </a>
        <a className="nav-link" href="#notes">
          Notes
        </a>
        <a className="nav-link" href="#story">
          Story
        </a>
      </div>
      <button
        className="nav-cta nav-logout"
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Logout"
      >
        <span className="nav-cta-dot" />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
      <button className="nav-burger" id="burger" type="button" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
