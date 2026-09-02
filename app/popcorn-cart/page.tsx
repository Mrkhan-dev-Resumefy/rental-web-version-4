import Link from 'next/link';

export const metadata = {
  title: 'Vintage Popcorn Machine & Cart Rentals Texas — EventsRentals.io',
  description: 'Nostalgic 8oz movie theater popcorn machine cart rental in Texas. Includes gourmet kernels, butter salt, and popcorn bags. Perfect for parties and movie nights.'
};

export default function PopcornCartPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow"><span className="dot"></span> Nostalgic Fun</span>
          <h1>Vintage Popcorn Cart Rentals in Texas</h1>
          <p>Treat your guests to the irresistible aroma and buttery crunch of freshly popped movie theater popcorn with our authentic antique-style popcorn cart.</p>
        </div>
      </section>

      <div className="product-detail">
        <div className="container">
          <article className="product-block" id="popcorn-cart">
            <div className="gallery">
              <div className="main">
                <img src="/images/popcorn-cart-vintage.png" alt="Texas Vintage Popcorn Cart Rental" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/popcorn-cart-vintage.png" alt="Popcorn machine kettle" loading="lazy" />
              </div>
              <div className="thumb-sm">
                <img src="/images/movie-screen-night.png" alt="Outdoor movie screen pairing" loading="lazy" />
              </div>
            </div>
            <div className="details">
              <span className="eyebrow" style={{ marginBottom: '12px' }}><span className="dot"></span> Delicious Treats</span>
              <h2>Commercial 8oz Antique Theater Popcorn Cart</h2>
              <p className="intro">
                Nothing beats the smell of fresh movie theater popcorn! Our commercial 8oz kettle antique-red cart produces up to 3 gallons of fresh, hot popcorn per batch (enough for 30+ servings every 5 minutes). Complete with warming deck, heat lamp, tempered glass, and vintage spoke wheels.
              </p>
              <ul className="spec-list">
                <li><span className="k">Supplies Included:</span><span className="v">50 gourmet popcorn portions (pre-measured kernels, coconut oil &amp; butter salt) + 50 serving bags</span></li>
                <li><span className="k">Capacity:</span><span className="v">8 oz stainless steel kettle, yields up to 30 servings every 5 minutes</span></li>
                <li><span className="k">Features:</span><span className="v">Heated warming deck, interior spotlight, storage cabinet</span></li>
                <li><span className="k">Power:</span><span className="v">Standard 110V 850W household outlet</span></li>
                <li><span className="k">Extra Supplies:</span><span className="v">Additional 50-portion supply kits available for only $20</span></li>
                <li><span className="k">Daily Rate:</span><span className="v" style={{ color: 'var(--red)', fontSize: '20px' }}>$85 / day (or $60 when paired with a screen or bounce house)</span></li>
              </ul>
              <div className="contact-row" style={{ marginTop: '20px' }}>
                <a href="tel:8328192838" className="btn btn-primary btn-md">Call to Book</a>
                <a href="https://wa.me/18328192838?text=Hi!%20I%20want%20to%20reserve%20the%20Popcorn%20Cart" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-md">WhatsApp</a>
                <Link href="/contact" className="btn btn-yellow btn-md">Request Quote</Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
