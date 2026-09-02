# EventsRentals.io

A bright, playful, high-converting party rental website for **EventsRentals.io** — proudly serving all of Texas (statewide).

## Project Overview
- **Name**: EventsRentals.io
- **Service Area**: All of Texas (Dallas-Fort Worth, Austin, Houston, San Antonio & Statewide)
- **Booking Method**: No online cart/checkout or payment processing — all inquiries are confirmed via direct phone call.
- **Contact Rails**: Instant click-to-action buttons on every page (Header, Hero, Product Details, Sidebar, and Footer):
  - 📞 **Call**: `tel:+14699942172` — (469) 994-2172
  - 💬 **Text (SMS)**: `sms:+14699942172`
  - 🟢 **WhatsApp**: `https://wa.me/14699942172?text=...` (with pre-filled booking inquiries)
  - ✉️ **Email**: `mailto:hello@eventsrentals.io`

---

## 4 Core Rental Offerings
1. **Jump House / Bounce House — Large** (`/bounce-houses#large`): 15 × 15 ft crowd-pleaser for ages 5–12.
2. **Jump House / Bounce House — Small** (`/bounce-houses#small`): 9 × 9 ft toddler-safe bouncer for ages 2–6.
3. **Movie Screen Rental with HD Projector** (`/movie-screen`): 12 ft or 16 ft screen + HD projector + cables + setup.
4. **Popcorn Cart / Machine** (`/popcorn-cart`): Vintage classic red cart, serves approx. 50 guests with bags, napkins, butter & salt.

---

## Pages & Routes
- `/` or `/index.html`: **Home** (Hero with video/slide crossfade & Ken Burns zoom, What We Rent 4-item grid, Trust Strip, 1-2-3 How It Works, Instagram-style Event Gallery, and Final CTA).
- `/bounce-houses` or `/bounce-houses.html`: **Bounce Houses** (Large & Small detail blocks, specs list, photos bento gallery, safety callout).
- `/movie-screen` or `/movie-screen.html`: **Movie Screen & HD Projector** (What's included, setup requirements, popcorn cart pair recommendation).
- `/popcorn-cart` or `/popcorn-cart.html`: **Popcorn Cart Rental** (What's included, movie screen pair recommendation).
- `/contact` or `/contact.html`: **Contact / Book Now** (Interactive inquiry form with live API submission, item selector checkboxes, and sticky direct contact sidebar).
- `/about` or `/about.html`: **About Us** (Company story, Texas coverage, sanitization & setup guarantees).

---

## API Endpoints
- `GET /api/health`: Health status, phone number, and service metadata.
- `GET /api/booking`: Returns list of booking inquiries and count.
- `POST /api/booking`: Submits new booking request (`{ name, phone, date, city, items, message }`) with input validation and instant phone confirmation notice.

---

## Design System & Tokens
- **Typography**: Display: *Fredoka* (700/600/500), Body: *Nunito* (400/600/700/800)
- **Color Palette**:
  - Sky Blue: `#0EA5E9` (Primary Brand), `#38BDF8`, `#E0F2FE`
  - Yellow: `#FACC15` (Highlight Accent)
  - Red: `#EF4444` (CTA Pop)
  - Green: `#22C55E` / `#25D366` (WhatsApp / Toddler-safe)
  - Ink: `#0F172A` (Borders, Text, Hard Shadows)
  - Cream: `#FFFBEB` / `#FFF7D6` (Backgrounds)
- **Sticker Shadows**: Hard offset `3px 3px 0 #0F172A`, `4px 4px 0 #0F172A`, `6px 6px 0 #0F172A`, `8px 8px 0 #0F172A`, `12px 12px 0 #0F172A`.

---

## Hostinger / Shared Hosting Deployment
Hostinger gives **403 Forbidden** when it cannot find an `index.html` file in your website's `public_html` root directory, or when file permissions / `.htaccess` rules block directory access.

This repository now includes:
- Ready-to-serve static HTML pages: `index.html`, `bounce-houses.html`, `movie-screen.html`, `popcorn-cart.html`, `about.html`, `contact.html`.
- Custom `.htaccess` file with Apache mod_rewrite for clean URLs (e.g. `eventsrentals.io/bounce-houses` automatically loads `bounce-houses.html`).
- All assets (`/assets/`, `shared.css`, `shared.js`).

### How to Deploy to Hostinger:
1. In Hostinger hPanel, open **File Manager** → go to `public_html/`.
2. Upload the contents of this repository directly into `public_html/`:
   - `index.html` (Must be directly inside `public_html/`)
   - `bounce-houses.html`
   - `movie-screen.html`
   - `popcorn-cart.html`
   - `about.html`
   - `contact.html`
   - `.htaccess`
   - `shared.css` and `shared.js`
   - `assets/` folder
3. Ensure file permissions are set to `644` for files and `755` for directories.
4. Your website will immediately load without 403 Forbidden errors!

