import type { Metadata } from "next";
import { Nunito, Fredoka, Caveat } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Zizou's Healthy Bakes | Organic Treats for New Moms & Kids",
  description: "Handcrafted by Zineb with love. Healthy treats made with organic fruits, dates, and nuts. Reduced sugar, maximum nutrition for new mothers and growing children.",
  keywords: "Zizou healthy bakes, Zineb bakery, organic bakery, healthy baked goods, new mom nutrition, kids healthy snacks, reduced sugar treats, lactation cookies, organic baby food",
  authors: [{ name: "Zineb (Zizou)" }],
  creator: "Zizou's Healthy Bakes",
  publisher: "Zizou's Healthy Bakes",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zizoushealthybakes.com",
    siteName: "Zizou's Healthy Bakes",
    title: "Zizou's Healthy Bakes | Organic Treats for Moms & Kids",
    description: "Handcrafted by Zineb. Healthy baked goods with organic ingredients, reduced sugar, and maximum nutrition.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zizou's Healthy Bakes - Organic Treats by Zineb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zizou's Healthy Bakes | Organic Treats",
    description: "Handcrafted by Zineb with love for new moms and growing children",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable} ${caveat.variable}`}>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
