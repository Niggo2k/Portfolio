import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransitionWrapper } from "@/components/terminal/page-transition-wrapper";
import { EasterEggProvider } from "@/hooks/use-easter-eggs";
import {
  ClickTracker,
  KonamiMode,
  SecretTerminal,
  AchievementToast,
} from "@/components/easter-eggs";
import { KonamiListener } from "./konami-listener";
import "./globals.css";

const notoSans = Noto_Sans({ variable: "--font-sans", subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NICO OS | Full-Stack Developer Portfolio",
  description: "Personal portfolio of Nico, a Full-Stack Developer from Stuttgart, Germany. Built with Next.js, TypeScript, and a retro terminal aesthetic.",
  keywords: ["portfolio", "developer", "full-stack", "react", "next.js", "typescript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider>
          <EasterEggProvider>
            <ClickTracker>
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
              {/* Global Easter Egg Components */}
              <KonamiListener />
              <KonamiMode />
              <SecretTerminal />
              <AchievementToast />
            </ClickTracker>
          </EasterEggProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
