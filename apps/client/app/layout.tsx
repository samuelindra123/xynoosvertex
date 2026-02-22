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
  title: "Xynoos Vertex — Engineering the Future of Software Infrastructure",
  description:
    "Xynoos Vertex is a precision-built software platform for engineering teams who demand technological sovereignty, composable architecture, and human-centered intelligence.",
  keywords: [
    "software platform",
    "engineering infrastructure",
    "API ecosystem",
    "composable architecture",
  ],
  openGraph: {
    title: "Xynoos Vertex",
    description:
      "Precision-built software infrastructure for engineering teams.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
