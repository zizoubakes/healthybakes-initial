'use client';

import Link from 'next/link';

interface NavigationLink {
  label: string
  url: string
}

interface NavigationProps {
  navigationLinks?: NavigationLink[]
}

export default function Navigation({ navigationLinks }: NavigationProps) {
  // Default links if none provided from Sanity
  const defaultLinks = [
    { label: 'Shop', url: '#shop' },
    { label: 'Custom cakes', url: '#custom' },
    { label: 'Our story', url: '#story' },
    { label: 'How it works', url: '#how' },
  ];

  const links = navigationLinks && navigationLinks.length > 0 ? navigationLinks : defaultLinks;

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
        </div>
      </div>
    </nav>
  );
}
