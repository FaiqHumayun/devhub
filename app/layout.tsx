import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "../app/components/providers/SessionProvider";
import Navbar from "./components/shared/Navbar";

export const metadata: Metadata = {
  title: "DevHub",
  description: "A full-stack developer community platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
