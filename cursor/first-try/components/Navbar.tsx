'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  MessageCircle,
  LogOut
} from 'lucide-react'
import { SearchBar } from './SearchBar'
import { CartDrawer } from './CartDrawer'
import { ProfileDropdown } from './ProfileDropdown'
import { ChatDrawer } from './ChatDrawer'
import { UserProfileModal } from './UserProfileModal'
import { AIChatModal } from './AIChatModal'
import { useLanguage } from '@/lib/language-context'

export function Navbar() {
  const { t } = useLanguage()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAIChatModalOpen, setIsAIChatModalOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()
  
  // Check if we're on auth pages
  const isAuthPage = pathname?.startsWith('/auth/')
  
  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.shop'), href: '/shop' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-accent to-yellow-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gradient">Sijual</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive 
                      ? 'text-green-accent border-b-2 border-green-accent pb-1' 
                      : isAuthPage 
                        ? 'text-text-muted hover:text-green-accent'
                        : 'text-text-secondary hover:text-green-accent'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Customer Service Chat */}
            <button
              onClick={() => setIsAIChatModalOpen(true)}
              className="p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
              aria-label="AI Assistant"
              title="AI Assistant"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-80"
                  >
                    <SearchBar onClose={() => setIsSearchOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-text-secondary hover:text-green-accent transition-colors duration-200 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {/* Cart badge would go here */}
            </button>

            {/* Profile */}
            <div className="relative">
              {session ? (
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-2 p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-green-accent flex items-center justify-center border-2 border-green-accent/20 hover:border-green-accent/50 transition-colors">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-accent hover:bg-green-accent/90 text-white rounded-lg transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed left-0 top-0 h-full w-80 bg-bg-secondary border-r border-gray-800 z-50 md:hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(false)}>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-accent to-yellow-accent rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <span className="text-xl font-bold text-gradient">Sijual</span>
                    </Link>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
                            isActive 
                              ? 'bg-green-accent/10 text-green-accent border-l-4 border-green-accent' 
                              : isAuthPage 
                                ? 'text-text-muted hover:text-green-accent hover:bg-gray-800/50'
                                : 'text-text-secondary hover:text-green-accent hover:bg-gray-800/50'
                          }`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-800 space-y-4">
                    <button
                      onClick={() => {
                        setIsAIChatModalOpen(true)
                        setIsSidebarOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-green-accent hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>AI Assistant</span>
                    </button>
                    
                    {session ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setIsProfileModalOpen(true)
                            setIsSidebarOpen(false)
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-green-accent hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
                        >
                          <div className="w-8 h-8 rounded-full bg-green-accent flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-text-primary font-medium">{session.user?.name || 'User'}</p>
                            <p className="text-text-muted text-sm">View Profile</p>
                          </div>
                        </button>
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-text-muted hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsSidebarOpen(false)
                          signIn()
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-accent hover:bg-green-accent/90 text-white rounded-lg transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Sign In</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={null}
        productId={null}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isAIChatModalOpen}
        onClose={() => setIsAIChatModalOpen(false)}
      />
    </nav>
  )
}

