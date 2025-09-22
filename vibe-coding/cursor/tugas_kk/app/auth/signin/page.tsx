'use client'

import { useState } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Mail, Github, Eye, EyeOff, Lock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const result = await signIn('credentials', { 
        email, 
        password, 
        name: isSignUp ? name : undefined,
        callbackUrl: '/',
        redirect: false 
      })
      
      if (result?.error) {
        console.error('Authentication error:', result.error)
        // You can add toast notification here
      } else if (result?.ok) {
        // Success - redirect will happen automatically
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
    
    setIsLoading(false)
  }

  const handleProviderSignIn = async (provider: string) => {
    setIsLoading(true)
    await signIn(provider, { callbackUrl: '/' })
    setIsLoading(false)
  }

  return (
    <div className="bg-bg-primary flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-md w-full space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <h2 className="text-3xl font-bold text-text-primary mb-2">
            {isSignUp ? 'Create Account' : 'Welcome back'}
          </h2>
          <p className="text-text-secondary mb-8">
            {isSignUp ? 'Sign up to start shopping with us' : 'Sign in to your account to continue shopping'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          {/* OAuth Providers */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleProviderSignIn('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border-2 border-gray-300 hover:border-green-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/google-logo.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleProviderSignIn('github')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg border-2 border-gray-700 hover:border-green-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-muted">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-text-muted" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required={isSignUp}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-text-muted" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-text-muted" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-bg-secondary border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-green-accent hover:border-green-accent/80"
            >
              {isLoading 
                ? (isSignUp ? 'Creating Account...' : 'Signing in...') 
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </button>
          </form>

          {/* Toggle Sign In/Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-green-accent hover:text-green-accent/80 cursor-pointer font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up for free'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="grid grid-cols-3 gap-4 text-sm text-text-muted">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-green-accent/10 rounded-full flex items-center justify-center">
                <span className="text-green-accent text-xs font-bold">AI</span>
              </div>
              <span>AI Support</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-yellow-accent/10 rounded-full flex items-center justify-center">
                <span className="text-yellow-accent text-xs font-bold">24/7</span>
              </div>
              <span>24/7 Help</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-green-accent/10 rounded-full flex items-center justify-center">
                <span className="text-green-accent text-xs font-bold">✓</span>
              </div>
              <span>Secure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

