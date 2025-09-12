'use client'

import { motion } from 'framer-motion'
import { User, Settings, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

interface ProfileDropdownProps {
  onClose: () => void
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const { t } = useLanguage()

  const menuItems = [
    {
      icon: User,
      label: t('profile.viewProfile'),
      href: '/profile',
    },
    {
      icon: ShoppingBag,
      label: t('profile.orders'),
      href: '/orders',
    },
    {
      icon: Settings,
      label: t('profile.settings'),
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
    </motion.div>
  )
}


