import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const gloria = Gloria_Hallelujah({
  variable: "--font-gloria",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forrest Gump",
  description:
    "A movie about retards, the disabled, and AIDS ridden",
  openGraph: {
    title: "Forrest Gump",
    description:
      "A movie about retards, the disabled, and AIDS ridden",
    images: [
      {
        url: "https://cdnb.artstation.com/p/assets/images/images/027/222/707/large/julia-solaris-3.jpg?1590941520",
        width: 1200,
        height: 630,
        alt: "Forrest Gump running on a country road",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forrest Gump",
    description:
      "A movie about retards, the disabled, and AIDS ridden",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/027/222/707/large/julia-solaris-3.jpg?1590941520",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${playfair.variable} ${gloria.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
