import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      {/* Announcement Bar */}
      <div className="announce">
        ✦ Baked fresh every day in Ashburn, VA • Free local delivery on orders over $35
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
            {/* Date & Walnut Mini Cake */}
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

            {/* Cranberry Lemon Cake */}
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

            {/* Blueberry Muffins */}
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

            {/* Celebration Cake */}
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

            {/* Apple Cinnamon Cookies */}
            <div className="product">
              <div className="ph tint-coral"></div>
              <div className="body">
                <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>10 COOKIES</div>
                <h3>Apple Cinnamon Cookies</h3>
                <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                  Chewy oat cookies sweetened only with fruit.
                </p>
                <div className="price">$8</div>
              </div>
            </div>

            {/* Almond & Date Bars */}
            <div className="product">
              <div className="ph tint-green"></div>
              <div className="body">
                <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>6 BARS</div>
                <h3>Almond & Date Bars</h3>
                <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                  Three ingredients. Zero compromise.
                </p>
                <div className="price">$9</div>
              </div>
            </div>

            {/* Lunchbox Mini Bites Box */}
            <div className="product">
              <div className="ph tint-pink"></div>
              <div className="body">
                <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>12 MIXED</div>
                <h3>Lunchbox Mini Bites Box</h3>
                <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                  A week of snacks, sorted.
                </p>
                <div className="price">$12</div>
              </div>
            </div>

            {/* Custom Birthday Cake */}
            <div className="product">
              <div className="ph tint-pink"></div>
              <div className="body">
                <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '4px'}}>FROM $35</div>
                <h3>Custom Birthday Cake</h3>
                <p style={{fontSize: '14px', color: 'var(--ink-soft)', margin: '0 0 12px'}}>
                  Tell us their age & favourite fruit — we'll do the rest.
                </p>
                <div className="price">$35</div>
              </div>
            </div>
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
    </>
  );
}
