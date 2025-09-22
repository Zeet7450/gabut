'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  onChatClick?: (product: Product) => void
}

export function ProductCard({ product, onChatClick }: ProductCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="bg-gray-800/40 rounded-3xl overflow-hidden border border-gray-700/50 hover:border-green-accent/60 transition-all duration-300 hover:shadow-2xl hover:shadow-green-accent/20 hover:-translate-y-2 backdrop-blur-sm">
        <Link href={`/products/${product.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={product.imageUrl || '/placeholder-product.jpg'}
              alt={product.title}
              width={300}
              height={240}
              className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-sm font-bold rounded-full shadow-lg ${
                product.category === 'Makanan' 
                  ? 'bg-gradient-to-r from-green-accent to-yellow-accent text-white' 
                  : 'bg-gradient-to-r from-blue-accent to-purple-accent text-white'
              }`}>
                {product.category}
              </span>
            </div>

            {/* Wishlist button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Wishlist functionality would go here
                }}
                className="w-10 h-10 bg-gray-900/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                title="Add to wishlist"
              >
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <h3 className="text-white font-bold text-xl mb-3 line-clamp-2 group-hover:text-green-accent transition-colors duration-200">
              {product.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-green-accent font-bold text-2xl">
                  Rp {product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!session || addToCartMutation.isPending}
              className="w-full bg-gradient-to-r from-green-accent to-yellow-accent text-white py-3 px-4 rounded-2xl font-bold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}


