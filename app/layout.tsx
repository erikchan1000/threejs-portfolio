import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Erik's THREEjs Portfolio",
  description: "Erik Chan's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          src="https://kit.fontawesome.com/dcee5ef514.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className="light-theme">{children}</body>
    </html>
  );
}
