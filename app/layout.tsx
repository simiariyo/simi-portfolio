import type { Metadata } from "next";
// @ts-expect-error: allow side-effect global CSS import without type declarations
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victoria Ariyo — Frontend Lead & Developer",
  description: "Frontend Lead and React/Node.js Developer with 4+ years building production-grade systems at Sidmach Technologies, Lagos Nigeria.",
  keywords: ["Frontend Developer", "React Developer", "Node.js", "Lagos Nigeria", "Victoria Ariyo"],
  openGraph: {
    title: "Victoria Ariyo — Frontend Lead & Developer",
    description: "4+ years building production-grade web systems. React · Node.js · TypeScript · Azure.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={plusJakarta.className}>{children}</body>
    </html>
  );
}
