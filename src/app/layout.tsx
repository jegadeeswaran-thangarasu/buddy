import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hey Buddy 💛",
  description: "A surprise for my favorite person",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Hey Buddy 💛",
    description: "A surprise for my favorite person",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💛</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        {/* Fix iOS 100vh — sets --dvh CSS variable to real inner height */}
        <Script id="dvh-fix" strategy="afterInteractive">{`
          function setDvh() {
            document.documentElement.style.setProperty('--dvh', window.innerHeight * 0.01 + 'px');
          }
          setDvh();
          window.addEventListener('resize', setDvh);
        `}</Script>
      </body>
    </html>
  );
}
