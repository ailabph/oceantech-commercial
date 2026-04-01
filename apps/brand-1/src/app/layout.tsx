import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heritage",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oceantech Commercial Diving | Underwater Welding & Marine Services",
  description:
    "Commercial diving services built on 45 years of ocean experience. Underwater welding, hull cleaning, structural repair, and marine operations from Cebu, Philippines.",
  keywords: [
    "commercial diving",
    "underwater welding",
    "hull cleaning",
    "marine services",
    "Cebu",
    "Philippines",
    "NDT inspection",
    "structural repair",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
