import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'CHARIS — Luxury AI Gift Concierge',
  description: 'Where every gift tells a story. Conversational AI luxury gift curation and emotional storytelling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0B090A] text-[#F9F6F0] antialiased min-h-screen flex flex-col selection:bg-[#4A0E22] selection:text-[#F3E5AB]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
