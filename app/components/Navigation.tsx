'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import CartButton from './CartButton';
import CartModal from './CartModal';

interface NavigationLink {
  label: string
  url: string
}

interface NavigationProps {
  navigationLinks?: NavigationLink[]
}

export default function Navigation({ navigationLinks }: NavigationProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();

  // Default links if none provided from Sanity
  const defaultLinks = [
    { label: 'Shop', url: '#shop' },
    { label: 'Custom cakes', url: '#custom' },
    { label: 'Our story', url: '#story' },
    { label: 'How it works', url: '#how' },
  ];

  const links = navigationLinks && navigationLinks.length > 0 ? navigationLinks : defaultLinks;

  return (
    <>
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
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
            {session ? (
              <Link href="/dashboard" className="auth-link">
                My Account
              </Link>
            ) : (
              <Link href="/auth/signin" className="auth-link">
                Sign In
              </Link>
            )}
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
