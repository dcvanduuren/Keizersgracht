import type { Metadata } from "next";
import { Poppins, Sintony } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const sintony = Sintony({
  variable: "--font-sintony",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio — Data · Development · AI",
  description: "AI, software and data, built around how your team already operates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${sintony.variable}`}>
      <body suppressHydrationWarning className="antialiased selection:bg-coral selection:text-white">
        {children}
      </body>
    </html>
  );
}
