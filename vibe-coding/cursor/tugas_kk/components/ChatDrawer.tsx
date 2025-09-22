'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, MessageCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Message, Product } from '@/lib/types'

interface ChatDrawerProps {
  isOpen: boolean
  onClose: () => void
  productId?: string
  product?: Product
}

export function ChatDrawer({ isOpen, onClose, productId, product }: ChatDrawerProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data: messagesData, isLoading } = useQuery({
    queryKey: ['chat-history', productId],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (productId) params.append('productId', productId)
      
      const response = await fetch(`/api/chat/history?${params}`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      return response.json()
    },
    enabled: isOpen && !!session,
  })

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          productId: productId || null,
          context: {
            product: product ? {
              id: product.id,
              title: product.title,
              category: product.category,
              price: product.price,
            } : null,
          },
        }),
      })
      if (!response.ok) throw new Error('Failed to send message')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-history'] })
      setMessage('')
      setIsTyping(false)
    },
    onError: () => {
      setIsTyping(false)
    },
  })

  const messages: Message[] = messagesData?.messages || []

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen, messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !session) return

    setIsTyping(true)
    sendMessageMutation.mutate(message)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const suggestedQuestions = [
    'Bagaimana cara memesan?',
    'Apa saja menu yang tersedia?',
    'Bagaimana cara pembayaran?',
    'Berapa lama waktu pengiriman?',
  ]

  if (!session) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-gray-800 z-50 flex flex-col"
            >
              <div className="p-6 text-center">
                <MessageCircle className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Sign in to chat
                </h3>
                <p className="text-text-muted mb-4">
                  Please sign in to start chatting with our AI assistant
                </p>
                <button
                  onClick={onClose}
                  className="bg-green-accent hover:bg-green-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-gray-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-accent rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    AI Assistant
                  </h2>
                  {product && (
                    <p className="text-sm text-text-muted">
                      About: {product.title}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex space-x-3 animate-pulse">
                      <div className="w-8 h-8 bg-gray-700 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Hi! I'm your AI assistant
                  </h3>
                  <p className="text-text-muted mb-4">
                    How can I help you today?
                  </p>
                  {product && (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-text-muted mb-2">
                        You're asking about:
                      </p>
                      <p className="font-medium text-text-primary">
                        {product.title}
                      </p>
                      <p className="text-sm text-green-accent">
                        Rp {product.price.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(question)}
                        className="block w-full text-left p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex space-x-3 ${
                      msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user' 
                        ? 'bg-green-accent' 
                        : 'bg-yellow-accent'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${
                      msg.role === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-green-accent text-white'
                          : 'bg-gray-800 text-text-primary'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-3"
                >
                  <div className="w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-800 p-6">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 input"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isTyping}
                  className="bg-green-accent hover:bg-green-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


