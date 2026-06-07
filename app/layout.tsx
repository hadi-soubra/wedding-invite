import type { Metadata } from 'next'
import { Amiri, Allura, Cormorant_Garamond, Alex_Brush } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
})

const allura = Allura({
  variable: '--font-allura',
  subsets: ['latin'],
  weight: '400',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

const alexBrush = Alex_Brush({
  variable: '--font-alex-brush',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Wedding Invitation',
  description: 'You are cordially invited',
  other: {
    'google': 'notranslate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      translate="no"
      className={`${amiri.variable} ${allura.variable} ${cormorant.variable} ${alexBrush.variable} notranslate`}
    >
      <body className="bg-black min-h-screen">{children}</body>
    </html>
  )
}
