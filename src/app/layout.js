import Footer from "@/components/landings/Footer";
import Navbar from "@/components/landings/Navbar";
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

// --- SEO metadata for the whole site ---
export const metadata = {
  title: {
    default: "CodeNergy | Empowering Digital Solutions",
    template: "%s | CodeNergy",
  },
  description:
    "CodeNergy builds high-quality web and mobile solutions using Next.js, React, and Node.js. Let's innovate together!",
  keywords: [
    "Next.js",
    "React",
    "Web Development",
    "CodeNergy",
    "MERN Stack",
    "Freelance Developer",
  ],
  authors: [{ name: "Zahid Jamali", url: "https://codenery.ae" }],
  creator: "Zahid Jamali",
  metadataBase: new URL("https://codenery.ae"),
  openGraph: {
    title: "CodeNergy — Empowering Digital Solutions",
    description:
      "Explore custom web and mobile apps built by CodeNergy. Professional solutions using Next.js and MERN Stack.",
    url: "https://codenery.ae",
    siteName: "CodeNergy",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "CodeNergy Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNergy — Empowering Digital Solutions",
    description:
      "Next.js and MERN-based professional solutions by Zahid Jamali.",
    creator: "@ZahidJamali",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/icon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
