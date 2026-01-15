import "./globals.css";
import type { Metadata } from "next";
import ClientRoot from "../components/ClientRoot";

export const metadata: Metadata = {
  title: "Celebrity Identifier MLOps",
  description: "Identify celebrities + MLOps dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
