export default function RiskDisclaimer() {
  return (
    <footer>
      <div className="wrap">
        <div id="risk" style={{ maxWidth: '860px', margin: '0 auto', fontSize: '14px', lineHeight: 1.7, color: 'var(--t2)' }}>
          <strong style={{ color: 'var(--t1)' }}>Risk Disclaimer:</strong> Trading cryptocurrencies and other
          financial instruments involves substantial risk and may result in the loss of your entire capital.
          The $50 USD deposit referenced on this page stays in your own LBank account at all times.
          MAZAL never collects, holds, or has access to your funds. Content shared in this workshop
          (including analysis, setups, and educational material) is for educational purposes only and does
          not constitute financial, investment, or trading advice. Past performance does not guarantee future
          results. Always do your own research and consult a licensed financial advisor before making
          investment decisions.
        </div>
        <div className="legal" style={{ marginTop: '30px' }}>
          <span>© 2026 Mazal Community. All rights reserved.</span>
          <span>discord.gg/gzBmy2emg · @joinmazal</span>
        </div>
      </div>
    </footer>
  );
}
