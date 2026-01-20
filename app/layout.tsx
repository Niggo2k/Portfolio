import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nico Epp | Full-Stack Developer & Freelance Engineer",
  description: "Full-stack developer crafting digital experiences from idea to scale. Specializing in Next.js, Laravel, and modern web applications. Creator of Paroot Cashback, IndieWrapped, and FastDomain.",
  keywords: ["Nico Epp", "Full-Stack Developer", "Freelance Developer", "Next.js", "Laravel", "React", "Vue.js", "TypeScript", "E-Commerce", "Web Development", "Software Engineer"],
  authors: [{ name: "Nico Epp", url: "https://nico.dev" }],
  creator: "Nico Epp",
  metadataBase: new URL("https://nico.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nico Epp | Full-Stack Developer & Freelance Engineer",
    description: "Full-stack developer crafting digital experiences from idea to scale. Specializing in Next.js, Laravel, and modern web applications.",
    url: "https://nico.dev",
    siteName: "Nico Epp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nico Epp - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Epp | Full-Stack Developer",
    description: "Full-stack developer crafting digital experiences from idea to scale.",
    creator: "@made_by_nico",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
