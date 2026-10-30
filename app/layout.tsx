import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cupidity Center | Case No. 001",
  description: "An unusual case awaits investigation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
