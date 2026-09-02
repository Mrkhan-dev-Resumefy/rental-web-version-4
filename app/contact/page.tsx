import Link from 'next/link';

export const metadata = {
  title: 'Contact EventsRentals.io — Book Your Texas Party Rentals',
  description: 'Get an instant quote or book your bounce house, inflatable movie screen, or popcorn cart rental in Texas. Contact us by phone, text, WhatsApp, or online form.'
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><span className="dot"></span> Fast Quotes</span>
          <h1>Get in Touch &amp; Book Today</h1>
          <p>We make reserving party equipment easy. Reach out via call, text, WhatsApp, or fill out the simple quote form below.</p>
        </div>
      </section>

      <div className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="contact-layout">
            {/* LEFT: FORM */}
            <div className="form-block">
              <h2 style={{ marginBottom: '8px' }}>Request a Free Quote</h2>
              <p style={{ color: 'var(--ink-2)', marginBottom: '28px' }}>Fill out the details below and our team will get back to you within 30 minutes!</p>

              <form id="quote-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" id="name" name="name" placeholder="e.g. Sarah Miller" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" placeholder="(832) 555-0199" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="sarah@example.com" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="city">City / Texas Location *</label>
                    <input type="text" id="city" name="city" placeholder="e.g. Houston, Katy, Spring" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="event-date">Event Date *</label>
                    <input type="date" id="event-date" name="event_date" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="event-type">Event Type</label>
                    <select id="event-type" name="event_type">
                      <option value="birthday">Birthday Party</option>
                      <option value="school">School Event / Field Day</option>
                      <option value="church">Church / Community Gathering</option>
                      <option value="corporate">Corporate / Company Picnic</option>
                      <option value="movie-night">Outdoor Movie Night</option>
                      <option value="other">Other Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label>Equipment Needed (Select all that apply):</label>
                  <div className="checkbox-grid">
                    <label className="checkbox-item">
                      <input type="checkbox" name="equipment" value="bounce-castle" />
                      <span>🏰 Classic Castle Bounce</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" name="equipment" value="bounce-slide" />
                      <span>🌊 Castle + Slide Combo</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" name="equipment" value="movie-screen" />
                      <span>🎬 20ft Inflatable Movie Screen</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" name="equipment" value="popcorn-cart" />
                      <span>🍿 Vintage Popcorn Cart</span>
                    </label>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="notes">Additional Details / Notes</label>
                  <textarea id="notes" name="notes" placeholder="Tell us about your event timing, setup location (grass/concrete), special requests, etc..."></textarea>
                </div>

                <button type="submit" className="btn btn-red btn-lg" style={{ width: '100%' }}>
                  Submit Quote Request →
                </button>

                <p className="form-note">🔒 We respect your privacy. No spam ever.</p>
              </form>
            </div>

            {/* RIGHT: DIRECT CONTACT SIDEBAR */}
            <aside className="contact-sidebar">
              <span className="eyebrow" style={{ background: 'var(--white)', marginBottom: '14px' }}>
                <span className="dot"></span> Instant Response
              </span>
              <h3>Prefer to Contact Us Directly?</h3>
              <p style={{ marginBottom: '24px', fontWeight: '600' }}>Call, text, or WhatsApp us anytime for immediate service:</p>

              <a href="tel:8328192838" className="direct-btn call">
                <div className="ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.2 2.52.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z"/>
                  </svg>
                </div>
                <div className="label">
                  <strong>Call Us Now</strong>
                  <small>(832) 819-2838</small>
                </div>
              </a>

              <a href="sms:8328192838?body=Hi!%20I'd%20like%20to%20check%20availability%20for%20party%20rentals" className="direct-btn text">
                <div className="ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div className="label">
                  <strong>Send a Text Message</strong>
                  <small>(832) 819-2838</small>
                </div>
              </a>

              <a href="https://wa.me/18328192838?text=Hi!%20I'd%20like%20to%20rent%20party%20equipment%20from%20EventsRentals.io" target="_blank" rel="noopener noreferrer" className="direct-btn whatsapp">
                <div className="ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                  </svg>
                </div>
                <div className="label">
                  <strong>Chat on WhatsApp</strong>
                  <small>+1 (832) 819-2838</small>
                </div>
              </a>

              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '2px dashed var(--ink)' }}>
                <p style={{ fontSize: '14px', fontWeight: '700' }}>📍 Service Area: All of Texas</p>
                <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>🚚 Free delivery options available within primary service zones!</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
