'use client'

import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { User, Settings, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface ProfileDropdownProps {
  onClose: () => void
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const handleSignOut = () => {
    signOut()
    onClose()
  }

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
    },
    {
      icon: ShoppingBag,
      label: 'Orders',
      href: '/orders',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-surface border border-gray-700 rounded-lg shadow-xl py-2"
    >
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-green-accent hover:bg-gray-800 transition-colors duration-200"
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </Link>
      ))}
      
      <div className="border-t border-gray-700 my-2" />
      
      <button
        onClick={handleSignOut}
        className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors duration-200 w-full text-left"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </motion.div>
  )
}


