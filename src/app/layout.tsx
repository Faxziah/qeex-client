import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ModalProvider} from "@/app/context/ModalContext";

import { headers } from "next/headers";
import ContextProvider from "@/app/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qeex: ваш первый шаг в blockchain",
  description: "Qeex: смарт-контракты без кода",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased px-[30px] md:px-[100px] bg-background text-foreground`}
    >
    <script
      dangerouslySetInnerHTML={{
        __html: `
          const storedTheme = localStorage.getItem('color-theme');
          if (storedTheme === 'dark' || (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
            `,
      }}
    />
    <ContextProvider cookies={cookies}>
      <ModalProvider>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </ModalProvider>
    </ContextProvider>
    </body>
    </html>
  );
}
