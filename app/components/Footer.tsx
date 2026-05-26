import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{background: 'var(--ink)', color: 'var(--paper)', padding: '64px 0 32px'}}>
      <div className="container">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px'}}>
          {/* Brand Column */}
          <div style={{gridColumn: 'span 2'}}>
            <Link href="/" className="logo" style={{marginBottom: '16px'}}>
              <div className="logo-mark">Z</div>
              <div className="logo-text" style={{color: 'var(--paper)'}}>
                Zizou's
                <small>healthy bakes ✿</small>
              </div>
            </Link>
            <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '400px'}}>
              Organic, handmade, reduced-sugar bakes for our family to yours.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 style={{fontFamily: 'var(--font-fredoka)', fontSize: '15px', fontWeight: 600, marginBottom: '16px'}}>Shop</h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li><a href="#shop" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Lunchbox bites</a></li>
              <li><a href="#shop" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Muffins & loaves</a></li>
              <li><a href="#shop" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Cookies</a></li>
              <li><a href="#custom" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Custom cakes</a></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 style={{fontFamily: 'var(--font-fredoka)', fontSize: '15px', fontWeight: 600, marginBottom: '16px'}}>About</h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li><a href="#story" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Our story</a></li>
              <li><a href="#how" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>How it works</a></li>
              <li><a href="/about" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>Allergens</a></li>
              <li><a href="/contact" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px'}}>FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'}}>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0}}>
            © {new Date().getFullYear()} Zizou's Healthy Bakes · made with love in Manchester
          </p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0}}>
            Registered home kitchen · Rating 5/5 ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
