import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sijual - Modern Food & Beverage Store',
  description: 'Modern e-commerce platform with AI-powered customer service. Discover delicious food and refreshing beverages.',
  keywords: 'e-commerce, food, beverage, AI, customer service, online shopping, sijual',
  authors: [{ name: 'Sijual' }],
  openGraph: {
    title: 'Sijual - Modern Food & Beverage Store',
    description: 'Modern e-commerce platform with AI-powered customer service. Discover delicious food and refreshing beverages.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sijual - Modern Food & Beverage Store',
    description: 'Modern e-commerce platform with AI-powered customer service. Discover delicious food and refreshing beverages.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-primary text-text-primary`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

