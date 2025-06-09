import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ModalProvider} from "@/app/context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swap master: create own smart-contract",
  description: "Swap master: create own smart-contract",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased px-[30px] md:px-[100px] dark:`}>
    <ModalProvider>
      <Header/>
      {/*<main>{children}</main>*/}
      {/*<Footer/>*/}
    </ModalProvider>
    </body>
    </html>
  );
}
