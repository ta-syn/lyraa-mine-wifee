export default function StatsSection() {
  return (
    <section className="stats-s rv">
      <div className="stats-glow" />
      <div className="stats-in">
        <h2 className="stats-title">
          Us, <em>by the numbers</em>
        </h2>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-ico">💌</span>
            <span className="stat-num">∞</span>
            <span className="stat-lbl">Times I think of you every day</span>
          </div>
          <div className="stat">
            <span className="stat-ico">🌟</span>
            <span className="stat-num">1</span>
            <span className="stat-lbl">Person who holds my whole heart</span>
          </div>
          <div className="stat">
            <span className="stat-ico">💖</span>
            <span className="stat-num">Mar 4</span>
            <span className="stat-lbl">The day she became my wifee</span>
          </div>
          <div className="stat">
            <span className="stat-ico">💍</span>
            <span className="stat-num">1</span>
            <span className="stat-lbl">Wifee — my forever home</span>
          </div>
        </div>
      </div>
    </section>
  );
}
