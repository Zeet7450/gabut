'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, ShoppingCart, Heart, Search, Filter } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useLanguage } from '@/lib/language-context'
import { Product } from '@/lib/types'

export default function SellerStorePage() {
  const params = useParams()
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock data untuk penjual
  const sellerData = {
    id: 'john-smith',
    name: 'John Smith',
    avatar: 'JS',
    rating: 4.9,
    reviewCount: 127,
    productsSold: 2500,
    experience: 3,
    description: language === 'id' 
      ? 'Penjual berpengalaman dengan fokus pada kualitas produk terbaik. Setiap produk telah melalui seleksi ketat untuk memastikan kepuasan pelanggan.'
      : 'Experienced seller focused on the best quality products. Every product has gone through strict selection to ensure customer satisfaction.',
    joinDate: '2021-01-15'
  }

  // Mock data untuk produk penjual
  const sellerProducts = [
    {
      id: '1',
      name: language === 'id' ? 'Es Teh Manis Segar' : 'Fresh Sweet Iced Tea',
      price: 15000,
      originalPrice: 20000,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 45,
      category: 'beverages',
      stock: 50,
      isNew: true
    },
    {
      id: '2',
      name: language === 'id' ? 'Kopi Hitam Premium' : 'Premium Black Coffee',
      price: 25000,
      originalPrice: 30000,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 32,
      category: 'beverages',
      stock: 30,
      isNew: false
    },
    {
      id: '3',
      name: language === 'id' ? 'Jus Jeruk Segar' : 'Fresh Orange Juice',
      price: 18000,
      originalPrice: 22000,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 28,
      category: 'beverages',
      stock: 25,
      isNew: true
    },
    {
      id: '4',
      name: language === 'id' ? 'Smoothie Berry' : 'Berry Smoothie',
      price: 22000,
      originalPrice: 28000,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviewCount: 19,
      category: 'beverages',
      stock: 15,
      isNew: false
    },
    {
      id: '5',
      name: language === 'id' ? 'Teh Hijau Organik' : 'Organic Green Tea',
      price: 20000,
      originalPrice: 25000,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 41,
      category: 'beverages',
      stock: 35,
      isNew: true
    },
    {
      id: '6',
      name: language === 'id' ? 'Cappuccino Klasik' : 'Classic Cappuccino',
      price: 28000,
      originalPrice: 35000,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 37,
      category: 'beverages',
      stock: 20,
      isNew: false
    }
  ]

  // Filter dan sort produk
  const filteredProducts = sellerProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.isNew ? 1 : -1
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const categories = [
    { value: 'all', label: language === 'id' ? 'Semua Kategori' : 'All Categories' },
    { value: 'beverages', label: language === 'id' ? 'Minuman' : 'Beverages' },
    { value: 'food', label: language === 'id' ? 'Makanan' : 'Food' },
    { value: 'snacks', label: language === 'id' ? 'Camilan' : 'Snacks' }
  ]

  const sortOptions = [
    { value: 'newest', label: language === 'id' ? 'Terbaru' : 'Newest' },
    { value: 'price-low', label: language === 'id' ? 'Harga Terendah' : 'Price Low to High' },
    { value: 'price-high', label: language === 'id' ? 'Harga Tertinggi' : 'Price High to Low' },
    { value: 'rating', label: language === 'id' ? 'Rating Tertinggi' : 'Highest Rating' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-accent to-yellow-accent py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/products/cmfazm63o0005r57zxk6e551f"
              className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{language === 'id' ? 'Kembali ke Produk' : 'Back to Product'}</span>
            </Link>
          </div>

          {/* Seller Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">{sellerData.avatar}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Seller Details */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{sellerData.name}</h1>
                <p className="text-green-100 text-lg mb-4">{language === 'id' ? 'Penjual Terpercaya' : 'Trusted Seller'}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(sellerData.rating) ? 'fill-current' : 'text-gray-400'}`} />
                      ))}
                    </div>
                    <span className="text-white font-medium">{sellerData.rating}</span>
                    <span className="text-green-100 text-sm">({sellerData.reviewCount} {language === 'id' ? 'ulasan' : 'reviews'})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{sellerData.productsSold.toLocaleString()}+</div>
                    <div className="text-green-100 text-sm">{language === 'id' ? 'Produk Terjual' : 'Products Sold'}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{sellerData.experience}+</div>
                    <div className="text-green-100 text-sm">{language === 'id' ? 'Tahun Berpengalaman' : 'Years Experience'}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center md:col-span-1 col-span-2">
                    <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
                    <div className="text-green-100 text-sm">{language === 'id' ? 'Produk Aktif' : 'Active Products'}</div>
                  </div>
                </div>

                <p className="text-green-100 text-sm leading-relaxed max-w-2xl">
                  {sellerData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-8 border border-gray-700/30">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'id' ? 'Cari produk...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value} className="bg-gray-800">
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-gray-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/30 hover:border-green-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-accent/10"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {language === 'id' ? 'Baru' : 'New'}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-gray-800/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex text-yellow-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{product.rating} ({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-accent font-bold text-xl">
                        {language === 'id' ? 'Rp' : '$'}{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-400 line-through text-sm">
                          {language === 'id' ? 'Rp' : '$'}{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{language === 'id' ? 'Stok' : 'Stock'}: {product.stock}</span>
                    <span className="capitalize">{product.category}</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-accent to-yellow-accent text-white py-2 px-4 rounded-lg font-semibold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{language === 'id' ? 'Tambah ke Keranjang' : 'Add to Cart'}</span>
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {language === 'id' ? 'Tidak ada produk ditemukan' : 'No products found'}
            </h3>
            <p className="text-gray-400">
              {language === 'id' 
                ? 'Coba ubah kata kunci pencarian atau filter kategori'
                : 'Try changing your search keywords or category filter'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
