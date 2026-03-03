export default function FooterSection() {
  return (
    <footer>
      <div className="ft-top">
        <div className="ft-brand">
          <div className="ft-brand-names">
            <em>Yuki</em> &amp; Lyraa
          </div>
          <span className="ft-brand-date">Since March 4, 2026 ✦ My Beloved Wifee</span>
          <p className="ft-brand-desc">
            A love story written with every piece of <strong>Yuki&apos;s</strong> heart — devoted to his wifee Lyraa, now and for all of eternity.
          </p>
        </div>

        <div>
          <span className="ft-col-title">Our Story</span>
          <ul className="ft-col-list">
            <li>The day destiny introduced us</li>
            <li>Learning your heart</li>
            <li>The moment I knew</li>
            <li>March 4, 2026 — The Day</li>
            <li>Forever, one day at a time</li>
          </ul>
        </div>

        <div>
          <span className="ft-col-title">My Promises</span>
          <ul className="ft-col-list">
            <li>Choose you, every day</li>
            <li>Be your home &amp; calm</li>
            <li>Love you with patience</li>
            <li>Stand beside you always</li>
            <li>Protect your smile forever</li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-copy">
          Made with every piece of <strong>Yuki&apos;s</strong> heart — for his wifee Lyraa, his greatest blessing 💍
        </div>
        <div className="ft-right">Yuki &amp; Lyraa · March 4, 2026 · Forever Begins</div>
      </div>

      <div className="ft-top-btn-wrap">
        <a href="#hero" className="ft-top-btn" aria-label="Back to top">
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
