import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EventsRentals.io — Bounce Houses, Movie Screens & Popcorn | All of Texas',
  description: 'Bounce houses, outdoor movie nights, and popcorn carts delivered across Texas. Clean, safe equipment. Book by phone, text, or WhatsApp.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎪</text></svg>'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <script src="/shared.js" async />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container">
          <span>🎉 Now Serving All of Texas</span>
          <span className="dot"></span>
          <span>Book by Call, Text or WhatsApp</span>
          <span className="dot"></span>
          <span>Free Delivery & Setup</span>
        </div>
      </div>
      <div className="header-main">
        <div className="container">
          <a href="/" className="logo">
            <span className="logo-mark">🎪</span>
            <span>EventsRentals<span className="io">.io</span></span>
          </a>
          <nav className="nav-desktop">
            <a href="/">Home</a>
            <a href="/bounce-houses">Bounce Houses</a>
            <a href="/movie-screen">Movie Screen</a>
            <a href="/popcorn-cart">Popcorn Cart</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="contact-buttons">
            <a href="tel:+14699942172" className="cta-icon cta-call" title="Call (469) 994-2172" aria-label="Call (469) 994-2172">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="sms:+14699942172" className="cta-icon cta-text" title="Text (469) 994-2172" aria-label="Text (469) 994-2172">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
            <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener noreferrer" className="cta-icon cta-whatsapp" title="WhatsApp" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
            <a href="/contact" className="btn-book">Book Now →</a>
            <button className="hamburger" aria-label="Open menu" aria-expanded="false"><span></span></button>
          </div>
        </div>
      </div>
      <nav className="nav-mobile">
        <a href="/">Home</a>
        <a href="/bounce-houses">Bounce Houses</a>
        <a href="/movie-screen">Movie Screen Rental</a>
        <a href="/popcorn-cart">Popcorn Cart</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact / Book Now</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="col">
            <a href="/" className="footer-logo">🎪 EventsRentals<span className="io">.io</span></a>
            <p>Bringing the fun to backyards and events all across Texas. Bounce houses, movie screens, popcorn — booked with a phone call.</p>
            <div className="footer-contact-btns">
              <a href="tel:+14699942172" className="cta-call" title="Call (469) 994-2172" aria-label="Call">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <a href="sms:+14699942172" className="cta-text" title="Text (469) 994-2172" aria-label="Text">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </a>
              <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener noreferrer" className="cta-whatsapp" title="WhatsApp" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1Brd4vbe3S/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.51h-2l-.396 3.98h2.396v8.01Z"/></svg>
              </a>
            </div>
          </div>
          <div className="col">
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/bounce-houses">Bounce Houses</a>
            <a href="/movie-screen">Movie Screen Rental</a>
            <a href="/popcorn-cart">Popcorn Cart</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact / Book Now</a>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <a href="tel:+14699942172">📞 (469) 994-2172</a>
            <a href="sms:+14699942172">💬 Text us anytime</a>
            <a href="https://wa.me/14699942172" target="_blank" rel="noopener noreferrer">🟢 WhatsApp us</a>
            <a href="mailto:hello@eventsrentals.io">✉️ hello@eventsrentals.io</a>
            <p style={{ marginTop: '12px' }}>🤠 Proudly serving all of Texas.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span data-year>2026</span> EventsRentals.io — All rights reserved.</span>
          <span>Made with ❤️ in Texas</span>
        </div>
      </div>
    </footer>
  );
}
