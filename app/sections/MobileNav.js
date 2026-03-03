"use client";

import { useState } from "react";
import { playAuthActionSfx } from "../lib/actionSfx";

export default function MobileNav() {
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
    <div className="nav-mobile" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
      <button className="nav-mobile-close" type="button" aria-label="Close menu">
        ✕
      </button>
      <a className="nav-mobile-link" href="#hero">
        <span className="nm-num">01</span> Home
      </a>
      <a className="nav-mobile-link" href="#wifeday">
        <span className="nm-num">02</span> Wife Day
      </a>
      <a className="nav-mobile-link" href="#letter">
        <span className="nm-num">03</span> Letter
      </a>
      <a className="nav-mobile-link" href="#reasons">
        <span className="nm-num">04</span> Reasons
      </a>
      <a className="nav-mobile-link" href="#promises">
        <span className="nm-num">05</span> Promises
      </a>
      <a className="nav-mobile-link" href="#notes">
        <span className="nm-num">06</span> Notes
      </a>
      <a className="nav-mobile-link" href="#story">
        <span className="nm-num">07</span> Our Story
      </a>
      <a
        className="nav-mobile-link"
        href="/login"
        onClick={handleLogout}
        aria-disabled={isLoggingOut ? "true" : "false"}
        style={isLoggingOut ? { pointerEvents: "none", opacity: 0.7 } : undefined}
      >
        <span className="nm-num">08</span> {isLoggingOut ? "Logging out..." : "Logout"}
      </a>
    </div>
  );
}
