"use client";

import { useEffect } from "react";
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let soundOn = false;
    let audioUnlocked = false;
    let lastScrollSoundAt = 0;
    let lastScrollY = window.scrollY;
    let audioCtx = null;
    let masterGain = null;
    let masterFilter = null;

    const getAudioContext = (allowCreate = false) => {
      if (typeof window === "undefined") return null;
      if (!allowCreate && !audioCtx) return null;
      if (!audioCtx) {
        const Ctor = window.AudioContext || window.webkitAudioContext;
        if (!Ctor) return null;
        audioCtx = new Ctor();
      }
      return audioCtx;
    };

    const unlockAudio = () => {
      if (audioUnlocked) return;
      const ctx = getAudioContext(true);
      if (!ctx) return;
      ctx.resume().catch(() => {});
      audioUnlocked = true;
    };

    const getAudioGraph = () => {
      if (!audioUnlocked) return null;
      const ctx = getAudioContext();
      if (!ctx) return null;
      if (!masterGain) {
        masterGain = ctx.createGain();
        masterGain.gain.value = 1.45;

        masterFilter = ctx.createBiquadFilter();
        masterFilter.type = "lowpass";
        masterFilter.frequency.value = 4200;
        masterFilter.Q.value = 0.7;

        masterFilter.connect(masterGain);
        masterGain.connect(ctx.destination);
      }
      return { ctx, output: masterFilter };
    };

    const playTone = ({
      frequency,
      duration = 0.06,
      gain = 0.02,
      type = "sine",
      attack = 0.008,
      release = 0.06,
      drift = 0.82,
    }) => {
      if (!soundOn) return;
      const graph = getAudioGraph();
      if (!graph) return;
      const { ctx, output } = graph;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const startAt = ctx.currentTime + 0.001;
      const endAt = startAt + duration;
      const oscillator = ctx.createOscillator();
      const envelope = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * drift), endAt);

      envelope.gain.setValueAtTime(0.0001, startAt);
      envelope.gain.exponentialRampToValueAtTime(gain, startAt + Math.min(attack, duration / 2));
      envelope.gain.exponentialRampToValueAtTime(0.0001, endAt + release);

      oscillator.connect(envelope);
      envelope.connect(output);
      oscillator.start(startAt);
      oscillator.stop(endAt + release + 0.02);
    };

    const playClickSound = (strong = false) => {
      if (strong) {
        playTone({ frequency: 560, duration: 0.05, gain: 0.028, type: "triangle", drift: 0.86 });
        playTone({ frequency: 840, duration: 0.045, gain: 0.016, type: "sine", attack: 0.004, drift: 0.9 });
      } else {
        playTone({ frequency: 470, duration: 0.035, gain: 0.017, type: "sine", attack: 0.005, drift: 0.9 });
      }
    };

    const playCuteCardSound = () => {
      playTone({ frequency: 660, duration: 0.045, gain: 0.02, type: "triangle", attack: 0.003, drift: 0.96 });
      playTone({ frequency: 990, duration: 0.055, gain: 0.015, type: "sine", attack: 0.003, drift: 0.97 });
    };

    const playScrollSound = (deltaY) => {
      const magnitude = Math.min(1, Math.max(0, deltaY / 120));
      const baseFrequency = 240 + magnitude * 90;
      playTone({
        frequency: baseFrequency,
        duration: 0.03 + magnitude * 0.015,
        gain: 0.009 + magnitude * 0.007,
        type: "sine",
        attack: 0.004,
        release: 0.025,
        drift: 0.92,
      });
    };

    const ensureBgMusic = () => {
      const audio = document.getElementById("bg-music");
      if (!(audio instanceof HTMLAudioElement)) return null;
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.42;
      return audio;
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

      const handleFirstGesture = () => {
        unlockAudio();
      };
      addListener(window, "pointerdown", handleFirstGesture, { once: true, passive: true });
      addListener(window, "keydown", handleFirstGesture, { once: true });

      const update = () => {
        if (btnIcon) btnIcon.textContent = soundOn ? "♫" : "♪";
        if (btnLabel) btnLabel.textContent = soundOn ? "Music On" : "Music Off";
        if (btnHint) btnHint.textContent = soundOn ? "Tap to mute" : "Tap to play";
        btn.setAttribute("aria-pressed", soundOn ? "false" : "true");
        btn.setAttribute("aria-label", soundOn ? "Mute background music" : "Play background music");
        btn.classList.toggle("muted", !soundOn);
        btn.classList.toggle("playing", soundOn);
      };

      addListener(btn, "click", async () => {
        unlockAudio();
        soundOn = !soundOn;
        if (soundOn) {
          const played = await playBackgroundSong();
          if (!played) {
            soundOn = false;
            update();
            return;
          }
          playTone({ frequency: 620, duration: 0.05, gain: 0.026, type: "triangle", drift: 0.9 });
          playTone({ frequency: 930, duration: 0.06, gain: 0.017, type: "sine", attack: 0.004, drift: 0.94 });
        } else {
          pauseBackgroundSong();
        }
        update();
      });

      addListener(document, "pointerdown", (event) => {
        unlockAudio();
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.closest("#sound-btn")) return;
        if (target.closest(".bc,.rcard,.vow,.note,.stat")) {
          playCuteCardSound();
          return;
        }
        const isInteractive = !!target.closest("a,button,.nav-link,.nav-mobile-link,.bc,.rcard,.vow,.note,.stat");
        playClickSound(isInteractive);
      });

      addListener(window, "scroll", () => {
        if (prefersReducedMotion) return;
        const now = performance.now();
        const delta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        if (delta < 10) return;
        if (now - lastScrollSoundAt < 120) return;
        lastScrollSoundAt = now;
        playScrollSound(delta);
      });

      update();
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
      <button id="sound-btn" type="button" title="Toggle Music" aria-label="Play background music" aria-live="polite">
        <span className="sb-icon" aria-hidden="true">
          ♫
        </span>
        <span className="sb-copy">
          <span className="sb-label">Music Off</span>
          <span className="sb-hint">Tap to play</span>
        </span>
      </button>
      <audio id="bg-music" src="/song/line-without-a-hook.mp3" loop preload="auto" />

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
