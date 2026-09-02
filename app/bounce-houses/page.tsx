import Link from 'next/link';

export const metadata = {
  title: 'Bounce House Rentals Texas | Commercial Inflatables — EventsRentals.io',
  description: 'Commercial grade bounce houses and water slides delivered across Texas. Safe, cleaned, and sanitized castle bounce houses for birthday parties and events.'
};

export default function BounceHousesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><span className="dot"></span> Heavy Duty &amp; Safe</span>
          <h1>Bounce House Rentals in Texas</h1>
          <p>Commercial-grade castle and slide combo bounce houses for kids and teens. Cleaned, sanitized, anchored securely, and delivered on time for your party.</p>
        </div>
      </section>

      <div className="product-detail">
        <div className="container">
          {/* ITEM 1: Classic Castle */}
          <article className="product-block" id="classic-castle">
            <div className="gallery">
              <div className="main">
                <img src="/images/bounce-commercial.png" alt="Texas Commercial Bounce House Rental" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/bounce-castle-primary.png" alt="Castle bounce house detail" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/bounce-commercial.png" alt="Castle bounce house setup" loading="lazy" />
              </div>
            </div>
            <div className="details">
              <span className="eyebrow" style={{ marginBottom: '12px' }}><span className="dot"></span> Most Popular</span>
              <h2>Commercial Primary Castle Bounce House</h2>
              <p className="intro">
                The undisputed king of birthday parties! Vibrant primary colors (red, blue, yellow) in thick 15oz commercial-grade vinyl. Features a large 15x15 jumping area, safety mesh netting on all 4 sides for 360° visibility, and an inflatable safety ramp for easy entry.
              </p>
              <ul className="spec-list">
                <li><span className="k">Dimensions:</span><span className="v">15' L × 15' W × 14' H (requires 18'×18' cleared space)</span></li>
                <li><span className="k">Capacity:</span><span className="v">Up to 6-8 kids at once (max 800 lbs total)</span></li>
                <li><span className="k">Power Required:</span><span className="v">1 dedicated 110V standard outlet (we bring 50ft heavy duty cords)</span></li>
                <li><span className="k">Setup Surface:</span><span className="v">Grass (staked), Concrete / Turf (heavy sandbags)</span></li>
                <li><span className="k">Daily Rate:</span><span className="v" style={{ color: 'var(--red)', fontSize: '20px' }}>$175 / day (full day rental)</span></li>
              </ul>
              <div className="contact-row" style={{ marginTop: '20px' }}>
                <a href="tel:8328192838" className="btn btn-primary btn-md">Call to Reserve</a>
                <a href="https://wa.me/18328192838?text=Hi!%20I%20want%20to%20reserve%20the%20Primary%20Castle%20Bounce%20House" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-md">WhatsApp</a>
                <Link href="/contact" className="btn btn-yellow btn-md">Check Date</Link>
              </div>
            </div>
          </article>

          {/* ITEM 2: Castle + Slide Combo */}
          <article className="product-block reverse" id="castle-slide-combo">
            <div className="gallery">
              <div className="main">
                <img src="/images/bounce-castle-primary.png" alt="Bounce House Slide Combo Texas" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/bounce-commercial.png" alt="Inflatable slide detail" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/bounce-castle-primary.png" alt="Inflatable basketball hoop inside" loading="lazy" />
              </div>
            </div>
            <div className="details">
              <span className="eyebrow" style={{ marginBottom: '12px' }}><span className="dot"></span> Ultimate Fun</span>
              <h2>Castle + Dual Slide Inflatable Combo</h2>
              <p className="intro">
                Double the excitement! Jump inside the bounce zone, sink shots at the built-in basketball hoop, then climb the easy-grip wall and zoom down the slick slide. Can be used wet or dry depending on the weather.
              </p>
              <ul className="spec-list">
                <li><span className="k">Dimensions:</span><span className="v">28' L × 15' W × 15' H</span></li>
                <li><span className="k">Features:</span><span className="v">Bounce area + Climbing wall + Slide + Basketball hoop</span></li>
                <li><span className="k">Capacity:</span><span className="v">Up to 8-10 kids (max 1,000 lbs)</span></li>
                <li><span className="k">Sanitization:</span><span className="v">Hospital-grade non-toxic disinfectant before every setup</span></li>
                <li><span className="k">Daily Rate:</span><span className="v" style={{ color: 'var(--red)', fontSize: '20px' }}>$250 / day</span></li>
              </ul>
              <div className="contact-row" style={{ marginTop: '20px' }}>
                <a href="tel:8328192838" className="btn btn-primary btn-md">Call to Reserve</a>
                <a href="https://wa.me/18328192838?text=Hi!%20I%20want%20to%20reserve%20the%20Dual%20Slide%20Combo" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-md">WhatsApp</a>
                <Link href="/contact" className="btn btn-yellow btn-md">Check Date</Link>
              </div>
            </div>
          </article>

          {/* SAFETY NOTE */}
          <div className="callout-note" style={{ marginTop: '64px' }}>
            <div className="ico">🛡️</div>
            <div>
              <strong>Safety is Our #1 Priority:</strong> Every bounce house is anchored with heavy-duty commercial steel stakes or 100lb sandbags. All inflatables are fully insured and inspected after each setup.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
