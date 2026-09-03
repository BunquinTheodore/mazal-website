export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="fbrand">
              <img src="/assets/images/asset-006.png" alt="" />
              MAZAL
            </div>
            <p>A free trading community where all communities unite and meet. Good fortune, shared.</p>
          </div>
          <div>
            <h4>Community</h4>
            <a href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Discord</a>
            <a href="https://facebook.com/MazalOfficialPH" target="_blank" rel="noopener">Facebook: @MazalOfficialPH</a>
            <a href="https://instagram.com/MazalOfficialPH" target="_blank" rel="noopener">Instagram: @MazalOfficialPH</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Message us on Discord</a>
            <a href="https://facebook.com/MazalOfficialPH" target="_blank" rel="noopener">DM on Facebook</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#risk">Risk Disclaimer</a>
            <a href="#risk">Privacy Policy</a>
            <a href="#risk">Terms of Service</a>
          </div>
        </div>
        <div id="risk">
          <strong style={{ color: 'var(--t2)' }}>Risk Disclaimer:</strong> Trading cryptocurrencies, gold, and
          other financial instruments involves substantial risk and may result in the loss of your entire
          capital. Content shared within the MAZAL community (including analysis, setups, recaps, and
          workshop material) is for educational purposes only and does not constitute financial, investment,
          or trading advice. Past performance does not guarantee future results. Always do your own research
          and consult a licensed financial advisor before making investment decisions.
        </div>
        <div className="legal">
          <span>© 2026 Mazal Community. All rights reserved.</span>
          <span>discord.gg/gzBmy2emg · @MazalOfficialPH</span>
        </div>
      </div>
    </footer>
  );
}
