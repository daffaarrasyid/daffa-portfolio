import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Daffa Ar-Rasyid — Creative Developer & AI/Web Engineer",
  description: "Personal portfolio of Muhammad Daffa Ar-Rasyid featuring clean studio design, interactive 3D, and smooth animations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-studio-bg text-studio-text antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-500 font-sans">
        {children}
      </body>
    </html>
  );
}
