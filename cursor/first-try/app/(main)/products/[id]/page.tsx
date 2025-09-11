'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, MessageCircle, Heart, Star, Plus, Minus } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ChatDrawer } from '@/components/ChatDrawer'
import { Product } from '@/lib/types'

export default function ProductDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      return response.json()
    },
  })

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      })
      if (!response.ok) throw new Error('Failed to add to cart')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const handleAddToCart = () => {
    if (session) {
      addToCartMutation.mutate()
    }
  }

  const handleChatClick = () => {
    setIsChatOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-700 rounded-xl" />
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-700 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
                <div className="h-6 bg-gray-700 rounded w-1/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-5/6" />
                  <div className="h-4 bg-gray-700 rounded w-4/6" />
                </div>
                <div className="h-12 bg-gray-700 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Product Not Found</h1>
          <p className="text-text-muted mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  // Mock images for demonstration
  const images = [
    product.imageUrl || '/placeholder-product.jpg',
    '/placeholder-product-2.jpg',
    '/placeholder-product-3.jpg',
    '/placeholder-product-4.jpg',
  ]

  const relatedProducts = [
    // This would typically come from an API call for related products
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square relative overflow-hidden rounded-xl bg-surface border border-gray-800"
            >
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-green-accent'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.category === 'Makanan' 
                    ? 'bg-green-accent text-white' 
                    : 'bg-yellow-accent text-white'
                }`}>
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-accent fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-text-muted">(4.5)</span>
                </div>
                <span className="text-text-muted">•</span>
                <span className="text-text-muted">50+ reviews</span>
              </div>

              <div className="text-3xl font-bold text-green-accent mb-6">
                Rp {product.price.toLocaleString()}
              </div>

              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-text-primary font-medium">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-text-primary font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!session || addToCartMutation.isPending}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
                  </span>
                </button>

                <button
                  onClick={handleChatClick}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2 py-4 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with CS</span>
                </button>

                <button className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                  <Heart className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              {!session && (
                <div className="mt-4 p-4 bg-yellow-accent/10 border border-yellow-accent/20 rounded-lg">
                  <p className="text-yellow-accent text-sm">
                    Please sign in to add items to your cart and chat with our AI assistant.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-surface border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Product Details</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Description</h3>
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Category:</span>
                    <span className="text-text-primary">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Price:</span>
                    <span className="text-text-primary">Rp {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Availability:</span>
                    <span className="text-green-accent">In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={product}
        productId={product.id}
      />
    </div>
  )
}

