import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VitalFokus - Clinical Intelligence & Homeopathic Repertorisation Platform",
  description: "Enterprise-grade homeopathic repertorisation, patient case management, and AI clinical inference engine inspired by RadarOpus.",
  icons: {
    icon: "/vitalfokus-icon.png",
    apple: "/vitalfokus-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">{children}</body>
    </html>
  );
}
