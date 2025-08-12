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
  title: "Forrest Gump Experience",
  description:
    "A beautiful landing and interactive main page inspired by Forrest Gump.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${gloria.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
