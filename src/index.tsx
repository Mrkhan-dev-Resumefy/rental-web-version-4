import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static assets
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/assets/*', serveStatic({ root: './public' }))
app.use('/shared.css', serveStatic({ root: './public' }))
app.use('/shared.js', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ root: './public' }))

// In-memory / edge-friendly storage for booking inquiries
interface BookingInquiry {
  id: string
  name: string
  phone: string
  date: string
  city: string
  items: string[]
  message?: string
  createdAt: string
  status: 'pending_phone_call' | 'confirmed' | 'cancelled'
}

const mockBookings: BookingInquiry[] = [
  {
    id: 'ER-1001',
    name: 'Sarah Miller',
    phone: '(512) 555-0198',
    date: '2026-09-12',
    city: 'Austin',
    items: ['large-bounce', 'popcorn'],
    message: 'Birthday party for 8-year-old with approx 15 kids. Backyard setup on grass.',
    createdAt: '2026-09-01T14:20:00Z',
    status: 'pending_phone_call'
  },
  {
    id: 'ER-1002',
    name: 'David Gonzalez',
    phone: '(214) 555-0142',
    date: '2026-09-19',
    city: 'Dallas',
    items: ['movie', 'popcorn'],
    message: 'Neighborhood outdoor movie night starting around 7:30pm dusk.',
    createdAt: '2026-09-02T09:15:00Z',
    status: 'pending_phone_call'
  }
]

// API Endpoints
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    service: 'EventsRentals.io API',
    region: 'Texas Statewide',
    phone: '(469) 994-2172',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/booking', (c) => {
  return c.json({
    success: true,
    count: mockBookings.length,
    bookings: mockBookings
  })
})

app.post('/api/booking', async (c) => {
  try {
    const body = await c.req.json()
    const { name, phone, date, city, items, message } = body

    if (!name || !phone || !date || !city) {
      return c.json({
        success: false,
        error: 'Missing required fields: Name, Phone, Event Date, and City are required.'
      }, 400)
    }

    const newBooking: BookingInquiry = {
      id: `ER-${Date.now().toString().slice(-4)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      date: String(date),
      city: String(city).trim(),
      items: Array.isArray(items) ? items : items ? [items] : [],
      message: message ? String(message).trim() : '',
      createdAt: new Date().toISOString(),
      status: 'pending_phone_call'
    }

    mockBookings.unshift(newBooking)

    return c.json({
      success: true,
      message: "Booking inquiry received! We'll call you shortly at " + newBooking.phone + " to confirm all details.",
      booking: newBooking
    }, 201)
  } catch (err: any) {
    return c.json({
      success: false,
      error: 'Invalid request data. Please check your form submission.'
    }, 400)
  }
})

// Shared Navigation Component
const renderHeader = (activePage: string) => `
<header class="site-header">
  <div class="header-top">
    <div class="container">
      <span>🎉 Now Serving All of Texas</span>
      <span class="dot"></span>
      <span>Book by Call, Text or WhatsApp</span>
      <span class="dot"></span>
      <span>Free Delivery & Setup</span>
    </div>
  </div>
  <div class="header-main">
    <div class="container">
      <a href="/" class="logo">
        <span class="logo-mark">🎪</span>
        <span>EventsRentals<span class="io">.io</span></span>
      </a>
      <nav class="nav-desktop">
        <a href="/" class="${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="/bounce-houses" class="${activePage === 'bounce' ? 'active' : ''}">Bounce Houses</a>
        <a href="/movie-screen" class="${activePage === 'movie' ? 'active' : ''}">Movie Screen</a>
        <a href="/popcorn-cart" class="${activePage === 'popcorn' ? 'active' : ''}">Popcorn Cart</a>
        <a href="/about" class="${activePage === 'about' ? 'active' : ''}">About Us</a>
        <a href="/contact" class="${activePage === 'contact' ? 'active' : ''}">Contact</a>
      </nav>
      <div class="contact-buttons">
        <a href="tel:+14699942172" class="cta-icon cta-call" title="Call (469) 994-2172" aria-label="Call (469) 994-2172">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <a href="sms:+14699942172" class="cta-icon cta-text" title="Text (469) 994-2172" aria-label="Text (469) 994-2172">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </a>
        <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="cta-icon cta-whatsapp" title="WhatsApp" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
        <a href="/contact" class="btn-book">Book Now →</a>
        <button class="hamburger" aria-label="Open menu" aria-expanded="false"><span></span></button>
      </div>
    </div>
  </div>
  <nav class="nav-mobile">
    <a href="/" class="${activePage === 'home' ? 'active' : ''}">Home</a>
    <a href="/bounce-houses" class="${activePage === 'bounce' ? 'active' : ''}">Bounce Houses</a>
    <a href="/movie-screen" class="${activePage === 'movie' ? 'active' : ''}">Movie Screen Rental</a>
    <a href="/popcorn-cart" class="${activePage === 'popcorn' ? 'active' : ''}">Popcorn Cart</a>
    <a href="/about" class="${activePage === 'about' ? 'active' : ''}">About Us</a>
    <a href="/contact" class="${activePage === 'contact' ? 'active' : ''}">Contact / Book Now</a>
  </nav>
</header>
`

// Shared Footer Component
const renderFooter = () => `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="col">
        <a href="/" class="footer-logo">🎪 EventsRentals<span class="io">.io</span></a>
        <p>Bringing the fun to backyards and events all across Texas. Bounce houses, movie screens, popcorn — booked with a phone call.</p>
        <div class="footer-contact-btns">
          <a href="tel:+14699942172" class="cta-call" title="Call (469) 994-2172" aria-label="Call">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <a href="sms:+14699942172" class="cta-text" title="Text (469) 994-2172" aria-label="Text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </a>
          <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="cta-whatsapp" title="WhatsApp" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
        </div>
        <div class="footer-social">
          <a href="https://www.facebook.com/share/1Brd4vbe3S/" target="_blank" rel="noopener" title="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.51h-2l-.396 3.98h2.396v8.01Z"/></svg>
          </a>
        </div>
      </div>
      <div class="col">
        <h4>Explore</h4>
        <a href="/">Home</a>
        <a href="/bounce-houses">Bounce Houses</a>
        <a href="/movie-screen">Movie Screen Rental</a>
        <a href="/popcorn-cart">Popcorn Cart</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact / Book Now</a>
      </div>
      <div class="col">
        <h4>Contact</h4>
        <a href="tel:+14699942172">📞 (469) 994-2172</a>
        <a href="sms:+14699942172">💬 Text us anytime</a>
        <a href="https://wa.me/14699942172" target="_blank" rel="noopener">🟢 WhatsApp us</a>
        <a href="mailto:hello@eventsrentals.io">✉️ hello@eventsrentals.io</a>
        <p style="margin-top: 12px;">🤠 Proudly serving all of Texas.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> EventsRentals.io — All rights reserved.</span>
      <span>Made with ❤️ in Texas</span>
    </div>
  </div>
</footer>
<script src="/static/shared.js"></script>
`

// HTML Page Skeleton
const renderHtml = ({
  title,
  description,
  activePage,
  content
}: {
  title: string
  description: string
  activePage: string
  content: string
}) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/shared.css" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎪</text></svg>">
</head>
<body>
  ${renderHeader(activePage)}
  ${content}
  ${renderFooter()}
</body>
</html>`

// 1. HOME PAGE
const renderHomePage = () => {
  const content = `
<!-- ============ HERO ============ -->
<section class="hero" data-screen-label="01 Home Hero">
  <div class="hero-bg">
    <div class="hero-slide" style="background-image:url('/assets/bounce-large-1.jpg')"></div>
    <div class="hero-slide" style="background-image:url('/assets/bounce-small-1.jpg')"></div>
    <div class="hero-slide" style="background-image:url('/assets/movie-2.jpg')"></div>
    <div class="hero-slide" style="background-image:url('/assets/popcorn-1.jpg')"></div>
  </div>
  <div class="hero-scrim"></div>
  <div class="hero-shapes">
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    <div class="circle c3"></div>
  </div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="pulse"></span>
        Now Serving All of Texas
      </div>
      <h1>Welcome to<br/><span class="highlight">EventsRentals.io</span></h1>
      <p class="sub">Proudly Serving All of Texas 🤠</p>
      <p class="body-copy">
        We bring the fun straight to your event — bounce houses, outdoor movie nights, and popcorn to match.
        Clean, safe equipment and easy booking by phone, text, or WhatsApp.
      </p>
      <div class="contact-row">
        <a href="tel:+14699942172" class="btn btn-yellow btn-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call to Book
        </a>
        <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          WhatsApp Us
        </a>
        <a href="sms:+14699942172" class="btn btn-white btn-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Text Us
        </a>
      </div>
      <div class="urgency-badge">
        ⚡ Weekend Dates Fill Up Fast — Book Early
      </div>
    </div>
  </div>
</section>

<!-- ============ WHAT WE OFFER ============ -->
<section class="offer-section" data-screen-label="02 What We Offer">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="container">
    <div style="text-align:center; margin-bottom: 20px;">
      <span class="eyebrow"><span class="dot"></span> What We Rent</span>
    </div>
    <h2 class="section-title">The Fun, Delivered.</h2>
    <p class="section-subtitle">Four handpicked party rentals — everything you need for an unforgettable Texas event.</p>

    <div class="offer-grid">
      <!-- Card 1: Large Bounce -->
      <a href="/bounce-houses#large" class="item-card">
        <div class="thumb">
          <span class="tag-sticker">Most Popular</span>
          <img src="/assets/bounce-large-1.jpg" alt="Large bounce house" />
        </div>
        <div class="body">
          <h3>Bounce House — Large</h3>
          <p>Perfect for big backyard parties and group events. Plenty of room to jump and play safely.</p>
          <span class="price-line">📞 Call for Pricing</span>
          <span class="btn btn-primary btn-sm" style="align-self: flex-start;">Book This →</span>
        </div>
      </a>

      <!-- Card 2: Small Bounce -->
      <a href="/bounce-houses#small" class="item-card">
        <div class="thumb">
          <span class="tag-sticker green">Toddler-Safe</span>
          <img src="/assets/bounce-small-1.jpg" alt="Small toddler bounce house" />
        </div>
        <div class="body">
          <h3>Bounce House — Small</h3>
          <p>Ideal for toddlers and smaller spaces — all the fun, right-sized for little ones.</p>
          <span class="price-line">📞 Call for Pricing</span>
          <span class="btn btn-yellow btn-sm" style="align-self: flex-start;">Book This →</span>
        </div>
      </a>

      <!-- Card 3: Movie -->
      <a href="/movie-screen" class="item-card">
        <div class="thumb">
          <span class="tag-sticker red">Movie Night</span>
          <img src="/assets/movie-2.jpg" alt="Movie screen setup" />
        </div>
        <div class="body">
          <h3>Movie Screen + HD Projector</h3>
          <p>Turn your backyard into a movie theater. Includes big screen, HD projector, and easy setup.</p>
          <span class="price-line">📞 Call for Pricing</span>
          <span class="btn btn-red btn-sm" style="align-self: flex-start;">Book This →</span>
        </div>
      </a>

      <!-- Card 4: Popcorn -->
      <a href="/popcorn-cart" class="item-card">
        <div class="thumb">
          <span class="tag-sticker">Fan Favorite</span>
          <img src="/assets/popcorn-1.jpg" alt="Popcorn cart" />
        </div>
        <div class="body">
          <h3>Popcorn Cart</h3>
          <p>Fresh, hot popcorn served right at your event — the perfect add-on for movie nights and parties.</p>
          <span class="price-line">📞 Call for Pricing</span>
          <span class="btn btn-white btn-sm" style="align-self: flex-start;">Book This →</span>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ============ TRUST STRIP ============ -->
<section class="trust-strip">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16.5A2.5 2.5 0 0 1 11.5 19h-9v-3.5A2.5 2.5 0 0 1 5 13h6.5A2.5 2.5 0 0 1 14 15.5v1z"/><circle cx="7" cy="9" r="3"/><path d="M16 3h5v5"/><path d="m21 3-6.5 6.5"/></svg>
        </div>
        <span>Free Delivery<br/>& Setup</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <span>Clean & Sanitized<br/>Equipment</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <span>Booking Confirmed<br/>by Phone Call</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <span>Serving All<br/>of Texas</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <span>Call, Text,<br/>or WhatsApp</span>
      </div>
    </div>
  </div>
</section>

<!-- ============ HOW IT WORKS ============ -->
<section class="how-section" data-screen-label="03 How It Works">
  <div class="container">
    <div style="text-align:center; margin-bottom: 20px;">
      <span class="eyebrow"><span class="dot"></span> Easy as 1-2-3</span>
    </div>
    <h2 class="section-title">Booking Is Simple.</h2>
    <p class="section-subtitle">No online carts, no confusing checkouts — just three quick steps.</p>
    <div class="how-grid">
      <div class="how-card">
        <div class="num">1</div>
        <h3>Reach Out</h3>
        <p>Call, text, or message us on WhatsApp — or fill out the quick form on our Contact page. Tell us what you need and when.</p>
      </div>
      <div class="how-card">
        <div class="num">2</div>
        <h3>We Confirm</h3>
        <p>A real person calls you back to lock in your date, price, and delivery details. No credit card surprises.</p>
      </div>
      <div class="how-card">
        <div class="num">3</div>
        <h3>We Deliver</h3>
        <p>We show up on time, set everything up, and pick it back up when the party's over. You just enjoy the day.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ INSTAGRAM GALLERY ============ -->
<section class="gallery-section" data-screen-label="04 Gallery">
  <div class="container">
    <div style="text-align:center; margin-bottom: 20px;">
      <span class="eyebrow" style="background: var(--white);"><span class="dot"></span> From Our Events</span>
    </div>
    <h2 class="section-title">Real Parties. Real Fun.</h2>
    <p class="section-subtitle">A peek at what your weekend could look like.</p>

    <div class="ig-grid">
      <a href="/assets/bounce-large-1.jpg" target="_blank">
        <img src="/assets/bounce-large-1.jpg" alt="Large bounce house at party" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div>
      </a>
      <a href="/assets/bounce-large-2.jpg" target="_blank">
        <img src="/assets/bounce-large-2.jpg" alt="Party" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/movie-1.jpg" target="_blank">
        <img src="/assets/movie-1.jpg" alt="Movie night" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/popcorn-1.jpg" target="_blank">
        <img src="/assets/popcorn-1.jpg" alt="Popcorn cart" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/party-1.jpg" target="_blank">
        <img src="/assets/party-1.jpg" alt="Backyard party" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/bounce-small-1.jpg" target="_blank">
        <img src="/assets/bounce-small-1.jpg" alt="Small bounce" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/movie-2.jpg" target="_blank">
        <img src="/assets/movie-2.jpg" alt="Movie screen" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/popcorn-2.jpg" target="_blank">
        <img src="/assets/popcorn-2.jpg" alt="Popcorn" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/bounce-large-3.jpg" target="_blank">
        <img src="/assets/bounce-large-3.jpg" alt="Bounce" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/bounce-small-2.jpg" target="_blank">
        <img src="/assets/bounce-small-2.jpg" alt="Toddler bounce" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/party-2.jpg" target="_blank">
        <img src="/assets/party-2.jpg" alt="Party rentals" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
      <a href="/assets/popcorn-3.jpg" target="_blank">
        <img src="/assets/popcorn-3.jpg" alt="Popcorn machine" />
        <div class="overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg></div>
      </a>
    </div>
    <div class="gallery-cta">
      <a href="https://www.facebook.com/share/1Brd4vbe3S/" target="_blank" rel="noopener" class="btn btn-yellow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.51h-2l-.396 3.98h2.396v8.01Z"/></svg>
        Follow Us on Facebook
      </a>
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="final-cta" data-screen-label="05 Final CTA">
  <div class="blob" style="top: -60px; left: -40px; width: 240px; height: 240px; background: var(--yellow);"></div>
  <div class="blob" style="bottom: -80px; right: -60px; width: 300px; height: 300px; background: var(--red);"></div>
  <div class="container" style="position: relative; z-index: 1;">
    <h2>Ready to Book Your Event?</h2>
    <p>Weekend dates fill up fast — reach out today and we'll lock in your fun.</p>
    <div class="contact-row">
      <a href="tel:+14699942172" class="btn btn-yellow btn-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        (469) 994-2172
      </a>
      <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        WhatsApp
      </a>
      <a href="sms:+14699942172" class="btn btn-white btn-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Text Us
      </a>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'EventsRentals.io — Bounce Houses, Movie Screens & Popcorn | All of Texas',
    description: 'Bounce houses, outdoor movie nights, and popcorn carts delivered across Texas. Clean, safe equipment. Book by phone, text, or WhatsApp.',
    activePage: 'home',
    content
  })
}

// 2. BOUNCE HOUSES PAGE
const renderBouncePage = () => {
  const content = `
<!-- ============ PAGE HERO ============ -->
<section class="page-hero" data-screen-label="01 Bounce Houses Hero">
  <div class="container">
    <span class="eyebrow"><span class="dot"></span> Bounce Houses</span>
    <h1>Big or Small — We've Got You Covered.</h1>
    <p>Choose the perfect size for your event. All units cleaned, sanitized, and delivered free anywhere in Texas.</p>
  </div>
</section>

<!-- ============ PRODUCT DETAIL ============ -->
<section class="product-detail">
  <div class="container">
    <!-- Large Bounce House -->
    <div class="product-block" id="large">
      <div class="gallery">
        <div class="main"><img src="/assets/bounce-large-1.jpg" alt="Large bounce house main view"/></div>
        <div class="thumb-sm"><img src="/assets/bounce-large-2.jpg" alt="Large bounce house side view"/></div>
        <div class="thumb-sm"><img src="/assets/bounce-large-3.jpg" alt="Large bounce house rainbow"/></div>
      </div>
      <div class="details">
        <span class="eyebrow" style="background: var(--red); color: var(--white); border-color: var(--ink);"><span class="dot" style="background: var(--yellow);"></span> Most Popular</span>
        <h2 style="margin-top: 16px;">Large Bounce House</h2>
        <p class="intro">Our big-kid crowd-pleaser. Enough room for a whole birthday party to jump, slide, and burn off endless energy. Perfect for backyards, block parties, and school events.</p>
        <ul class="spec-list">
          <li><span class="k">Dimensions</span><span class="v">Approx. 15 × 15 ft (confirm on booking)</span></li>
          <li><span class="k">Ages</span><span class="v">5 – 12 years</span></li>
          <li><span class="k">Capacity</span><span class="v">Up to 8 kids at a time</span></li>
          <li><span class="k">Power</span><span class="v">Standard outlet within 100 ft</span></li>
          <li><span class="k">Setup space</span><span class="v">Flat 20 × 20 ft area, min. 8 ft overhead clearance</span></li>
          <li><span class="k">Price</span><span class="v" style="color: var(--sky-600);">📞 Call for pricing — (469) 994-2172</span></li>
        </ul>
        <div class="contact-row">
          <a href="tel:+14699942172" class="btn btn-primary">📞 Call to Book</a>
          <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20LARGE%20bounce%20house." target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp Us</a>
          <a href="/contact" class="btn btn-yellow">Book Online →</a>
        </div>
      </div>
    </div>

    <!-- Small Bounce House -->
    <div class="product-block reverse" id="small">
      <div class="gallery">
        <div class="main"><img src="/assets/bounce-small-1.jpg" alt="Small toddler bounce house"/></div>
        <div class="thumb-sm"><img src="/assets/bounce-small-2.jpg" alt="Toddler bounce house play"/></div>
        <div class="thumb-sm"><img src="/assets/bounce-small-3.jpg" alt="Toddler castle bounce"/></div>
      </div>
      <div class="details">
        <span class="eyebrow" style="background: var(--green); color: var(--white); border-color: var(--ink);"><span class="dot" style="background: var(--yellow);"></span> Toddler-Safe</span>
        <h2 style="margin-top: 16px;">Small Bounce House</h2>
        <p class="intro">The right-sized bouncer for the littles. Softer play area, lower walls, and easy access — designed for toddlers and preschoolers to feel safe and have a blast.</p>
        <ul class="spec-list">
          <li><span class="k">Dimensions</span><span class="v">Approx. 9 × 9 ft (confirm on booking)</span></li>
          <li><span class="k">Ages</span><span class="v">2 – 6 years</span></li>
          <li><span class="k">Capacity</span><span class="v">Up to 4 kids at a time</span></li>
          <li><span class="k">Power</span><span class="v">Standard outlet within 100 ft</span></li>
          <li><span class="k">Setup space</span><span class="v">Flat 12 × 12 ft area, min. 7 ft overhead clearance</span></li>
          <li><span class="k">Price</span><span class="v" style="color: var(--sky-600);">📞 Call for pricing — (469) 994-2172</span></li>
        </ul>
        <div class="contact-row">
          <a href="tel:+14699942172" class="btn btn-primary">📞 Call to Book</a>
          <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20SMALL%20bounce%20house." target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp Us</a>
          <a href="/contact" class="btn btn-yellow">Book Online →</a>
        </div>
      </div>
    </div>

    <div class="callout-note" style="margin-top: 32px;">
      <div class="ico">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <div>
        <strong>Safety first.</strong> All units are inspected, cleaned, and sanitized before every rental. Setup and breakdown are always included — you don't lift a finger.
      </div>
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="final-cta" data-screen-label="05 Final CTA">
  <div class="blob" style="top: -60px; left: -40px; width: 240px; height: 240px; background: var(--yellow);"></div>
  <div class="blob" style="bottom: -80px; right: -60px; width: 300px; height: 300px; background: var(--red);"></div>
  <div class="container" style="position: relative; z-index: 1;">
    <h2>Ready to Book Your Bounce House?</h2>
    <p>Weekend dates fill up fast — reach out today and we'll lock in your fun.</p>
    <div class="contact-row">
      <a href="tel:+14699942172" class="btn btn-yellow btn-lg">📞 (469) 994-2172</a>
      <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20bounce%20house%20with%20EventsRentals.io" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">WhatsApp</a>
      <a href="sms:+14699942172" class="btn btn-white btn-lg">Text Us</a>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'Bounce House Rentals — Large & Small | EventsRentals.io Texas',
    description: 'Large and small bounce house rentals across Texas. Clean, safe, delivered free. Book by call, text, or WhatsApp.',
    activePage: 'bounce',
    content
  })
}

// 3. MOVIE SCREEN PAGE
const renderMoviePage = () => {
  const content = `
<!-- ============ PAGE HERO ============ -->
<section class="page-hero" data-screen-label="01 Movie Screen Hero">
  <div class="container">
    <span class="eyebrow"><span class="dot"></span> Movie Screen & HD Projector</span>
    <h1>Backyard? Meet Big Screen.</h1>
    <p>Host an unforgettable outdoor movie night, right in your backyard.</p>
  </div>
</section>

<!-- ============ PRODUCT DETAIL ============ -->
<section class="product-detail">
  <div class="container">
    <div class="product-block">
      <div class="gallery">
        <div class="main"><img src="/assets/movie-2.jpg" alt="Outdoor movie screen at dusk"/></div>
        <div class="thumb-sm"><img src="/assets/movie-1.jpg" alt="Movie screen setup"/></div>
        <div class="thumb-sm"><img src="/assets/movie-3.jpg" alt="Backyard movie night"/></div>
      </div>
      <div class="details">
        <span class="eyebrow" style="background: var(--red); color: var(--white); border-color: var(--ink);"><span class="dot" style="background: var(--yellow);"></span> Movie Night Magic</span>
        <h2 style="margin-top: 16px;">Movie Screen + HD Projector</h2>
        <p class="intro">Everything you need to turn your yard into an open-air theater. We show up, set up the screen and projector, and hand you the cables — you press play.</p>

        <h3 style="font-family: 'Fredoka', sans-serif; font-size: 1.2rem; margin: 20px 0 12px; color: var(--sky-700);">What's Included</h3>
        <ul class="spec-list">
          <li><span class="k">Big screen</span><span class="v">12 ft or 16 ft option (confirm on booking)</span></li>
          <li><span class="k">Projector</span><span class="v">HD projector, HDMI-ready</span></li>
          <li><span class="k">Cables</span><span class="v">HDMI + power cables, extension cords</span></li>
          <li><span class="k">Speakers</span><span class="v">Available on request</span></li>
          <li><span class="k">Setup + breakdown</span><span class="v">Fully included</span></li>
        </ul>

        <h3 style="font-family: 'Fredoka', sans-serif; font-size: 1.2rem; margin: 20px 0 12px; color: var(--sky-700);">Setup Requirements</h3>
        <ul class="spec-list">
          <li><span class="k">Space</span><span class="v">Flat open area, min. 20 × 20 ft</span></li>
          <li><span class="k">Power</span><span class="v">Standard outlet within 100 ft</span></li>
          <li><span class="k">Best time</span><span class="v">Starts after dusk for clearest picture</span></li>
          <li><span class="k">Price</span><span class="v" style="color: var(--sky-600);">📞 Call for pricing — (469) 994-2172</span></li>
        </ul>

        <div class="contact-row" style="margin-bottom: 20px;">
          <a href="tel:+14699942172" class="btn btn-primary">📞 Call to Book</a>
          <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20movie%20screen%20and%20projector." target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp Us</a>
          <a href="/contact" class="btn btn-yellow">Book Online →</a>
        </div>

        <div class="callout-note pair">
          <div class="ico" style="background: var(--red); color: var(--white);">🍿</div>
          <div><strong>Pairs perfectly</strong> with our Popcorn Cart — the ultimate movie night combo. <a href="/popcorn-cart" style="color: var(--sky-700); text-decoration: underline; font-weight:800;">See popcorn →</a></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="final-cta" data-screen-label="05 Final CTA">
  <div class="blob" style="top: -60px; left: -40px; width: 240px; height: 240px; background: var(--yellow);"></div>
  <div class="blob" style="bottom: -80px; right: -60px; width: 300px; height: 300px; background: var(--red);"></div>
  <div class="container" style="position: relative; z-index: 1;">
    <h2>Ready for Movie Night Under the Stars?</h2>
    <p>Weekend dates fill up fast — reach out today and we'll lock in your fun.</p>
    <div class="contact-row">
      <a href="tel:+14699942172" class="btn btn-yellow btn-lg">📞 (469) 994-2172</a>
      <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20movie%20screen%20and%20projector." target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">WhatsApp</a>
      <a href="sms:+14699942172" class="btn btn-white btn-lg">Text Us</a>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'Outdoor Movie Screen & HD Projector Rental | EventsRentals.io Texas',
    description: 'Turn your backyard into an open-air theater. Big screen + HD projector rentals across Texas. Book by call, text, or WhatsApp.',
    activePage: 'movie',
    content
  })
}

// 4. POPCORN CART PAGE
const renderPopcornPage = () => {
  const content = `
<!-- ============ PAGE HERO ============ -->
<section class="page-hero" data-screen-label="01 Popcorn Hero">
  <div class="container">
    <span class="eyebrow"><span class="dot"></span> Popcorn Cart Rental</span>
    <h1>Fresh Popcorn. Right at Your Event.</h1>
    <p>The vintage-style cart that turns any gathering into an old-timey good time.</p>
  </div>
</section>

<!-- ============ PRODUCT DETAIL ============ -->
<section class="product-detail">
  <div class="container">
    <div class="product-block reverse">
      <div class="gallery">
        <div class="main"><img src="/assets/popcorn-1.jpg" alt="Vintage popcorn cart"/></div>
        <div class="thumb-sm"><img src="/assets/popcorn-2.jpg" alt="Popcorn cart red"/></div>
        <div class="thumb-sm"><img src="/assets/popcorn-3.jpg" alt="Popcorn cart wheels"/></div>
      </div>
      <div class="details">
        <span class="eyebrow"><span class="dot"></span> Fan Favorite Add-On</span>
        <h2 style="margin-top: 16px;">Popcorn Cart</h2>
        <p class="intro">Freshly-popped, buttery, movie-theater-style popcorn served right at your event. The showstopper add-on that makes any birthday, movie night, or block party feel extra special.</p>

        <h3 style="font-family: 'Fredoka', sans-serif; font-size: 1.2rem; margin: 20px 0 12px; color: var(--sky-700);">What's Included</h3>
        <ul class="spec-list">
          <li><span class="k">Cart & popper</span><span class="v">Classic red vintage-style cart with popcorn machine</span></li>
          <li><span class="k">Popcorn supply</span><span class="v">Serves approx. 50 guests (confirm on booking)</span></li>
          <li><span class="k">Bags & napkins</span><span class="v">Included — enough for the full serving count</span></li>
          <li><span class="k">Butter & salt</span><span class="v">Included</span></li>
          <li><span class="k">Setup + breakdown</span><span class="v">Fully included</span></li>
          <li><span class="k">Price</span><span class="v" style="color: var(--sky-600);">📞 Call for pricing — (469) 994-2172</span></li>
        </ul>

        <div class="contact-row" style="margin-bottom: 20px;">
          <a href="tel:+14699942172" class="btn btn-primary">📞 Call to Book</a>
          <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20popcorn%20cart." target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp Us</a>
          <a href="/contact" class="btn btn-yellow">Book Online →</a>
        </div>

        <div class="callout-note pair">
          <div class="ico" style="background: var(--sky-500); color: var(--white);">🎬</div>
          <div><strong>Add it to your Movie Night</strong> for the full experience — nothing beats fresh popcorn under the stars. <a href="/movie-screen" style="color: var(--sky-700); text-decoration: underline; font-weight:800;">See movie screen →</a></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="final-cta" data-screen-label="05 Final CTA">
  <div class="blob" style="top: -60px; left: -40px; width: 240px; height: 240px; background: var(--yellow);"></div>
  <div class="blob" style="bottom: -80px; right: -60px; width: 300px; height: 300px; background: var(--red);"></div>
  <div class="container" style="position: relative; z-index: 1;">
    <h2>Ready to Add Fresh Popcorn to Your Party?</h2>
    <p>Weekend dates fill up fast — reach out today and we'll lock in your fun.</p>
    <div class="contact-row">
      <a href="tel:+14699942172" class="btn btn-yellow btn-lg">📞 (469) 994-2172</a>
      <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20the%20popcorn%20cart." target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">WhatsApp</a>
      <a href="sms:+14699942172" class="btn btn-white btn-lg">Text Us</a>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'Popcorn Cart Rental — Fresh Movie-Style Popcorn | EventsRentals.io Texas',
    description: 'Fresh popcorn cart and machine rental for parties and outdoor movie nights in Texas. Easy booking by phone, text, or WhatsApp.',
    activePage: 'popcorn',
    content
  })
}

// 5. CONTACT & BOOK NOW PAGE
const renderContactPage = () => {
  const content = `
<!-- ============ PAGE HERO ============ -->
<section class="page-hero" data-screen-label="01 Contact Hero">
  <div class="container">
    <span class="eyebrow"><span class="dot"></span> Book Now</span>
    <h1>Let's Book Your Event.</h1>
    <p>Fill out the form or reach us directly — we'll confirm your booking by phone call.</p>
  </div>
</section>

<!-- ============ FORM + CONTACT ============ -->
<section class="product-detail">
  <div class="container">
    <div class="contact-layout">
      <div class="form-block">
        <form id="booking-form" action="/api/booking" method="POST">
          <div class="form-row">
            <div class="form-field" style="margin-bottom: 0;">
              <label for="name">Full Name *</label>
              <input type="text" id="name" name="name" required placeholder="Jane Doe" autocomplete="name"/>
            </div>
            <div class="form-field" style="margin-bottom: 0;">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567" autocomplete="tel"/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field" style="margin-bottom: 0;">
              <label for="date">Event Date *</label>
              <input type="date" id="date" name="date" required/>
            </div>
            <div class="form-field" style="margin-bottom: 0;">
              <label for="city">City (Texas) *</label>
              <input type="text" id="city" name="city" required placeholder="Dallas, Austin, Houston, San Antonio..." autocomplete="address-level2"/>
            </div>
          </div>

          <div class="form-field">
            <label>Interested In (check all that apply)</label>
            <div class="checkbox-grid">
              <label class="checkbox-item">
                <input type="checkbox" name="items" value="large-bounce"/>
                <span>🎪 Large Bounce House</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="items" value="small-bounce"/>
                <span>🧸 Small Bounce House</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="items" value="movie"/>
                <span>🎬 Movie Screen & Projector</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="items" value="popcorn"/>
                <span>🍿 Popcorn Cart</span>
              </label>
            </div>
          </div>

          <div class="form-field">
            <label for="message">Message / Additional Details</label>
            <textarea id="message" name="message" placeholder="Tell us about your event — how many kids, what time, grass or driveway, any questions..."></textarea>
          </div>

          <button type="submit" id="submit-btn" class="btn btn-red btn-lg" style="width: 100%; justify-content: center;">
            Send My Booking Request →
          </button>

          <p class="form-note">
            📞 All bookings are confirmed via a quick phone call — we'll reach out shortly after you submit.
          </p>
        </form>
      </div>

      <aside class="contact-sidebar">
        <h3>Prefer to reach out directly?</h3>
        <p style="margin-bottom: 20px; color: var(--ink-2); font-weight: 600;">Pick your favorite way — we answer fast.</p>

        <a href="tel:+14699942172" class="direct-btn call">
          <div class="ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="label">
            <strong>Call Now</strong>
            <small>(469) 994-2172</small>
          </div>
        </a>

        <a href="sms:+14699942172" class="direct-btn text">
          <div class="ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="label">
            <strong>Text Us</strong>
            <small>Fastest replies</small>
          </div>
        </a>

        <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="direct-btn whatsapp">
          <div class="ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </div>
          <div class="label">
            <strong>WhatsApp</strong>
            <small>Chat with us</small>
          </div>
        </a>

        <a href="mailto:hello@eventsrentals.io" class="direct-btn" style="background: var(--white);">
          <div class="ico" style="background: var(--ink); color: var(--yellow);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="label">
            <strong>Email Us</strong>
            <small>hello@eventsrentals.io</small>
          </div>
        </a>

        <div style="margin-top: 24px; padding-top: 24px; border-top: 3px dashed var(--ink); text-align: center;">
          <p style="font-family: 'Fredoka', sans-serif; font-weight: 600; color: var(--ink);">
            🤠 Proudly serving all of Texas.
          </p>
        </div>
      </aside>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'Contact & Book — EventsRentals.io Texas',
    description: 'Book your bounce house, movie screen, or popcorn cart rental across Texas. Call, text, WhatsApp, or fill out the form.',
    activePage: 'contact',
    content
  })
}

// 6. ABOUT US PAGE
const renderAboutPage = () => {
  const content = `
<!-- ============ PAGE HERO ============ -->
<section class="page-hero" data-screen-label="01 About Hero">
  <div class="container">
    <span class="eyebrow"><span class="dot"></span> About Us</span>
    <h1>Family Fun, Texas Pride.</h1>
    <p>We are a family-owned party rental company dedicated to making celebrations stress-free and unforgettable.</p>
  </div>
</section>

<!-- ============ ABOUT CONTENT ============ -->
<section class="product-detail">
  <div class="container">
    <div class="product-block">
      <div class="gallery">
        <div class="main"><img src="/assets/party-1.jpg" alt="Party celebration in Texas"/></div>
        <div class="thumb-sm"><img src="/assets/party-2.jpg" alt="Event setup"/></div>
        <div class="thumb-sm"><img src="/assets/bounce-large-2.jpg" alt="Bounce house party"/></div>
      </div>
      <div class="details">
        <span class="eyebrow" style="background: var(--yellow); color: var(--ink);"><span class="dot" style="background: var(--red);"></span> Who We Are</span>
        <h2 style="margin-top: 16px;">The EventsRentals.io Story</h2>
        <p class="intro">Founded right here in the Lone Star State, EventsRentals.io was built on a simple promise: deliver clean, high-quality party rentals with zero hassle.</p>
        
        <p style="margin-bottom: 20px; font-size: 16px; color: var(--ink-2); line-height: 1.7;">
          We deliberately focus on four core items done exceptionally well: large bounce houses for high-energy kid parties, toddler-safe small bounce houses, outdoor movie screens with HD projectors, and vintage popcorn carts.
        </p>
        
        <ul class="spec-list">
          <li><span class="k">Service Area</span><span class="v">All of Texas (Dallas-Fort Worth, Austin, Houston, San Antonio & statewide)</span></li>
          <li><span class="k">Sanitization</span><span class="v">Hospital-grade clean before every rental</span></li>
          <li><span class="k">Setup & Breakdown</span><span class="v">100% included in every booking</span></li>
          <li><span class="k">Booking Confirmation</span><span class="v">Direct personal phone confirmation — no surprises</span></li>
          <li><span class="k">Reach Us</span><span class="v">Call, text, or WhatsApp (469) 994-2172</span></li>
        </ul>

        <div class="contact-row">
          <a href="tel:+14699942172" class="btn btn-primary">📞 Call (469) 994-2172</a>
          <a href="/contact" class="btn btn-yellow">Book Your Event →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ TRUST STRIP ============ -->
<section class="trust-strip">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16.5A2.5 2.5 0 0 1 11.5 19h-9v-3.5A2.5 2.5 0 0 1 5 13h6.5A2.5 2.5 0 0 1 14 15.5v1z"/><circle cx="7" cy="9" r="3"/><path d="M16 3h5v5"/><path d="m21 3-6.5 6.5"/></svg>
        </div>
        <span>Free Delivery<br/>& Setup</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <span>Clean & Sanitized<br/>Equipment</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <span>Booking Confirmed<br/>by Phone Call</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <span>Serving All<br/>of Texas</span>
      </div>
      <div class="trust-item">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <span>Call, Text,<br/>or WhatsApp</span>
      </div>
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="final-cta" data-screen-label="05 Final CTA">
  <div class="blob" style="top: -60px; left: -40px; width: 240px; height: 240px; background: var(--yellow);"></div>
  <div class="blob" style="bottom: -80px; right: -60px; width: 300px; height: 300px; background: var(--red);"></div>
  <div class="container" style="position: relative; z-index: 1;">
    <h2>Ready to Plan Your Texas Event?</h2>
    <p>Weekend dates fill up fast — reach out today and we'll lock in your fun.</p>
    <div class="contact-row">
      <a href="tel:+14699942172" class="btn btn-yellow btn-lg">📞 (469) 994-2172</a>
      <a href="https://wa.me/14699942172?text=Hi!%20I'd%20like%20to%20book%20a%20rental%20with%20EventsRentals.io" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">WhatsApp</a>
      <a href="sms:+14699942172" class="btn btn-white btn-lg">Text Us</a>
    </div>
  </div>
</section>
`
  return renderHtml({
    title: 'About Us — EventsRentals.io | Texas Party Rentals',
    description: 'Learn about EventsRentals.io. Family-owned party rentals serving all of Texas with clean bounce houses, movie screens, and popcorn machines.',
    activePage: 'about',
    content
  })
}

// Router Bindings
app.get('/', (c) => c.html(renderHomePage()))
app.get('/index.html', (c) => c.html(renderHomePage()))

app.get('/bounce-houses', (c) => c.html(renderBouncePage()))
app.get('/bounce-houses.html', (c) => c.html(renderBouncePage()))

app.get('/movie-screen', (c) => c.html(renderMoviePage()))
app.get('/movie-screen.html', (c) => c.html(renderMoviePage()))

app.get('/popcorn-cart', (c) => c.html(renderPopcornPage()))
app.get('/popcorn-cart.html', (c) => c.html(renderPopcornPage()))

app.get('/contact', (c) => c.html(renderContactPage()))
app.get('/contact.html', (c) => c.html(renderContactPage()))

app.get('/about', (c) => c.html(renderAboutPage()))
app.get('/about.html', (c) => c.html(renderAboutPage()))

export default app
