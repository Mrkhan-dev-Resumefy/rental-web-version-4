import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <div className="hero-slide" style={{ backgroundImage: "url('/images/bounce-commercial.png')" }}></div>
          <div className="hero-slide" style={{ backgroundImage: "url('/images/movie-screen-night.png')" }}></div>
          <div className="hero-slide" style={{ backgroundImage: "url('/images/popcorn-cart-vintage.png')" }}></div>
          <div className="hero-slide" style={{ backgroundImage: "url('/images/bounce-castle-primary.png')" }}></div>
        </div>
        <div className="hero-scrim"></div>
        <div className="hero-shapes">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse"></span>
              🎪 TEXAS PARTY RENTALS DELIVERED FAST
            </div>
            <h1>
              Bring the <span className="highlight">Fun</span> to Your Next Party!
            </h1>
            <p className="sub">Clean, Commercial-Grade Equipment &amp; Zero Stress</p>
            <p className="body-copy">
              Bounce houses, giant outdoor movie screens, and vintage popcorn carts delivered right to your backyard, church, school, or venue across Texas. Commercial grade, fully sanitized, and ready for unforgettable memories.
            </p>
            <div className="contact-row">
              <a href="tel:8328192838" className="btn btn-yellow btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z"/>
                </svg>
                Call (832) 819-2838
              </a>
              <a href="https://wa.me/18328192838?text=Hi!%20I'd%20like%20to%20rent%20party%20equipment" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                WhatsApp Us
              </a>
              <a href="sms:8328192838?body=Hi!%20I%20want%20to%20rent%20party%20equipment" className="btn btn-red btn-lg">
                Text for Quote
              </a>
            </div>
            <div>
              <span className="urgency-badge">🔥 Weekends fill up fast — Reserve your date today!</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="offer-section" id="rentals-section">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="eyebrow"><span className="dot"></span> Featured Rentals</span>
          </div>
          <h2 className="section-title">Everything You Need for an Epic Event</h2>
          <p className="section-subtitle">Commercial-grade inflatables and premium party equipment for birthdays, school events, church gatherings, and block parties.</p>

          <div className="offer-grid">
            <Link href="/bounce-houses" className="item-card">
              <div className="thumb">
                <span className="tag-sticker red">🔥 Most Popular</span>
                <img src="/images/bounce-commercial.png" alt="Texas Bounce House Rental" loading="lazy" />
              </div>
              <div className="body">
                <h3>Commercial Bounce Houses</h3>
                <p>Heavy-duty commercial vinyl castle and slide combo bounce houses. Safe mesh netting, basketball hoop inside, and deep-cleaned before every dropoff.</p>
                <span className="price-line">Starts at $175 / day</span>
                <span className="btn btn-yellow btn-sm" style={{ marginTop: 'auto' }}>View Bounce Houses →</span>
              </div>
            </Link>

            <Link href="/movie-screen" className="item-card">
              <div className="thumb">
                <span className="tag-sticker">🎬 Family Favorite</span>
                <img src="/images/movie-screen-night.png" alt="Inflatable Movie Screen Texas" loading="lazy" />
              </div>
              <div className="body">
                <h3>Outdoor Inflatable Movie Screen</h3>
                <p>20ft giant inflatable projector screen with full 1080p high-lumen HD projector and Bluetooth sound system. Perfect for movies under the Texas stars.</p>
                <span className="price-line">Starts at $250 / night</span>
                <span className="btn btn-primary btn-sm" style={{ marginTop: 'auto' }}>View Movie Screens →</span>
              </div>
            </Link>

            <Link href="/popcorn-cart" className="item-card">
              <div className="thumb">
                <span className="tag-sticker green">🍿 Crowd Pleaser</span>
                <img src="/images/popcorn-cart-vintage.png" alt="Vintage Popcorn Cart Texas" loading="lazy" />
              </div>
              <div className="body">
                <h3>Vintage Theater Popcorn Cart</h3>
                <p>Nostalgic 8oz kettle theater-style popcorn cart with vintage wheels. Includes gourmet popcorn kernels, movie-theater butter salt, and serving bags.</p>
                <span className="price-line">Starts at $85 / day</span>
                <span className="btn btn-yellow btn-sm" style={{ marginTop: 'auto' }}>View Popcorn Carts →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span>100% Commercial Grade &amp; Safe</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <span>On-Time Delivery &amp; Setup</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span>Sanitized &amp; Cleaned Before Every Rental</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span>Serving All of Texas</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="eyebrow"><span className="dot"></span> Super Simple</span>
          </div>
          <h2 className="section-title">How Renting Works (1, 2, 3!)</h2>
          <p className="section-subtitle">We make renting party equipment simple, frictionless, and totally headache-free.</p>

          <div className="how-grid">
            <div className="how-card">
              <div className="num">1</div>
              <h3>Pick Your Fun</h3>
              <p>Choose your bounce house, movie screen, popcorn cart, or custom party combo for your date and location.</p>
            </div>
            <div className="how-card">
              <div className="num">2</div>
              <h3>Contact Us Directly</h3>
              <p>Call, text, WhatsApp, or fill out our quick form. We confirm availability, timing, and lock in your reservation.</p>
            </div>
            <div className="how-card">
              <div className="num">3</div>
              <h3>We Deliver &amp; Set Up</h3>
              <p>Our team handles delivery, secure anchoring, safety inspection, and pickup. You just enjoy the party!</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="eyebrow"><span className="dot"></span> Photo Gallery</span>
          </div>
          <h2 className="section-title">Real Fun in Texas Backyards</h2>
          <p className="section-subtitle">A glimpse of our clean, commercial equipment in action.</p>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/bounce-commercial.png" alt="Bounce house setup Texas" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/movie-screen-night.png" alt="Outdoor movie screen Texas" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/popcorn-cart-vintage.png" alt="Popcorn machine rental" loading="lazy" />
            </div>
            <div className="gallery-item">
              <img src="/images/bounce-castle-primary.png" alt="Castle bounce house" loading="lazy" />
            </div>
          </div>

          <div className="gallery-cta">
            <Link href="/contact" className="btn btn-red btn-lg">
              Reserve Your Party Date Now →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="blob blob-1" style={{ top: '-100px', left: '-50px', width: '300px', height: '300px', background: 'var(--yellow)' }}></div>
        <div className="blob blob-2" style={{ bottom: '-80px', right: '-40px', width: '260px', height: '260px', background: 'var(--red)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow" style={{ marginBottom: '20px' }}><span className="dot"></span> Ready to Party?</span>
          <h2>Let's Make Your Next Event Unforgettable!</h2>
          <p>Dates book up weeks in advance. Reach out right now for instant availability.</p>
          <div className="contact-row">
            <a href="tel:8328192838" className="btn btn-yellow btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z"/>
              </svg>
              Call (832) 819-2838
            </a>
            <a href="https://wa.me/18328192838?text=Hi!%20I'd%20like%20to%20rent%20party%20equipment" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-white btn-lg">
              Online Quote Form →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
