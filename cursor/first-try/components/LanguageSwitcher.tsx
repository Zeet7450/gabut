'use client'

import { useLanguage } from '@/lib/language-context'
import { motion } from 'framer-motion'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    {
      code: 'id' as const,
      name: 'Indonesia',
      flag: '🇮🇩'
    },
    {
      code: 'en' as const,
      name: 'English',
      flag: '🇬🇧'
    }
  ]

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-text-primary">Language:</span>
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
              language === lang.code
                ? 'bg-green-accent text-white shadow-lg'
                : 'bg-gray-700 text-text-secondary hover:bg-gray-600 hover:text-text-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </div>
            {language === lang.code && (
              <motion.div
                className="absolute inset-0 bg-green-accent/20 rounded-lg"
                layoutId="activeLanguage"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

