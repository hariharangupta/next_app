"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import {usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = usePathname();
  console.log(router);
  const loginComponent = router?.includes("/login");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {!loginComponent && <Navbar />}
        {children}
      </body>
    </html>
  );
}
