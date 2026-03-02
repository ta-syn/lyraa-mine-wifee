export default function CountdownSection() {
  return (
    <section className="countdown-s rv">
      <div className="cd-bg" />
      <div className="cd-inner">
        <span className="cd-label">Counting every precious moment since our forever began</span>
        <h2 className="cd-title">
          Since the day Lyraa became
          <br />
          <em>Yuki&apos;s wifee</em>
        </h2>
        <div className="cd-row">
          <div className="cd-unit">
            <span className="cd-num" id="cd-d">
              000
            </span>
            <div className="cd-lbl">Days</div>
          </div>
          <div className="cd-unit">
            <span className="cd-num" id="cd-h">
              00
            </span>
            <div className="cd-lbl">Hours</div>
          </div>
          <div className="cd-unit">
            <span className="cd-num" id="cd-m">
              00
            </span>
            <div className="cd-lbl">Minutes</div>
          </div>
          <div className="cd-unit">
            <span className="cd-num" id="cd-s">
              00
            </span>
            <div className="cd-lbl">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  );
}
