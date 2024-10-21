import type { Metadata } from "next";
import "./globals.css";
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}>
          <ClientOnly>
          <RegisterModal/>
          <Navbar/>
          </ClientOnly>
          
        {children}
      </body>
    </html>
  );
}
