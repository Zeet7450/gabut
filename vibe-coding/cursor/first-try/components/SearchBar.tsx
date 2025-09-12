'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, X, ArrowUp, ArrowDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/lib/types'

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return { products: [] }
      
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=5`)
      if (!response.ok) throw new Error('Search failed')
      return response.json()
    },
    enabled: query.length > 2,
    staleTime: 30000, // 30 seconds
  })

  const products = searchResults?.products || []

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < products.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && products[selectedIndex]) {
            handleProductClick(products[selectedIndex])
          } else if (query.trim()) {
            handleSearch()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, products, query, onClose])

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`)
    onClose()
  }

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 2)
    setSelectedIndex(-1)
  }

  return (
    <div className="bg-surface border border-gray-700 rounded-lg shadow-xl">
      <div className="flex items-center px-4 py-3 border-b border-gray-700">
        <Search className="w-4 h-4 text-text-muted mr-3" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none"
        />
        <button
          onClick={onClose}
          className="ml-2 p-1 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="px-4 py-3 text-text-muted text-sm">
              Searching...
            </div>
          ) : products.length > 0 ? (
            <div className="py-2">
              {products.map((product: Product, index: number) => (
                <motion.button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center space-x-3 ${
                    selectedIndex === index ? 'bg-gray-800' : ''
                  }`}
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                >
                  <img
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium truncate">
                      {product.title}
                    </p>
                    <p className="text-text-muted text-sm truncate">
                      {product.category} • Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                  {selectedIndex === index && (
                    <ArrowUp className="w-4 h-4 text-green-accent" />
                  )}
                </motion.button>
              ))}
              
              {query.trim() && (
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors text-green-accent font-medium"
                  >
                    Search for "{query}"
                  </button>
                </div>
              )}
            </div>
          ) : query.length > 2 ? (
            <div className="px-4 py-3 text-text-muted text-sm">
              No products found for "{query}"
            </div>
          ) : null}
        </motion.div>
      )}

      {!isOpen && query.length > 0 && query.length <= 2 && (
        <div className="px-4 py-3 text-text-muted text-sm">
          Type at least 3 characters to search
        </div>
      )}
    </div>
  )
}


