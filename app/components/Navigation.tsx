'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link href="/" className="logo">
          <div className="logo-mark">Z</div>
          <div className="logo-text">
            Zizou's
            <small>healthy bakes ✿</small>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#custom">Custom cakes</a>
          <a href="#story">Our story</a>
          <a href="#how">How it works</a>
        </div>
      </div>
    </nav>
  );
}
