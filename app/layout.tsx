import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Numilex | Votre Partenaire Digital à Paris',
  description: 'Agence digitale parisienne spécialisée en solutions informatiques, marketing digital, social media et business support. Transformez votre entreprise avec Numilex.',
  keywords: ['agence digitale', 'Paris', 'marketing digital', 'développement web', 'social media', 'transformation digitale'],
  authors: [{ name: 'Numilex' }],
  openGraph: {
    title: 'Numilex | Votre Partenaire Digital à Paris',
    description: 'Agence digitale parisienne spécialisée en solutions informatiques, marketing digital, social media et business support.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1321',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
