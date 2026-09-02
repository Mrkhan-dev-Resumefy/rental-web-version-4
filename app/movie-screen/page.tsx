import Link from 'next/link';

export const metadata = {
  title: 'Inflatable Movie Screen Rentals Texas | Giant Outdoor Projector — EventsRentals.io',
  description: 'Giant 20ft inflatable movie screen, 1080p high-lumen projector, and high-power sound system rental in Texas. Perfect for backyard movie nights and watch parties.'
};

export default function MovieScreenPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><span className="dot"></span> Outdoor Cinema</span>
          <h1>Outdoor Movie Screen Rentals in Texas</h1>
          <p>Transform your backyard, church lawn, school field, or community park into a full-scale outdoor drive-in movie theater with giant screens and booming audio.</p>
        </div>
      </section>

      <div className="product-detail">
        <div className="container">
          {/* ITEM: Giant 20ft Inflatable Screen */}
          <article className="product-block" id="inflatable-movie-screen">
            <div className="gallery">
              <div className="main">
                <img src="/images/movie-screen-night.png" alt="Texas Inflatable Movie Screen Rental Night" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/movie-screen-night.png" alt="Projector and audio setup" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/popcorn-cart-vintage.png" alt="Popcorn cart add-on for movie night" loading="lazy" />
              </div>
            </div>
            <div className="details">
              <span className="eyebrow" style={{ marginBottom: '12px' }}><span className="dot"></span> Full Package</span>
              <h2>20ft Mega Outdoor Cinema Package</h2>
              <p className="intro">
                The ultimate movie night experience under the Texas stars! Complete turnkey setup including our massive 20-foot seamless diagonal inflatable screen, ultra-bright 1080p Full HD projector, 1,000-watt Bluetooth-enabled party sound system, and all necessary cabling.
              </p>
              <ul className="spec-list">
                <li><span className="k">Screen Size:</span><span className="v">20 ft diagonal (16:9 widescreen format, wrinkle-free matte white)</span></li>
                <li><span className="k">Projector:</span><span className="v">High-lumen Full HD 1080p projector with HDMI / Streaming stick inputs</span></li>
                <li><span className="k">Sound System:</span><span className="v">Dual 1000W high-clarity PA speakers with stands &amp; Bluetooth audio</span></li>
                <li><span className="k">Playback Support:</span><span className="v">Connect your Firestick, Roku, Apple TV, Laptop, or Gaming Console</span></li>
                <li><span className="k">Setup Time:</span><span className="v">We arrive 1-2 hours before sunset for full setup and audio testing</span></li>
                <li><span className="k">Rental Rate:</span><span className="v" style={{ color: 'var(--red)', fontSize: '20px' }}>$250 / night (all equipment included)</span></li>
              </ul>
              <div className="contact-row" style={{ marginTop: '20px' }}>
                <a href="tel:8328192838" className="btn btn-primary btn-md">Call to Book</a>
                <a href="https://wa.me/18328192838?text=Hi!%20I%20want%20to%20reserve%20the%20Outdoor%20Movie%20Screen%20Package" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-md">WhatsApp</a>
                <Link href="/contact" className="btn btn-yellow btn-md">Request Quote</Link>
              </div>
            </div>
          </article>

          {/* PAIRING CALLOUT */}
          <div className="callout-note pair" style={{ marginTop: '64px' }}>
            <div className="ico">🍿</div>
            <div>
              <strong>Perfect Movie Night Combo:</strong> Bundle the 20ft Inflatable Movie Screen with our Vintage Theater Popcorn Cart for the ultimate authentic drive-in movie atmosphere! Contact us for discounted combo package pricing.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
