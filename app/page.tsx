import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { getProducts, getSiteSettings, getFeaturedProducts, urlFor } from '@/lib/sanity';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity CMS
  const products = await getProducts();
  const featuredProducts = await getFeaturedProducts();
  const settings = await getSiteSettings();
  return (
    <>
      {/* Announcement Bar */}
      <div className="announce">
        ✦ {settings?.deliveryInfo || 'Order by 8pm · we bake & deliver next day.'}
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">Organic · Handmade · Mom-approved</div>
              <h1>
                Real ingredients. <span className="wob green">happy</span> kids. Hidden <span className="wob"><u>sweetness</u></span>.
              </h1>
              <p className="hero-sub">
                Handmade, organic, reduced-sugar bakes made by a mom who reads every label so you don't have to.
              </p>
              <div className="hero-ctas">
                <Link href="#shop" className="btn btn-coral">Shop the bakes</Link>
                <Link href="#story" className="btn btn-ghost">Meet Zizou</Link>
                <div className="hero-rating">
                  <span className="stars">★★★★★</span>
                  Loved by 200+ Northern VA families
                </div>
              </div>
            </div>

            <div className="hero-art">
              <div className="blob b1"></div>
              <div className="blob b2"></div>
              <div className="blob b3"></div>

              {/* Featured Products - Show first 3 */}
              {featuredProducts.length > 0 ? (
                <>
                  {featuredProducts.slice(0, 3).map((product, index) => {
                    // Use hero image if available, otherwise fall back to regular image
                    const displayImage = product.heroImage || product.image;

                    return (
                      <div key={product._id} className={`hero-card c${index + 1}`}>
                        {displayImage ? (
                          <div style={{position: 'relative', width: '100%', height: '180px', overflow: 'hidden', borderRadius: '12px 12px 0 0', marginBottom: '10px'}}>
                            <Image
                              src={urlFor(displayImage).width(300).height(300).url()}
                              alt={product.name}
                              fill
                              sizes="240px"
                              style={{objectFit: 'cover'}}
                            />
                          </div>
                        ) : (
                          <div className="ph tint-coral"></div>
                        )}
                        <div className="label">{product.name}</div>
                        <div className="sub">${product.price} · {product.quantity}</div>
                      </div>
                    );
                  })}
                </>
              ) : (
                // Fallback to static cards if no featured products
                <>
                  <div className="hero-card c1">
                    <div className="ph tint-date"></div>
                    <div className="label">Date & walnut</div>
                    <div className="sub">$6 · Piece</div>
                  </div>

                  <div className="hero-card c2">
                    <div className="ph tint-mustard"></div>
                    <div className="label">Cranberry Lemon</div>
                    <div className="sub">$6 · Piece</div>
                  </div>

                  <div className="hero-card c3">
                    <div className="ph tint-pink"></div>
                    <div className="label">Lunchbox bites</div>
                    <div className="sub">$2 . Each</div>
                  </div>
                </>
              )}

              <div className="sticker s1">No refined sugar!</div>
              <div className="sticker s2">Kid approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-item">
              <div className="trust-ico">🍯</div>
              <div>
                <h4>No refined sugar</h4>
                <p>Sweetened with dates & fruit</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-ico">🌱</div>
              <div>
                <h4>100% organic</h4>
                <p>Flour, fruit, nuts — all of it</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-ico">🥣</div>
              <div>
                <h4>Handmade daily</h4>
                <p>Small batches, never frozen</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-ico">💗</div>
              <div>
                <h4>Mom-led recipes</h4>
                <p>Born in our home kitchen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="section" id="shop">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">The bake list</span>
              <h2>Always Fresh —</h2>
              <p style={{margin: 0, fontSize: '15px', color: 'var(--ink-soft)', fontWeight: 600}}>
                Order by 8pm · we bake & deliver next day.
              </p>
            </div>
          </div>

          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product">
                  {product.image ? (
                    <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
                      <Image
                        src={urlFor(product.image).width(600).height(600).url()}
                        alt={`product photo · ${product.name}`}
                        fill
                        sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
                        style={{objectFit: 'cover'}}
                      />
                    </div>
                  ) : (
                    <div className="ph tint-coral"></div>
                  )}
                  <div className="body">
                    <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>
                      {product.quantity.toUpperCase()}
                    </div>
                    <h3>{product.name}</h3>
                    <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                      {product.description}
                    </p>
                    <div className="price">${product.price}</div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback content when Sanity isn't connected yet
              <>
                <div className="product">
                  <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
                    <Image
                      src="/date-walnut-loaf.png"
                      alt="product photo · date & walnut mini cake"
                      fill
                      sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="body">
                    <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>1 CAKE</div>
                    <h3>Date & Walnut Mini Cake</h3>
                    <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                      Sticky-sweet from medjool dates, never sugar.
                    </p>
                    <div className="price">$30</div>
                  </div>
                </div>
                <div className="product">
                  <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
                    <Image
                      src="/cranberry-lemon-cake1.png"
                      alt="product photo · cranberry lemon cake"
                      fill
                      sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="body">
                    <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>1 CAKE</div>
                    <h3>Cranberry Lemon Cake</h3>
                    <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                      Tangy from Lemon and Cranberry all Organic. Minimum sugar.
                    </p>
                    <div className="price">$30</div>
                  </div>
                </div>
                <div className="product">
                  <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
                    <Image
                      src="/blueberry-muffins.png"
                      alt="product photo · blueberry muffins"
                      fill
                      sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="body">
                    <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>12 MUFFINS</div>
                    <h3>Blueberry Muffins</h3>
                    <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                      Organic Blueberries with a hint of sugar.
                    </p>
                    <div className="price">$20</div>
                  </div>
                </div>
                <div className="product">
                  <div style={{position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '28px 28px 0 0'}}>
                    <Image
                      src="/celebration-cake.png"
                      alt="product photo · celebration cake"
                      fill
                      sizes="(max-width: 720px) 50vw, (max-width: 1040px) 33vw, 25vw"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="body">
                    <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>1 CAKE</div>
                    <h3>Celebration Cake</h3>
                    <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                      Rich, moist chocolate cake. Perfect celebration centerpiece.
                    </p>
                    <div className="price">$50</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact" style={{background: 'var(--paper)'}}>
        <div className="container">
          <div style={{maxWidth: '700px', margin: '0 auto', textAlign: 'center'}}>
            <span className="kicker">Get in touch</span>
            <h2 style={{fontFamily: 'var(--font-fredoka)', fontSize: 'clamp(32px, 3.6vw, 48px)', margin: '0 0 16px'}}>
              Ready to order?
            </h2>
            <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '32px', color: 'var(--ink-soft)'}}>
              Message us on WhatsApp to place your order or ask any questions. We're here to help!
            </p>
            <a
              href={`https://wa.me/${settings?.whatsappNumber?.replace(/\+/g, '') || '17572771735'}?text=Hi%20Zizou!%20I'd%20like%20to%20order%20from%20your%20healthy%20bakes`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-coral"
              style={{display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '18px', padding: '16px 32px'}}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section" id="story" style={{background: 'var(--bg-2)'}}>
        <div className="container">
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <span className="kicker">Our story</span>
            <h2 style={{fontFamily: 'var(--font-fredoka)', fontSize: 'clamp(32px, 3.6vw, 48px)', margin: '0 0 24px'}}>
              I started baking because <span className="script" style={{color: 'var(--coral)', fontStyle: 'italic'}}>my kids deserved better.</span>
            </h2>
            <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '16px', color: 'var(--ink-soft)'}}>
              I'm Zizou — mom of two, lifelong baker, and unwilling reader of every snack ingredient label in Sainsbury's. After one too many "natural" muffins with five kinds of sugar, I started baking my own.
            </p>
            <p style={{fontSize: '18px', lineHeight: 1.6, marginBottom: '24px', color: 'var(--ink-soft)'}}>
              Then friends asked. Then their friends asked. So here we are — handmade bakes for moms who care, made with dates, oats, nuts and a lot of love.
            </p>
            <p className="script" style={{fontSize: '24px', color: 'var(--coral)'}}>— Zizou ✿</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings?.whatsappNumber?.replace(/\+/g, '') || '17572771735'}?text=Hi%20Zizou!%20I'd%20like%20to%20order%20from%20your%20healthy%20bakes`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
