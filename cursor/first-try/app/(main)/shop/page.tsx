'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Filter, SortAsc, Grid, List, Search, X } from 'lucide-react'
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
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

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      sortBy: 'newest',
    })
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleChatClick = (product: Product) => {
    setSelectedProduct(product)
    setIsChatOpen(true)
  }

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'Makanan', label: 'Food' },
    { value: 'Minuman', label: 'Beverages' },
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
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Shop
          </h1>
          <p className="text-text-secondary">
            Discover our amazing collection of food and beverages
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:sticky lg:top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-surface border border-gray-800 rounded-lg mb-4"
              >
                <span className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </span>
                <Filter className="w-4 h-4" />
              </button>

              {/* Filters */}
              <motion.div
                initial={false}
                animate={{ 
                  height: showFilters || window.innerWidth >= 1024 ? 'auto' : 0,
                  opacity: showFilters || window.innerWidth >= 1024 ? 1 : 0
                }}
                className="lg:block overflow-hidden"
              >
                <div className="bg-surface border border-gray-800 rounded-lg p-6 space-y-6">
                  {/* Search */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Search</h3>
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full input pr-10"
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Category */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.value} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={filters.category === category.value}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="text-green-accent focus:ring-green-accent"
                          />
                          <span className="text-text-secondary">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Price Range</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-text-muted mb-1">Min Price</label>
                        <input
                          type="number"
                          value={filters.minPrice || ''}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="0"
                          className="w-full input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-text-muted mb-1">Max Price</label>
                        <input
                          type="number"
                          value={filters.maxPrice || ''}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="100000"
                          className="w-full input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={handleClearFilters}
                    className="w-full text-green-accent hover:text-green-accent/80 font-medium py-2 border border-green-accent rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
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

                <div className="flex items-center space-x-1 border border-gray-700 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-green-accent text-white' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-green-accent text-white' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-surface border border-gray-800 rounded-xl p-6 animate-pulse">
                    <div className="aspect-square bg-gray-700 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-4" />
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
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
                }
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
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct}
        productId={selectedProduct?.id}
      />
    </div>
  )
}

