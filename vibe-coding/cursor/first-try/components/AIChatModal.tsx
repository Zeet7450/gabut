'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface AIChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with welcome message when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: '1',
        text: t('chat.welcome'),
        isUser: false,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, t])

  // Reset messages when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([])
      setInputText('')
      setIsLoading(false)
    }
  }, [isOpen])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Cleanup function
      return () => {
        // Restore scroll position smoothly
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        // Use requestAnimationFrame for smooth scroll restoration
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY)
        })
      }
    }
  }, [isOpen])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  useEffect(() => {
    // Add a small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const aiResponses = [
        "I understand your question. Let me help you with that.",
        "That's a great question! Based on what you've told me, I recommend...",
        "I can definitely assist you with that. Here's what I suggest:",
        "Thanks for reaching out! I'm here to help you find the best solution.",
        "I see what you're looking for. Let me provide you with some options:",
        "That's an interesting point. Let me break this down for you:",
        "I'm happy to help! Here's what I think would work best for your situation:",
        "Great question! Based on our products and services, I'd recommend:",
        "I understand your concern. Let me address that for you:",
        "Thanks for your patience! Here's my response to your inquiry:"
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 min-h-screen"
          onClick={onClose}
        >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                duration: 0.3 
              }}
              className="bg-surface border border-gray-800 rounded-2xl w-full max-w-5xl flex flex-col h-[85vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-accent to-yellow-accent rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">{t('chat.title')}</h2>
                    <p className="text-sm text-text-muted">{t('chat.online')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onClose}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-gray-800/50"
                    title={t('common.close')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser 
                          ? 'bg-green-accent' 
                          : 'bg-gradient-to-r from-green-accent to-yellow-accent'
                      }`}>
                        {message.isUser ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-green-accent text-white'
                          : 'bg-gray-800 text-text-primary'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-green-100' : 'text-text-muted'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-accent to-yellow-accent flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-800 text-text-primary px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">{t('chat.aiTyping')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t('chat.typeMessage')}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="p-3 bg-green-accent hover:bg-green-accent/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                  {t('chat.pressEnter')}
                </p>
              </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
