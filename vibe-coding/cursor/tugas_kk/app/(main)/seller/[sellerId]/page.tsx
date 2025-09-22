'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Search, Filter } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

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

          {/* Seller Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white text-3xl font-bold">{sellerData.avatar}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-accent rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Seller Name & Badge */}
              <h1 className="text-4xl font-bold text-white mb-2">{sellerData.name}</h1>
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-semibold">{language === 'id' ? 'Penjual Terpercaya' : 'Trusted Seller'}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="flex text-yellow-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(sellerData.rating) ? 'fill-current' : 'text-gray-400'}`} />
                  ))}
                </div>
                <span className="text-white font-bold text-xl">{sellerData.rating}</span>
                <span className="text-green-100 text-lg">({sellerData.reviewCount} {language === 'id' ? 'ulasan' : 'reviews'})</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">{sellerData.productsSold.toLocaleString()}+</div>
                  <div className="text-green-100 text-sm font-medium">{language === 'id' ? 'Produk Terjual' : 'Products Sold'}</div>
                </div>
                <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">{sellerData.experience}+</div>
                  <div className="text-green-100 text-sm font-medium">{language === 'id' ? 'Tahun Berpengalaman' : 'Years Experience'}</div>
                </div>
                <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">{filteredProducts.length}</div>
                  <div className="text-green-100 text-sm font-medium">{language === 'id' ? 'Produk Aktif' : 'Active Products'}</div>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-3xl mx-auto">
                <p className="text-green-100 text-lg leading-relaxed">
                  {sellerData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {language === 'id' ? 'Produk dari Penjual Ini' : 'Products from This Seller'}
          </h2>
          <p className="text-gray-400 text-lg">
            {language === 'id' 
              ? `Temukan ${filteredProducts.length} produk berkualitas dari ${sellerData.name}`
              : `Discover ${filteredProducts.length} quality products from ${sellerData.name}`
            }
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800/40 rounded-3xl p-6 mb-8 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'id' ? 'Cari produk...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700/60 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-accent/50 focus:border-green-accent transition-all duration-200 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-12 pr-8 py-4 bg-gray-700/60 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-accent/50 focus:border-green-accent transition-all duration-200 appearance-none text-lg min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value} className="bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-12 pr-8 py-4 bg-gray-700/60 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-accent/50 focus:border-green-accent transition-all duration-200 appearance-none text-lg min-w-[200px]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-800/40 rounded-3xl overflow-hidden border border-gray-700/50 hover:border-green-accent/60 transition-all duration-300 hover:shadow-2xl hover:shadow-green-accent/20 hover:-translate-y-2 backdrop-blur-sm">
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={240}
                      className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-green-accent to-yellow-accent text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        {language === 'id' ? 'Baru' : 'New'}
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 bg-gray-900/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-3 line-clamp-2 group-hover:text-green-accent transition-colors duration-200">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex text-yellow-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <span className="text-gray-300 font-medium">{product.rating}</span>
                      <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-accent font-bold text-2xl">
                          {language === 'id' ? 'Rp' : '$'}{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-400 line-through text-lg">
                            {language === 'id' ? 'Rp' : '$'}{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <span className="bg-gray-700/50 px-3 py-1.5 rounded-full">
                        {language === 'id' ? 'Stok' : 'Stock'}: {product.stock}
                      </span>
                      <span className="bg-gray-700/50 px-3 py-1.5 rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-accent to-yellow-accent text-white py-3 px-4 rounded-2xl font-bold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                      <ShoppingCart className="w-5 h-5" />
                      <span>{language === 'id' ? 'Tambah ke Keranjang' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="bg-gray-800/40 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-sm max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {language === 'id' ? 'Tidak ada produk ditemukan' : 'No products found'}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {language === 'id' 
                  ? 'Coba ubah kata kunci pencarian atau filter kategori untuk menemukan produk yang Anda cari'
                  : 'Try changing your search keywords or category filter to find the products you\'re looking for'
                }
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setFilterCategory('all')
                  setSortBy('newest')
                }}
                className="bg-gradient-to-r from-green-accent to-yellow-accent text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-accent/90 hover:to-yellow-accent/90 transition-all duration-200 hover:scale-105"
              >
                {language === 'id' ? 'Reset Filter' : 'Reset Filters'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

