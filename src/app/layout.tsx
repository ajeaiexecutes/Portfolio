import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay M B | Full-Stack Developer",
  description: "Crafting modern, high-performance web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2B59FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
