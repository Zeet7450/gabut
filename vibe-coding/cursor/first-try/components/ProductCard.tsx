'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, MessageCircle, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  onChatClick?: (product: Product) => void
}

export function ProductCard({ product, onChatClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      })
      if (!response.ok) throw new Error('Failed to add to cart')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (session) {
      addToCartMutation.mutate()
    }
  }

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onChatClick) {
      onChatClick(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-surface border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}

          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!session || addToCartMutation.isPending}
              className="bg-green-accent hover:bg-green-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChatClick}
              className="bg-yellow-accent hover:bg-yellow-accent/90 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Chat about this item"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.category === 'Makanan' 
                ? 'bg-green-accent text-white' 
                : 'bg-yellow-accent text-white'
            }`}>
              {product.category}
            </span>
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Wishlist functionality would go here
            }}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
            title="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-text-primary text-lg mb-2 line-clamp-2 group-hover:text-green-accent transition-colors">
            {product.title}
          </h3>
          
          <p className="text-text-muted text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-accent">
                Rp {product.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={!session || addToCartMutation.isPending}
                className="bg-green-accent hover:bg-green-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

    </motion.div>
  )
}


