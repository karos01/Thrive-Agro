import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Thriveagro",
  description: "a app for farmers to sell their products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
