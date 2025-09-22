'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SortAsc, Search, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from '@/components/ProductCard'
import { ChatDrawer } from '@/components/ChatDrawer'
import { Product, SearchFilters } from '@/lib/types'

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || 'all',
    sortBy: 'newest',
  })
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', filters, searchQuery, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category)
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy)
      }
      if (searchQuery) {
        params.append('search', searchQuery)
      }
      if (filters.minPrice) {
        params.append('minPrice', filters.minPrice.toString())
      }
      if (filters.maxPrice) {
        params.append('maxPrice', filters.maxPrice.toString())
      }
      params.append('page', currentPage.toString())
      params.append('limit', '12')

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
  })

  const products = productsData?.products || []
  const pagination = productsData?.pagination

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, searchQuery])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }


  const handleChatClick = (product: Product) => {
    setSelectedProduct(product)
    setIsChatOpen(true)
  }

  const handleCategoryClick = (category: string) => {
    setFilters(prev => ({ ...prev, category }))
    setCurrentPage(1)
  }

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'Makanan', label: 'Food' },
    { value: 'Minuman', label: 'Beverages' },
    { value: 'Dessert', label: 'Desserts' },
    { value: 'Snack', label: 'Snacks' },
    { value: 'Healthy', label: 'Healthy' },
    { value: 'Fast Food', label: 'Fast Food' },
    { value: 'Coffee', label: 'Coffee' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                Shop
              </h1>
              <p className="text-text-secondary">
                Discover our amazing collection of food and beverages
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-10 bg-surface border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-accent hover:text-green-accent/80 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="bg-surface border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">Menu Categories</h3>
            <div className="grid grid-cols-8 gap-2">
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'all' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('all')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-accent to-yellow-accent rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">All</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Makanan' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Makanan')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🍽️</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Food</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Minuman' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Minuman')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🥤</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Beverages</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Dessert' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Dessert')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🍰</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Desserts</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Snack' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Snack')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🍿</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Snacks</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Healthy' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Healthy')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🥗</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Healthy</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Fast Food' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Fast Food')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">🍔</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Fast Food</p>
              </div>
              
              <div 
                className={`group cursor-pointer p-2 rounded-lg transition-all duration-200 text-center ${
                  filters.category === 'Coffee' ? 'bg-green-accent/20 border-2 border-green-accent' : 'hover:bg-gray-800/50 border-2 border-transparent'
                }`}
                onClick={() => handleCategoryClick('Coffee')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold text-sm">☕</span>
                </div>
                <p className="text-xs text-text-secondary font-medium">Coffee</p>
              </div>
              
            </div>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="w-full">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Sort Controls */}
              <div className="flex items-center space-x-2">
                <SortAsc className="w-4 h-4 text-text-muted" />
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="bg-surface border border-gray-700 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-green-accent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>


            </div>

            <div className="text-text-muted">
              {pagination && (
                <span>
                  Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, pagination.total)} of {pagination.total} products
                </span>
              )}
            </div>
          </div>

          {/* Products Grid/List */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-surface border border-gray-800 rounded-xl p-4 animate-pulse">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-3" />
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-3" />
                  <div className="h-6 bg-gray-700 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-4">Failed to load products</div>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-text-muted text-lg mb-4">No products found</div>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Refresh
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {products.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard 
                    product={product} 
                    onChatClick={handleChatClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-700 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const page = i + 1
                  const isCurrentPage = page === currentPage
                  const isNearCurrent = Math.abs(page - currentPage) <= 2
                  const isFirstOrLast = page === 1 || page === pagination.totalPages
                  
                  if (!isNearCurrent && !isFirstOrLast) {
                    if (page === 2 || page === pagination.totalPages - 1) {
                      return <span key={page} className="text-text-muted">...</span>
                    }
                    return null
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        isCurrentPage
                          ? 'bg-green-accent text-white'
                          : 'text-text-muted hover:text-text-primary hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                  className="p-2 border border-gray-700 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

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
    </div>
  )
}

