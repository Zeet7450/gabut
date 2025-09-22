'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/lib/language-context'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageCircle,
  Heart
} from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const footerLinks = {
    company: [
      { name: t('footer.aboutUs'), href: '/about' },
      { name: t('footer.ourTeam'), href: '/about#team' },
      { name: t('footer.careers'), href: '/careers' },
      { name: t('footer.press'), href: '/press' },
    ],
    support: [
      { name: t('footer.helpCenter'), href: '/help' },
      { name: t('footer.contactUs'), href: '/contact' },
      { name: t('footer.shippingInfo'), href: '/shipping' },
      { name: t('footer.returns'), href: '/returns' },
    ],
    legal: [
      { name: t('footer.privacyPolicy'), href: '/privacy' },
      { name: t('footer.termsOfService'), href: '/terms' },
      { name: t('footer.cookiePolicy'), href: '/cookies' },
      { name: t('footer.gdpr'), href: '/gdpr' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
    ],
  }

  return (
    <footer ref={ref} className="bg-surface border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-accent to-yellow-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-gradient">Sijual</span>
              </Link>
              
              <p className="text-text-secondary mb-4 md:mb-6 text-sm md:text-base max-w-md">
                {t('footer.description')}
              </p>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center space-x-3 text-text-muted text-sm md:text-base">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">support@sijual.com</span>
                </div>
                <div className="flex items-center space-x-3 text-text-muted text-sm md:text-base">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+62 (21) 1234-5678</span>
                </div>
                <div className="flex items-center space-x-3 text-text-muted text-sm md:text-base">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <div className="sm:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            >
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-6">{t('footer.company')}</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-green-accent transition-colors text-sm md:text-base block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support Links */}
          <div className="sm:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-6">{t('footer.support')}</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-green-accent transition-colors text-sm md:text-base block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Legal Links */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
              <h3 className="text-base md:text-lg font-semibold text-text-primary mb-4 md:mb-6">{t('footer.legal')}</h3>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-green-accent transition-colors text-sm md:text-base block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>


        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-text-muted text-sm md:text-base text-center sm:text-left">
              <span>© {currentYear} Sijual. {t('footer.madeWith')}</span>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>{t('footer.forCustomers')}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-muted hover:text-green-accent transition-colors p-2 rounded-lg hover:bg-gray-800/50"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Assistant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-green-accent/10 to-yellow-accent/10 border border-green-accent/20 rounded-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-accent rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base md:text-lg font-semibold text-text-primary">
                  {t('footer.needHelp')}
                </h4>
                <p className="text-text-muted text-sm md:text-base">
                  {t('footer.aiAssistantDesc')}
                </p>
              </div>
            </div>
            <button className="relative overflow-hidden border-2 border-gray-300 text-gray-200 hover:text-gray-200 hover:scale-105 hover:shadow-md hover:shadow-gray-300/25 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 transform hover:border-gray-300 hover:bg-gray-300/5 text-sm md:text-base w-full sm:w-auto">
              <span className="relative">{t('footer.startChatting')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

