import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  title: {
    default: "JETLAB",
    template: "%s | JETLAB",
  },
  description: "I’m a student passionate about technology, and I write technical articles on my blog.",
  openGraph: {
    title: "jetlab",
    description:
      "I’m a student passionate about technology, and I write technical articles on my blog.",
    url: "https://jet-lab.site",
    siteName: "jetlab",
    images: [
      {
        url: "https://jet-lab.site/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "Jetlab",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 min-h-screen flex flex-col`}
      >
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
