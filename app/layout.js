import "./globals.css";

export const metadata = {
  title: {
    default: "Yuki & Lyraa — My Wifee",
    template: "%s | Yuki & Lyraa",
  },
  description: "A cinematic love-letter for Lyraa, celebrating March 3, 2026 with treasured memories, vows, and a forever kind of love.",
  applicationName: "Yuki & Lyraa",
  keywords: ["love story", "wife day", "Yuki", "Lyraa", "March 3 2026", "romantic letter website"],
  authors: [{ name: "Yuki" }],
  creator: "Yuki",
  icons: {
    icon: [
      { url: "/favicon-romance.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-romance.svg",
    apple: "/favicon-romance.svg",
  },
  openGraph: {
    title: "Yuki & Lyraa — My Wifee",
    description: "A cinematic love-letter for Lyraa, celebrating March 3, 2026.",
    type: "website",
    locale: "en_US",
    siteName: "Yuki & Lyraa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuki & Lyraa — My Wifee",
    description: "A cinematic love-letter for Lyraa, celebrating March 3, 2026.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#120926",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg?v=3" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon-romance.svg?v=3" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon.svg?v=3" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
