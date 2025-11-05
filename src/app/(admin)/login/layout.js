import Footer from "@/components/landings/Footer";
import Navbar from "@/components/landings/Navbar";
import { Geist, Geist_Mono } from "next/font/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden`}>{children}</body>
    </html>
  );
}
