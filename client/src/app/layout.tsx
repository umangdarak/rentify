import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Header from "@/app/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rentify",
  description: "A Full Stack Real Estate Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header />
          {children}</Theme>
      </body>
    </html>
  );
}
