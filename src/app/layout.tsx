import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppContextProvider } from "@/context/app-context";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PipLearn - Learn Python",
  description: "A minimal, focused platform to learn programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-neutral-200 selection:text-black">
        <AppContextProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#fff",
                border: "1px solid rgba(55,53,47,0.12)",
                color: "#37352F",
                fontSize: "13px",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                borderRadius: "10px",
              },
            }}
          />
        </AppContextProvider>
      </body>
    </html>
  );
}
