'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from '@/components/ProductCard'
import { ChatDrawer } from '@/components/ChatDrawer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ProtectedLink } from '@/components/ProtectedLink'
import { Product } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'

export default function HomePage() {
  const { t } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const { data: featuredProducts, isLoading: isLoadingProducts, error: productsError } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await fetch('/api/products?limit=6')
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
    retry: 3,
    retryDelay: 1000,
  })

  const handleChatClick = (product: Product) => {
    setSelectedProduct(product)
    setIsChatOpen(true)
  }

  const features = [
    {
      icon: Zap,
      title: t('home.aiPoweredSupport'),
      description: t('home.aiPoweredSupportDesc'),
    },
    {
      icon: Shield,
      title: t('home.securePayments'),
      description: t('home.securePaymentsDesc'),
    },
    {
      icon: Users,
      title: t('home.communityDriven'),
      description: t('home.communityDrivenDesc'),
    },
  ]

  const stats = [
    { label: t('home.happyCustomers'), value: '10K+' },
    { label: t('home.productsSold'), value: '50K+' },
    { label: t('home.countries'), value: '25+' },
    { label: t('home.yearsExperience'), value: '5+' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6"
            >
              {t('home.welcome')}{' '}
              <span className="text-gradient">Sijual</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              {t('home.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <ProtectedLink
                href="/shop"
                className="relative overflow-hidden bg-gradient-to-r from-green-accent to-yellow-accent text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-accent/25 group w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-accent to-yellow-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>{t('home.exploreProducts')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </ProtectedLink>
              
              <Link
                href="/about"
                className="btn-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                {t('home.learnMore')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              {t('home.whyChooseUs')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              {t('home.whyChooseUsDesc')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center group hover:border-green-accent/50 transition-colors"
              >
                <div className="w-16 h-16 bg-green-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              {t('home.featuredProducts')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              {t('home.featuredProductsDesc')}
            </motion.p>
          </div>

          {isLoadingProducts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-surface border border-gray-800 rounded-xl p-6 animate-pulse">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-4" />
                  <div className="h-6 bg-gray-700 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-4">Failed to load products</div>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts?.products?.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onChatClick={handleChatClick}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <ProtectedLink
              href="/shop"
              className="relative overflow-hidden bg-gradient-to-r from-green-accent to-yellow-accent text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-accent/25 group inline-flex items-center space-x-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-accent to-yellow-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <span>{t('home.viewAllProducts')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </ProtectedLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-accent to-yellow-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {t('home.readyToStart')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            {t('home.readyToStartDesc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ProtectedLink
              href="/shop"
              className="relative overflow-hidden bg-white text-green-accent font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-white/15 group border-2 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-yellow-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">{t('home.shopNow')}</span>
            </ProtectedLink>
            <ProtectedLink
              href="/contact"
              className="relative overflow-hidden border-2 border-white text-white hover:text-white hover:scale-105 hover:shadow-md hover:shadow-white/25 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:border-white hover:bg-white/5"
            >
              <span className="relative">{t('home.contactUs')}</span>
            </ProtectedLink>
          </motion.div>
        </div>
      </section>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct || undefined}
        productId={selectedProduct?.id}
      />
    </div>
  )
}

