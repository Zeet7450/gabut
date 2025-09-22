'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, MessageCircle, Heart, Star, Plus, Minus } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ChatDrawer } from '@/components/ChatDrawer'
import { Product } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'

export default function ProductDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { language } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isAIPopupOpen, setIsAIPopupOpen] = useState(false)

  // Data testimoni lengkap dengan useMemo untuk update ketika bahasa berubah
  const allTestimonials = useMemo(() => [
    {
      id: 1,
      name: "Ahmad S.",
      rating: 5,
      comment: language === 'id' 
        ? "Rasanya sangat enak dan segar! Cocok banget untuk dinikmati di siang hari yang panas."
        : "The taste is very delicious and fresh! Perfect for enjoying on a hot afternoon.",
      avatar: "A",
      color: "bg-blue-accent",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Sari M.",
      rating: 5,
      comment: language === 'id' 
        ? "Kualitas produknya bagus, pengiriman cepat, dan harganya terjangkau. Recommended!"
        : "Good product quality, fast delivery, and affordable price. Recommended!",
      avatar: "S",
      color: "bg-green-accent",
      date: "2024-01-12"
    },
    {
      id: 3,
      name: "Budi K.",
      rating: 4,
      comment: language === 'id' 
        ? "Produknya oke, tapi pengiriman agak lama. Tapi overall puas dengan kualitasnya."
        : "The product is okay, but delivery is a bit slow. But overall satisfied with the quality.",
      avatar: "B",
      color: "bg-orange-500",
      date: "2024-01-10"
    },
    {
      id: 4,
      name: "Dewi L.",
      rating: 5,
      comment: language === 'id' 
        ? "Wah, ini benar-benar sesuai ekspektasi! Rasa autentik dan kemasan rapi. Akan repeat order lagi."
        : "Wow, this really meets expectations! Authentic taste and neat packaging. Will order again.",
      avatar: "D",
      color: "bg-pink-500",
      date: "2024-01-08"
    },
    {
      id: 5,
      name: "Rizki P.",
      rating: 5,
      comment: language === 'id' 
        ? "Customer service-nya responsif banget! Ada masalah langsung ditangani. Produknya juga fresh dan enak."
        : "The customer service is very responsive! Problems are handled immediately. The product is also fresh and delicious.",
      avatar: "R",
      color: "bg-indigo-500",
      date: "2024-01-05"
    },
    {
      id: 6,
      name: "Chef Maria",
      rating: 5,
      comment: language === 'id' 
        ? "Sebagai chef profesional, saya sangat merekomendasikan produk ini. Kualitas bahan dan rasa sangat memuaskan!"
        : "As a professional chef, I highly recommend this product. The ingredient quality and taste are very satisfying!",
      avatar: "C",
      color: "bg-yellow-500",
      date: "2024-01-03"
    },
    {
      id: 7,
      name: "Lisa W.",
      rating: 4,
      comment: language === 'id' 
        ? "Produknya bagus, tapi harganya agak mahal. Tapi worth it untuk kualitasnya."
        : "The product is good, but the price is a bit expensive. But it's worth it for the quality.",
      avatar: "L",
      color: "bg-purple-500",
      date: "2024-01-01"
    },
    {
      id: 8,
      name: "John D.",
      rating: 5,
      comment: language === 'id' 
        ? "Sangat puas dengan pembelian ini! Kemasan rapi dan produk fresh. Akan order lagi."
        : "Very satisfied with this purchase! Neat packaging and fresh product. Will order again.",
      avatar: "J",
      color: "bg-teal-500",
      date: "2023-12-28"
    }
  ], [language])

  const displayedTestimonials = allTestimonials.slice(0, 4)

  // Control body scroll when popup is open
  useEffect(() => {
    if (isAIPopupOpen) {
      document.body.classList.add('popup-open')
    } else {
      document.body.classList.remove('popup-open')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('popup-open')
    }
  }, [isAIPopupOpen])

  // Fungsi untuk format tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (language === 'id') {
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

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
      <div className="loading-container">
        <div className="loading-container-inner">
          <div className="loading-skeleton">
            <div className="loading-skeleton-title" />
            <div className="loading-grid">
              <div className="loading-space">
                <div className="loading-skeleton-main-image" />
                <div className="loading-grid-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="loading-skeleton-thumbnail" />
                  ))}
                </div>
              </div>
              <div className="loading-space-2">
                <div className="loading-skeleton-text-large w-3/4" />
                <div className="loading-skeleton-text-extra-small w-1/2" />
                <div className="loading-skeleton-text-medium w-1/4" />
                <div className="loading-space-3">
                  <div className="loading-skeleton-text-femto w-full" />
                  <div className="loading-skeleton-text-femto w-5/6" />
                  <div className="loading-skeleton-text-femto w-4/6" />
                </div>
                <div className="loading-skeleton-button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error-center-container">
          <h1 className="error-title">Product Not Found</h1>
          <p className="error-message">The product you're looking for doesn't exist.</p>
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
    '/placeholder-product.jpg',
    '/placeholder-product.jpg',
    '/placeholder-product.jpg',
  ]

  const relatedProducts = [
    // This would typically come from an API call for related products
  ]

  return (
    <div className="main-page-container">
      <div className="main-container">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">{language === 'id' ? 'Kembali ke Toko' : 'Back to Shop'}</span>
          </Link>
        </div>

        <div className="main-grid-container">
          {/* Product Images */}
          <div className="product-images-section">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="main-product-image"
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
                  className={`thumbnail-btn ${
                    selectedImage === index ? 'selected' : 'border-gray-700'
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
          <div className="product-info-section flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2">
                <span className={`category-badge ${
                  product.category === 'Makanan' ? 'food' : 'other'
                }`}>
                  {product.category}
                </span>
              </div>

              <h1 className="product-title">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`rating-star ${
                        i < 4 ? 'filled' : 'empty'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-text-muted">(4.5)</span>
                </div>
                <span className="text-text-muted">•</span>
                <span className="text-text-muted">50+ reviews</span>
              </div>

              <div className="price-display">
                Rp {product.price.toLocaleString()}
              </div>

              <div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>


              {/* Stock Status */}
              <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-accent rounded-full animate-pulse"></div>
          <span className="text-gray-300">{language === 'id' ? 'Stok Tersedia' : 'Stock Available'}</span>
        </div>
        <span className="text-green-accent font-semibold">15+ {language === 'id' ? 'item' : 'items'}</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="quantity-label">{language === 'id' ? 'Jumlah:' : 'Quantity:'}</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="quantity-display">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons-container">
                <button
                  onClick={handleAddToCart}
                  disabled={!session || addToCartMutation.isPending}
                  className={`flex-1 btn-product-primary flex items-center justify-center space-x-2 text-lg ${
                    addToCartMutation.isPending ? 'loading' : ''
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {addToCartMutation.isPending 
                      ? (language === 'id' ? 'Menambahkan...' : 'Adding...') 
                      : (language === 'id' ? 'Tambah ke Keranjang' : 'Add to Cart')
                    }
                  </span>
                </button>

                <button
                  onClick={handleChatClick}
                  className="flex-1 btn-product-secondary flex items-center justify-center space-x-2 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{language === 'id' ? 'Chat dengan CS' : 'Chat with CS'}</span>
                </button>

                <button className="heart-button">
                  <Heart className="heart-icon" />
                </button>
              </div>

              {!session && (
                <div className="warning-message">
                  <p className="text-yellow-accent text-sm">
                    {language === 'id' 
                      ? 'Silakan masuk untuk menambahkan item ke keranjang dan chat dengan asisten AI kami.'
                      : 'Please sign in to add items to your cart and chat with our AI assistant.'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>


        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="motion-container"
        >
          <div className="product-details-section">
            <div className="text-center mb-12">
              <h2 className="page-title">{language === 'id' ? 'Testimoni' : 'Testimonials'}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-accent to-yellow-accent mx-auto mt-4 rounded-full"></div>
            </div>
            
          <div className="space-y-6">
            {/* Testimoni Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {displayedTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-800/30 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex text-yellow-accent">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-accent' : 'text-gray-600'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">{testimonial.rating}.0</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${testimonial.color} rounded-full flex items-center justify-center`}>
                        <span className="text-sm font-semibold text-white">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{testimonial.name}</p>
                        <p className="text-gray-400 text-xs">{language === 'id' ? 'Pelanggan' : 'Customer'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">{formatDate(testimonial.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button View More Reviews */}
            <div className="text-center">
              <button 
                onClick={() => setIsAIPopupOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-accent to-yellow-accent text-white px-8 py-3 rounded-lg font-semibold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-accent/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{language === 'id' ? 'Lihat Testimoni Lainnya' : 'View More Reviews'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            </div>
          </div>
        </motion.div>

        {/* About Seller - Below Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="motion-container"
        >
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-blue-500/30">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">
                  {language === 'id' ? 'Tentang Penjual' : 'About Seller'}
                </h4>
              </div>
            </div>
            
            {/* Profil Penjual */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h5 className="text-white font-bold text-xl mb-1">John Smith</h5>
              <p className="text-gray-400 text-sm mb-3">{language === 'id' ? 'Penjual Terpercaya' : 'Trusted Seller'}</p>
              
              <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-full">
                <div className="flex text-yellow-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-300 font-medium">4.9</span>
                <span className="text-gray-500 text-sm">(127 {language === 'id' ? 'ulasan' : 'reviews'})</span>
              </div>
            </div>

            {/* Statistik Penjual */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 text-center border border-green-500/30">
                <div className="text-3xl font-bold text-green-accent mb-1">2.5K+</div>
                <div className="text-gray-400 text-sm">{language === 'id' ? 'Produk Terjual' : 'Products Sold'}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 text-center border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-accent mb-1">3+</div>
                <div className="text-gray-400 text-sm">{language === 'id' ? 'Tahun Berpengalaman' : 'Years Experience'}</div>
              </div>
            </div>

            {/* Deskripsi Penjual */}
            <div className="bg-gray-800/30 rounded-xl p-6 mb-8 border border-gray-700/50">
              <p className="text-gray-300 text-center leading-relaxed">
                {language === 'id' 
                  ? 'Penjual berpengalaman dengan fokus pada kualitas produk terbaik. Setiap produk telah melalui seleksi ketat untuk memastikan kepuasan pelanggan.'
                  : 'Experienced seller focused on the best quality products. Every product has gone through strict selection to ensure customer satisfaction.'
                }
              </p>
            </div>

            {/* Button Kontak */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-green-accent to-yellow-accent text-white px-8 py-3 rounded-xl font-semibold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105 shadow-lg">
                {language === 'id' ? 'Hubungi Penjual' : 'Contact Seller'}
              </button>
            <Link href="/seller/john-smith">
              <button className="px-8 py-3 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 hover:scale-105">
                {language === 'id' ? 'Lihat Toko' : 'View Store'}
              </button>
            </Link>
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

      {/* All Testimonials Popup */}
      {isAIPopupOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          style={{ 
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAIPopupOpen(false)
            }
          }}
        >
          <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-accent to-yellow-accent p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">
                      {language === 'id' ? 'Semua Testimoni Pelanggan' : 'All Customer Reviews'}
                    </h3>
                    <p className="text-green-100 text-sm">
                      {language === 'id' ? `${allTestimonials.length} testimoni dari pelanggan yang puas` : `${allTestimonials.length} reviews from satisfied customers`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAIPopupOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content - All Testimonials */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-800/30 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex text-yellow-accent">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-accent' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{testimonial.rating}.0</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${testimonial.color} rounded-full flex items-center justify-center`}>
                          <span className="text-sm font-semibold text-white">{testimonial.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{testimonial.name}</p>
                          <p className="text-gray-400 text-xs">{language === 'id' ? 'Pelanggan' : 'Customer'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">{formatDate(testimonial.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

