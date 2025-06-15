import type {Metadata} from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ModalProvider} from "@/app/context/ModalContext";
import {ThirdwebProvider} from "thirdweb/react";
import {ThemeProvider} from "next-themes";

export const metadata: Metadata = {
  title: "Qeex: твой первый шаг в блокчейн",
  description: "Qeex: смарт-контракты без кода",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`antialiased px-[30px] md:px-[100px] bg-background text-foreground`}>
    <ThemeProvider attribute="class" enableSystem>
      <ThirdwebProvider>
        <ModalProvider>
          <Header/>
          <main>{children}</main>
          <Footer/>
        </ModalProvider>
      </ThirdwebProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
