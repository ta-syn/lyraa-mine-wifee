export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-corner tl">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 95 L5 5 L95 5" stroke="rgba(200,169,110,0.3)" strokeWidth="1" fill="none" />
          <path d="M5 75 L5 5 L75 5" stroke="rgba(200,169,110,0.12)" strokeWidth="1" fill="none" />
          <circle cx="5" cy="5" r="3" fill="rgba(200,169,110,0.5)" />
          <circle cx="50" cy="5" r="1.5" fill="rgba(212,130,154,0.4)" />
          <circle cx="5" cy="50" r="1.5" fill="rgba(212,130,154,0.4)" />
        </svg>
      </div>
      <div className="hero-corner tr">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 95 L5 5 L95 5" stroke="rgba(200,169,110,0.3)" strokeWidth="1" fill="none" />
          <path d="M5 75 L5 5 L75 5" stroke="rgba(200,169,110,0.12)" strokeWidth="1" fill="none" />
          <circle cx="5" cy="5" r="3" fill="rgba(200,169,110,0.5)" />
        </svg>
      </div>
      <div className="hero-corner bl">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 95 L5 5 L95 5" stroke="rgba(200,169,110,0.3)" strokeWidth="1" fill="none" />
          <path d="M5 75 L5 5 L75 5" stroke="rgba(200,169,110,0.12)" strokeWidth="1" fill="none" />
          <circle cx="5" cy="5" r="3" fill="rgba(200,169,110,0.5)" />
        </svg>
      </div>
      <div className="hero-corner br">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 95 L5 5 L95 5" stroke="rgba(200,169,110,0.3)" strokeWidth="1" fill="none" />
          <circle cx="5" cy="5" r="3" fill="rgba(200,169,110,0.5)" />
        </svg>
      </div>

      <div className="hero-side-l">Yuki &amp; Lyraa ✦ Written in forever</div>
      <div className="hero-side-r">March 03 ✦ 2026 ✦ My Wifee</div>

      <div className="hero-wrap">
        <div className="hero-eye">A love story only for you ✦ March 3, 2026</div>
        <h1 className="hero-title">
          <span className="hn1">
            <span className="fill">Yuki</span>
            Yuki
          </span>
          <span className="ha">my forever, my peace, my home</span>
          <span className="hn2">Lyraa</span>
        </h1>

        <div className="hero-declare">
          <div className="hd-line" />
          <div className="hd-text">My wifee ✦ My once-in-a-lifetime</div>
          <div className="hd-line right" />
        </div>

        <div className="hero-badge">
          <div className="h-badge-inner">
            <span className="h-badge-ring">💍</span>
            Lyraa — my wifee, my calm, my eternity
          </div>
        </div>

        <div className="hero-date-row">
          <div className="hero-date-pill">
            <span className="dpulse" />
            Official since · March 3, 2026
          </div>
        </div>

        <p className="hero-sub">
          In this life and every life, <em>I choose you.</em>
        </p>
      </div>

      <div className="hero-scroll">
        <span className="hs-t">Scroll</span>
        <div className="hs-line-wrap">
          <div className="hs-dot" />
          <div className="hs-dot" />
          <div className="hs-dot" />
        </div>
      </div>
    </section>
  );
}
