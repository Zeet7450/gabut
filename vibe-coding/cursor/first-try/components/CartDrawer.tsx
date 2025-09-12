'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard, Package } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CartItem } from '@/lib/types'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { t } = useLanguage()
  const queryClient = useQueryClient()

  const { data: cartData, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
  })

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) throw new Error('Failed to update quantity')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to remove item')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const cartItems: CartItem[] = cartData?.items || []
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantityMutation.mutate({ id, quantity: newQuantity })
  }

  const handleRemoveItem = (id: string) => {
    removeItemMutation.mutate(id)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 min-h-screen"
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-surface border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-accent to-yellow-accent rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{t('cart.title')}</h2>
                  <p className="text-sm text-text-muted">
                    {cartItems.length} {t('cart.items')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-gray-800/50"
                title={t('common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex space-x-4 p-4 bg-gray-800/50 rounded-lg animate-pulse">
                      <div className="w-20 h-20 bg-gray-700 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-700 rounded w-1/2" />
                        <div className="h-3 bg-gray-700 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-text-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {t('cart.empty')}
                  </h3>
                  <p className="text-text-muted">
                    {t('cart.emptyDesc')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="relative">
                        <Image
                          src={item.product.imageUrl || '/placeholder-product.jpg'}
                          alt={item.product.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text-primary text-lg mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-text-muted text-sm mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-green-accent font-bold text-lg">
                          Rp {item.product.price.toLocaleString()}
                        </p>
                        <p className="text-text-muted text-sm">
                          {t('cart.quantity')}: {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                          title={t('cart.remove')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-text-primary font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 text-text-muted hover:text-text-primary rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-800 p-6 bg-gray-800/30">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">{t('cart.subtotal')}</span>
                    <span className="text-text-primary font-medium">
                      Rp {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">{t('cart.shipping')}</span>
                    <span className="text-green-accent font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">{t('cart.tax')}</span>
                    <span className="text-text-primary font-medium">
                      Rp {(total * 0.1).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-text-primary">
                        {t('cart.grandTotal')}
                      </span>
                      <span className="text-2xl font-bold text-green-accent">
                        Rp {(total * 1.1).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-green-accent hover:bg-green-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200">
                  <CreditCard className="w-5 h-5" />
                  <span>{t('cart.checkout')}</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


