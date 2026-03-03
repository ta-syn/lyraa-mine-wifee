"use client";

import { useEffect, useState } from "react";
import ClosingSection from "./sections/ClosingSection";
import CountdownSection from "./sections/CountdownSection";
import FooterSection from "./sections/FooterSection";
import HeroSection from "./sections/HeroSection";
import LetterSection from "./sections/LetterSection";
import Marquee from "./sections/Marquee";
import MemoriesSection from "./sections/MemoriesSection";
import MobileNav from "./sections/MobileNav";
import NavBar from "./sections/NavBar";
import NotesSection from "./sections/NotesSection";
import PromisesSection from "./sections/PromisesSection";
import QuoteSection from "./sections/QuoteSection";
import ReasonsSection from "./sections/ReasonsSection";
import StatsSection from "./sections/StatsSection";
import TimelineSection from "./sections/TimelineSection";
import WifeDaySection from "./sections/WifeDaySection";

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const listeners = [];
    const intervals = [];
    const timeouts = [];
    const rafs = [];

    const addListener = (target, type, handler, options) => {
      if (!target) return () => {};
      target.addEventListener(type, handler, options);
      const off = () => target.removeEventListener(type, handler, options);
      listeners.push(off);
      return off;
    };

    const addInterval = (fn, delay) => {
      const id = window.setInterval(fn, delay);
      intervals.push(() => window.clearInterval(id));
      return id;
    };

    const addTimeout = (fn, delay) => {
      const id = window.setTimeout(fn, delay);
      timeouts.push(() => window.clearTimeout(id));
      return id;
    };

    const addRaf = (fn) => {
      const id = window.requestAnimationFrame(fn);
      rafs.push(() => window.cancelAnimationFrame(id));
      return id;
    };

    const shouldCelebrate = window.sessionStorage.getItem("wifee_login_celebration") === "1";
    const storedCelebrationUntil = Number(window.sessionStorage.getItem("wifee_login_celebration_until") || "0");
    const fallbackCelebrationUntil = Date.now() + 10000;
    const celebrationUntilAt = storedCelebrationUntil > Date.now() ? storedCelebrationUntil : fallbackCelebrationUntil;
    const celebrationDurationMs = shouldCelebrate ? Math.max(0, celebrationUntilAt - Date.now()) : 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let musicOn = true;
    let sfxEnabled = true;
    let celebrationActive = shouldCelebrate;
    let deferMusicUntilCelebrationEnds = shouldCelebrate;
    let lastScrollSfxAt = 0;
    let lastScrollY = window.scrollY;
    let hasUserActivatedMedia = false;
    let celebrationLoopIntervalId = null;
    let celebrationLoopStarted = false;

    const ensureBgMusic = () => {
      const audio = document.getElementById("bg-music");
      if (!(audio instanceof HTMLAudioElement)) return null;
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.42;
      return audio;
    };

    const ensureEffectAudio = (id, volume) => {
      const audio = document.getElementById(id);
      if (!(audio instanceof HTMLAudioElement)) return null;
      audio.preload = "auto";
      if (typeof volume === "number") audio.volume = volume;
      return audio;
    };

    const unlockMedia = async () => {
      if (hasUserActivatedMedia) return true;
      const candidates = [
        ensureBgMusic(),
        ensureEffectAudio("sfx-click", 0.5),
        ensureEffectAudio("sfx-scroll", 0.34),
        ensureEffectAudio("sfx-celebration", 0.74),
      ].filter(Boolean);

      if (!candidates.length) return false;

      let playedAtLeastOne = false;
      await Promise.all(
        candidates.map(async (audio) => {
          const prevMuted = audio.muted;
          audio.muted = true;
          try {
            await audio.play();
            playedAtLeastOne = true;
            audio.pause();
            audio.currentTime = 0;
          } catch {
          } finally {
            audio.muted = prevMuted;
          }
        }),
      );

      if (playedAtLeastOne) {
        hasUserActivatedMedia = true;
      }
      return hasUserActivatedMedia;
    };

    const playEffect = (id, { volume, rate = 1, reset = true } = {}) => {
      if (!sfxEnabled || !hasUserActivatedMedia) return;
      const audio = ensureEffectAudio(id);
      if (!audio) return;
      if (typeof volume === "number") audio.volume = volume;
      audio.playbackRate = rate;
      if (reset) audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const playClickSfx = (interactive = false) => {
      playEffect("sfx-click", { volume: interactive ? 0.5 : 0.4, rate: interactive ? 1.02 : 0.96 });
    };

    const playCardSfx = () => {
      playEffect("sfx-click", { volume: 0.56, rate: 0.93 });
    };

    const playButtonSfx = () => {
      playEffect("sfx-click", { volume: 0.58, rate: 1.06 });
    };

    const playScrollSfx = (deltaY) => {
      const strength = Math.min(1, Math.max(0, deltaY / 140));
      const volume = 0.18 + strength * 0.14;
      const rate = 0.9 + strength * 0.16;
      playEffect("sfx-scroll", { volume, rate });
    };

    const playCelebrationSfx = () => {
      playEffect("sfx-celebration", { volume: 0.8, rate: 1, reset: true });
    };

    const startCelebrationLoop = () => {
      if (!celebrationActive || !hasUserActivatedMedia) return;
      if (celebrationLoopStarted) return;
      celebrationLoopStarted = true;
      playCelebrationSfx();
      celebrationLoopIntervalId = window.setInterval(() => {
        if (!celebrationActive) return;
        playCelebrationSfx();
      }, 980);
      intervals.push(() => {
        if (celebrationLoopIntervalId !== null) {
          window.clearInterval(celebrationLoopIntervalId);
          celebrationLoopIntervalId = null;
        }
      });
    };

    const playBackgroundSong = async () => {
      const audio = ensureBgMusic();
      if (!audio) return false;
      audio.muted = false;
      try {
        await audio.play();
        return true;
      } catch {
        return false;
      }
    };

    const pauseBackgroundSong = () => {
      const audio = ensureBgMusic();
      if (!audio) return;
      audio.pause();
    };

    if (shouldCelebrate) {
      window.sessionStorage.removeItem("wifee_login_celebration");
      window.sessionStorage.removeItem("wifee_login_celebration_until");
      pauseBackgroundSong();
      addTimeout(() => setShowCelebration(true), 0);
      addTimeout(() => {
        unlockMedia().then((unlocked) => {
          if (unlocked && celebrationActive) {
            startCelebrationLoop();
          }
        });
      }, 0);
      addTimeout(() => {
        setShowCelebration(false);
        celebrationActive = false;
        deferMusicUntilCelebrationEnds = false;
        if (celebrationLoopIntervalId !== null) {
          window.clearInterval(celebrationLoopIntervalId);
          celebrationLoopIntervalId = null;
        }
        if (musicOn) {
          playBackgroundSong().catch(() => {});
        }
      }, celebrationDurationMs);
    }

    const updateCountdown = () => {
      const target = new Date(2026, 2, 4, 0, 0, 0, 0).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - target);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };

      setText("cd-d", d.toString().padStart(3, "0"));
      setText("cd-h", h.toString().padStart(2, "0"));
      setText("cd-m", m.toString().padStart(2, "0"));
      setText("cd-s", s.toString().padStart(2, "0"));
    };
    updateCountdown();
    addInterval(updateCountdown, 1000);

    const setupScrollProgress = () => {
      const bar = document.getElementById("scroll-prog");
      if (!bar) return;

      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        bar.style.transform = `scaleX(${ratio})`;
      };

      addListener(window, "scroll", update);
      addListener(window, "resize", update);
      update();
    };
    setupScrollProgress();

    const setupNav = () => {
      const burger = document.getElementById("burger");
      const mobileNav = document.getElementById("mobile-nav");
      const nav = document.getElementById("nav");
      const closeBtn = mobileNav?.querySelector(".nav-mobile-close");

      const closeNav = () => {
        mobileNav?.classList.remove("open");
        burger?.setAttribute("aria-expanded", "false");
      };

      const openNav = () => {
        mobileNav?.classList.add("open");
        burger?.setAttribute("aria-expanded", "true");
      };

      addListener(burger, "click", () => {
        if (mobileNav?.classList.contains("open")) closeNav();
        else openNav();
      });
      addListener(closeBtn, "click", closeNav);
      mobileNav?.querySelectorAll("a")?.forEach((link) => addListener(link, "click", closeNav));
      addListener(window, "keydown", (event) => {
        if (event.key === "Escape") closeNav();
      });

      const navLinks = document.querySelectorAll("#nav .nav-link");
      const sectionIds = ["hero", "wifeday", "letter", "reasons", "promises", "notes", "story"];
      const setActive = () => {
        const scrollPos = window.scrollY + 160;
        let active = sectionIds[0];
        sectionIds.forEach((id) => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= scrollPos) {
            active = id;
          }
        });
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          const matchId = href.replace("#", "");
          link.classList.toggle("active", matchId === active);
        });
      };

      const handleNavState = () => {
        setActive();
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
      };

      addListener(window, "scroll", handleNavState);
      addListener(window, "resize", handleNavState);
      handleNavState();
    };
    setupNav();

    const setupReveal = () => {
      const targets = document.querySelectorAll(".rv,.rv-l,.rv-r,.tl-item");
      if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        targets.forEach((el) => el.classList.add("in"));
        return;
      }

      const obs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
        { threshold: 0.12 },
      );

      targets.forEach((el) => obs.observe(el));
      listeners.push(() => obs.disconnect());
    };
    setupReveal();

    const setupSoundToggle = () => {
      const btn = document.getElementById("sound-btn");
      if (!btn) return;

      const btnIcon = btn.querySelector(".sb-icon");
      const btnLabel = btn.querySelector(".sb-label");
      const btnHint = btn.querySelector(".sb-hint");

      const handleFirstGesture = async () => {
        await unlockMedia();
        if (celebrationActive) {
          startCelebrationLoop();
        } else {
          playClickSfx(true);
        }
        if (musicOn && !deferMusicUntilCelebrationEnds) {
          playBackgroundSong().catch(() => {});
        }
      };
      addListener(window, "pointerdown", handleFirstGesture, { once: true, passive: true });
      addListener(window, "touchstart", handleFirstGesture, { once: true, passive: true });
      addListener(window, "click", handleFirstGesture, { once: true });
      addListener(window, "keydown", handleFirstGesture, { once: true });

      const update = () => {
        if (btnIcon) btnIcon.textContent = musicOn ? "♫" : "♪";
        if (btnLabel) btnLabel.textContent = musicOn ? "Music On" : "Music Off";
        if (btnHint) btnHint.textContent = musicOn ? "Tap to mute" : "Tap to play";
        btn.setAttribute("aria-pressed", musicOn ? "false" : "true");
        btn.setAttribute("aria-label", musicOn ? "Mute background music" : "Play background music");
        btn.classList.toggle("muted", !musicOn);
        btn.classList.toggle("playing", musicOn);
      };

      addListener(btn, "click", async () => {
        await unlockMedia();
        if (!celebrationActive) {
          playButtonSfx();
        }
        musicOn = !musicOn;
        if (musicOn) {
          const played = await playBackgroundSong();
          if (!played) {
            pauseBackgroundSong();
          }
        } else {
          pauseBackgroundSong();
        }
        update();
      });

      addListener(document, "pointerdown", (event) => {
        if (!hasUserActivatedMedia) return;
        if (celebrationActive) {
          playCelebrationSfx();
          return;
        }
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.closest("#sound-btn")) return;
        if (target.closest("button")) {
          playButtonSfx();
          return;
        }
        if (target.closest(".bc,.rcard,.vow,.note,.stat")) {
          playCardSfx();
          return;
        }
        const isInteractive = !!target.closest("a,button,.nav-link,.nav-mobile-link,.bc,.rcard,.vow,.note,.stat");
        playClickSfx(isInteractive);
      });

      addListener(window, "scroll", () => {
        if (prefersReducedMotion) return;
        if (celebrationActive) return;
        const now = performance.now();
        const delta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        if (delta < 10) return;
        if (now - lastScrollSfxAt < 120) return;
        lastScrollSfxAt = now;
        playScrollSfx(delta);
      });

      if (celebrationActive && hasUserActivatedMedia) {
        startCelebrationLoop();
      }

      update();

      if (musicOn && !deferMusicUntilCelebrationEnds) {
        playBackgroundSong().catch(() => {});
      }
    };
    setupSoundToggle();

    const setupCursor = () => {
      const cursor = document.getElementById("cx");
      const ring = document.getElementById("cr");
      if (!cursor || !ring) return;
      addListener(window, "pointermove", (e) => {
        const { clientX, clientY } = e;
        cursor.setAttribute("style", `transform: translate(${clientX}px, ${clientY}px)`);
        ring.setAttribute("style", `transform: translate(${clientX}px, ${clientY}px)`);
      });
    };
    setupCursor();

    const setupBackground = () => {
      const canvas = document.getElementById("bgc");
      if (!(canvas instanceof HTMLCanvasElement)) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let stars = [];
      let width = 0;
      let height = 0;
      let lastPaint = 0;

      const buildStars = (w, h) => {
        const density = Math.min(140, Math.max(70, Math.floor((w * h) / 18000)));
        stars = Array.from({ length: density }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 1.8,
          a: 0.03 + Math.random() * 0.07,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.6,
        }));
      };

      const drawBase = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        buildStars(width, height);
      };

      const render = (ts) => {
        if (prefersReducedMotion) return;
        if (ts - lastPaint < 33) {
          addRaf(render);
          return;
        }
        lastPaint = ts;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(10, 6, 20, 0.08)";
        ctx.fillRect(0, 0, width, height);

        stars.forEach((star) => {
          const twinkle = 0.55 + 0.45 * Math.sin(ts * 0.0012 * star.speed + star.phase);
          ctx.fillStyle = `rgba(245,237,224,${star.a * twinkle})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        });

        addRaf(render);
      };

      addListener(window, "resize", drawBase);
      drawBase();
      if (!prefersReducedMotion) addRaf(render);
    };
    setupBackground();

    const setupLoader = () => {
      const loader = document.getElementById("loader");
      const pctEl = document.getElementById("ldpct");
      const bar = document.getElementById("ldbar");
      if (!loader) return;

      const hideLoader = () => {
        loader.classList.add("bye");
        loader.setAttribute("aria-hidden", "true");
        loader.style.pointerEvents = "none";
      };

      addListener(loader, "animationend", () => {
        if (loader.classList.contains("bye")) {
          loader.style.display = "none";
        }
      });

      let pct = 0;
      const tick = () => {
        pct = Math.min(100, pct + 15 + Math.random() * 10);
        if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;
        if (bar instanceof HTMLElement) bar.style.width = `${pct}%`;
        if (pct < 100) {
          addTimeout(tick, 120);
        } else {
          addTimeout(hideLoader, 250);
        }
      };

      tick();
      addTimeout(hideLoader, 3200);
    };
    setupLoader();

    return () => {
      pauseBackgroundSong();
      listeners.forEach((off) => off());
      intervals.forEach((clear) => clear());
      timeouts.forEach((clear) => clear());
      rafs.forEach((cancel) => cancel());
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="photo-bg" aria-hidden="true" />
      <div id="cx" />
      <div id="cr" />
      <div className="grain" />
      <canvas id="bgc" />
      <div id="scroll-prog" />
      <button id="sound-btn" type="button" title="Toggle Music" aria-label="Mute background music" aria-live="polite">
        <span className="sb-icon" aria-hidden="true">
          ♫
        </span>
        <span className="sb-copy">
          <span className="sb-label">Music On</span>
          <span className="sb-hint">Tap to mute</span>
        </span>
      </button>
      <audio id="bg-music" src="/song/line-without-a-hook.mp3" loop preload="auto" />
      <audio id="sfx-click" src="/song/click.wav" preload="auto" />
      <audio id="sfx-scroll" src="/song/scroll.wav" preload="auto" />
      <audio id="sfx-celebration" src="/song/celebration.wav" preload="auto" />

      <div id="loader">
        <canvas id="lcanv" />
        <div className="ld-wrap">
          <div className="ld-ring">
            <div className="ld-ring-inner">
              <span className="ld-ico">💍</span>
            </div>
          </div>
          <div className="ld-names">
            <em>Yuki</em> &amp; Lyraa
          </div>
          <div className="ld-sub">Loading your love story…</div>
          <div className="ld-bar-wrap">
            <div className="ld-bar" id="ldbar" />
          </div>
          <div className="ld-pct" id="ldpct">
            0%
          </div>
        </div>
      </div>

      {showCelebration && (
        <div className="wife-celebrate" aria-hidden="true">
          <div className="wife-celebrate-glow" />
          <div className="wife-celebrate-rings">
            <span className="wife-celebrate-ring" />
            <span className="wife-celebrate-ring" />
            <span className="wife-celebrate-ring" />
          </div>
          <div className="wife-celebrate-fireworks">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={`fire-${index}`} className="wife-celebrate-firework" />
            ))}
          </div>
          <div className="wife-celebrate-banner">She is mine now 💍✨</div>
          <div className="wife-celebrate-rain">
            {Array.from({ length: 56 }).map((_, index) => (
              <span
                key={index}
                className="wife-celebrate-piece"
                style={{
                  "--x": `${((index * 17) % 100) + 1}%`,
                  "--dur": `${4.2 + ((index * 7) % 30) / 10}s`,
                  "--delay": `${-((index * 13) % 34) / 10}s`,
                  "--drift": `${-28 + ((index * 11) % 56)}px`,
                }}
              />
            ))}
          </div>
          <div className="wife-celebrate-sparkles">
            {Array.from({ length: 20 }).map((_, index) => (
              <span key={`spark-${index}`} className="wife-celebrate-sparkle" />
            ))}
          </div>
        </div>
      )}

      <NavBar />
      <MobileNav />

      <main id="main-content" role="main">
        <HeroSection />
        <Marquee />
        <WifeDaySection />
        <CountdownSection />
        <LetterSection />
        <ReasonsSection />
        <QuoteSection />
        <MemoriesSection />
        <StatsSection />
        <PromisesSection />
        <NotesSection />
        <TimelineSection />
        <ClosingSection />
        <FooterSection />
      </main>
    </>
  );
}
