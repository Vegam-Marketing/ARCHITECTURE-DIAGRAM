import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plex-serif',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata = {
  title: 'AI Intime Architect — Build your sovereign AI blueprint',
  description:
    "In 10 minutes, get a custom agent blueprint and reference architecture mapped to your stack, your role, and your operational reality. Built on the sovereign AI platform deployed at BASF and Henkel via Vegam SFS.",
  metadataBase: new URL('https://architect.aiintime.com'),
  openGraph: {
    title: 'AI Intime Architect',
    description: "Don't just pilot AI. Operationalize it.",
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}
    >
      <body className="font-body antialiased bg-black text-stone-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
