import Link from 'next/link';

export const metadata = {
  title: 'About EventsRentals.io — Texas Party & Inflatable Rentals',
  description: 'Learn about EventsRentals.io. Family-owned party equipment rental company serving communities across Texas with clean, safe bounce houses and outdoor movie setups.'
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><span className="dot"></span> Our Texas Story</span>
          <h1>About EventsRentals.io</h1>
          <p>We are a dedicated party and event rental company bringing joy, excitement, and effortless fun to backyards, schools, churches, and venues across Texas.</p>
        </div>
      </section>

      <div className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{
              background: 'var(--cream)',
              border: '3px solid var(--ink)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--sh-md)'
            }}>
              <h2 style={{ marginBottom: '16px' }}>Our Mission: Stress-Free Party Perfection</h2>
              <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--ink-2)' }}>
                Planning an event should be exciting, not overwhelming. At <strong>EventsRentals.io</strong>, we eliminate the stress of party logistics by delivering pristine, commercial-grade inflatables and entertainment equipment on time, every time. From quick backyard birthday celebrations to 500-person community festivals, our team handles the heavy lifting so you can focus on making memories with your loved ones.
              </p>
            </div>

            <div style={{
              background: 'var(--sky-50)',
              border: '3px solid var(--ink)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--sh-md)'
            }}>
              <h3 style={{ marginBottom: '16px' }}>The EventsRentals.io Difference</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '22px' }}>✨</span>
                  <div><strong>100% Sanitized Equipment:</strong> Every bounce house, movie screen, and popcorn cart is deep-cleaned and disinfected with hospital-grade, kid-safe sanitizers before and after every rental.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '22px' }}>⏱️</span>
                  <div><strong>Punctual &amp; Reliable:</strong> We arrive early to ensure full setup, safety testing, and inspection well before your first guest arrives.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '22px' }}>🔒</span>
                  <div><strong>Safety First:</strong> Heavy-duty ground anchors, reinforced seams, and commercial lead-free vinyl ensure absolute safety for jumpers of all ages.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '22px' }}>💬</span>
                  <div><strong>Direct Communication:</strong> Talk directly to real people via Phone, Text, or WhatsApp anytime. No complicated automated bots.</div>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'var(--yellow)',
              border: '3px solid var(--ink)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              boxShadow: 'var(--sh-md)',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '12px' }}>Ready to Plan Your Event?</h3>
              <p style={{ fontSize: '18px', marginBottom: '24px' }}>Reach out to our Texas party rental specialists today for a custom quote or package deal.</p>
              <div className="contact-row" style={{ justifyContent: 'center' }}>
                <a href="tel:8328192838" className="btn btn-primary btn-lg">Call (832) 819-2838</a>
                <Link href="/contact" className="btn btn-white btn-lg">Contact Form →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
