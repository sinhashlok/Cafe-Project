import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import TransitionProvider from "@/components/TransitionProvider";

export const metadata: Metadata = {
  title: "Cafe Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
