'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { usePathname } from 'next/navigation'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isProductPage = pathname?.startsWith('/products/')
  const isSellerPage = pathname?.startsWith('/seller/')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!isProductPage && !isSellerPage && <Footer />}
    </div>
  )
}

