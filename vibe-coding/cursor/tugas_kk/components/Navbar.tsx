'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { ProtectedLink } from './ProtectedLink'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown, 
  MessageCircle,
  Home,
  Info,
  Store,
  Phone
} from 'lucide-react'
import { CartDrawer } from './CartDrawer'
import { ProfileDropdown } from './ProfileDropdown'
import { ChatDrawer } from './ChatDrawer'
import { UserProfileModal } from './UserProfileModal'
import { AIChatModal } from './AIChatModal'
import { useLanguage } from '@/lib/language-context'

export function Navbar() {
  const { t } = useLanguage()
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
    { name: t('nav.home'), href: '/', protected: false, icon: Home },
    { name: t('nav.about'), href: '/about', protected: false, icon: Info },
    { name: t('nav.shop'), href: '/shop', protected: true, icon: Store },
    { name: t('nav.contact'), href: '/contact', protected: true, icon: Phone },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
              aria-label={t('nav.menu')}
              title={t('nav.menu')}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Logo */}
            <Link href="/" className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-accent to-yellow-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">Sijual</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const LinkComponent = item.protected ? ProtectedLink : Link
                return (
                  <LinkComponent
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
                  </LinkComponent>
                )
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* AI Chat - Desktop only */}
              {session && (
                <button
                  onClick={() => setIsAIChatModalOpen(true)}
                  className="hidden md:block p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
                  aria-label={t('nav.aiAssistant')}
                  title={t('nav.aiAssistant')}
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              )}

              {/* Cart */}
              {session && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-text-secondary hover:text-green-accent transition-colors duration-200 relative"
                  aria-label={t('nav.cart')}
                  title={t('nav.cart')}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {/* Cart badge would go here */}
                </button>
              )}

              {/* Profile - Desktop only */}
              <div className="relative hidden md:block">
                {session ? (
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center space-x-2 p-2 text-text-secondary hover:text-green-accent transition-colors duration-200"
                    title={t('profile.viewProfile')}
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
                    <span>{t('nav.signIn')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

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
              className="fixed left-0 top-0 h-full w-80 bg-bg-secondary border-r border-gray-800 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 pb-6">
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
                
                {/* Explore Product Text - Mobile Only */}
                <div className="md:hidden text-center py-4">
                  <h3 className="text-lg font-bold text-gradient bg-gradient-to-r from-green-accent to-yellow-accent bg-clip-text text-transparent">
                    Explore Product
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    Discover amazing products
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const LinkComponent = item.protected ? ProtectedLink : Link
                    const IconComponent = item.icon
                    return (
                      <LinkComponent
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
                          isActive 
                            ? 'bg-green-accent/10 text-green-accent border-l-4 border-green-accent' 
                            : isAuthPage 
                              ? 'text-text-muted hover:text-green-accent hover:bg-gray-800/50'
                              : 'text-text-secondary hover:text-green-accent hover:bg-gray-800/50'
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </LinkComponent>
                    )
                  })}
                </div>
                
                {/* Mobile Profile Settings */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  {session ? (
                    <div className="space-y-3">
                      {/* Profile Info - Large Clickable Area */}
                      <button
                        onClick={() => {
                          setIsProfileModalOpen(true)
                          setIsSidebarOpen(false)
                        }}
                        className="w-full flex items-center space-x-4 px-4 py-5 bg-gradient-to-r from-gray-800/30 to-gray-700/30 hover:from-gray-800/50 hover:to-gray-700/50 rounded-xl transition-all duration-200 active:scale-[0.98] border border-gray-700/50"
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-accent to-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <User className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-text-primary font-bold text-lg truncate">
                            {session.user?.name || 'User'}
                          </p>
                          <p className="text-text-muted text-sm truncate">
                            {session.user?.email}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="w-2 h-2 bg-green-accent rounded-full mr-2"></div>
                            <p className="text-green-accent text-sm font-medium">
                              Tap to manage profile
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      
                      {/* Additional Quick Access */}
                      <div className="mt-4 p-3 bg-gray-800/10 rounded-lg border border-gray-700/30">
                        <p className="text-text-muted text-xs text-center">
                          💡 Tip: Tap your profile card above for full settings
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          setIsSidebarOpen(false)
                          signIn()
                        }}
                        className="w-full flex items-center justify-center space-x-3 px-6 py-5 bg-gradient-to-r from-green-accent to-green-500 hover:from-green-accent/90 hover:to-green-500/90 text-white rounded-xl transition-all duration-200 active:scale-95 font-semibold text-lg shadow-lg"
                      >
                        <User className="w-6 h-6" />
                        <span>{t('nav.signIn')}</span>
                      </button>
                      
                      <div className="text-center p-4 bg-gray-800/10 rounded-lg border border-gray-700/30">
                        <p className="text-text-muted text-sm">
                          Sign in to access your profile, settings, and personalized features
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Chat Button - Fixed bottom right (Mobile only) */}
      {session && (
        <button
          onClick={() => setIsAIChatModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-green-accent hover:bg-green-accent/90 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105 md:hidden"
          aria-label={t('nav.aiAssistant')}
          title={t('nav.aiAssistant')}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={undefined}
        productId={undefined}
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
    </>
  )
}

