'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Mail as MailIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function ContactPage() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@ecommerce-cs-ai.com', 'info@ecommerce-cs-ai.com'],
      description: 'Send us an email and we\'ll respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri from 8am to 6pm PST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Tech Street', 'San Francisco, CA 94105'],
      description: 'Come say hello at our office',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      description: 'We\'re here to help during these hours',
    },
  ]

  const faqs = [
    {
      question: 'How does the AI customer service work?',
      answer: 'Our AI assistant uses advanced natural language processing to understand your questions and provide helpful responses. It can help with product recommendations, order tracking, and general inquiries 24/7.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use bank-level encryption and follow strict data protection protocols. Your personal information is never shared with third parties without your consent.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination.',
    },
    {
      question: 'Can I return or exchange products?',
      answer: 'Yes, we offer a 30-day return policy for most items. Products must be in original condition with tags attached. Contact our support team to initiate a return.',
    },
    {
      question: 'Do you offer customer support in other languages?',
      answer: 'Currently, our AI assistant supports English, Spanish, and French. We\'re working on adding more languages based on customer demand.',
    },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              Contact{' '}
              <span className="text-gradient">Us</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            >
              Have questions? We're here to help! Reach out to us through any of the channels below, 
              or chat with our AI assistant for instant support.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center group hover:border-green-accent/50 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="w-16 h-16 bg-green-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-accent/20 transition-colors">
                  <info.icon className="w-8 h-8 text-green-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-text-secondary font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-text-muted text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary"
            >
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 -mt-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full lg:col-span-2"
            >
              {isSubmitted ? (
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MailIcon className="w-8 h-8 text-green-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Thank you for your message. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6 bg-surface rounded-xl border border-gray-700/50 h-full flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full input py-3 px-4 text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full input py-3 px-4 text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full input py-3 px-4 text-base md:text-lg"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full input resize-none py-3 px-4 text-base"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-2 border-white text-white transition-all duration-200 hover:scale-[1.01] flex items-center justify-center space-x-2 py-3 md:py-4 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold"
                  >
                    <Send className="w-5 h-5" />
                    <span>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Professional Contact Info & Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full flex flex-col gap-6"
            >
              {/* AI Assistant Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-accent/5 via-green-accent/10 to-yellow-accent/5 border border-green-accent/20 p-8 flex-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-accent/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-accent to-green-accent/80 rounded-xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-1">
                        AI Assistant
                      </h3>
                      <p className="text-green-accent text-sm font-medium">
                        24/7 • Instant Response
                      </p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                    Get instant help with product questions, order tracking, 
                    and general inquiries.
                  </p>
                  {session ? (
                    <button className="w-full bg-green-accent hover:bg-green-accent/90 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                      Start Chatting Now
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-yellow-accent/10 border border-yellow-accent/30 rounded-lg p-3">
                        <p className="text-yellow-accent font-medium text-center text-sm">
                          Sign in to access our AI assistant
                        </p>
                      </div>
                      <button className="w-full bg-green-accent hover:bg-green-accent/90 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                        Sign In to Chat
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Contact Methods Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-surface to-surface/50 border border-gray-700/50 rounded-xl p-8 flex-1"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      Direct Contact
                    </h3>
                    <p className="text-text-muted text-sm">
                      Multiple ways to reach us
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200 hover:scale-[1.01]">
                    <Mail className="w-4 h-4 text-green-accent" />
                    <div>
                      <p className="font-medium text-text-primary text-sm">Email Support</p>
                      <p className="text-xs text-text-secondary">support@company.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200 hover:scale-[1.01]">
                    <Phone className="w-4 h-4 text-green-accent" />
                    <div>
                      <p className="font-medium text-text-primary text-sm">Phone Support</p>
                      <p className="text-xs text-text-secondary">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200 hover:scale-[1.01]">
                    <Clock className="w-4 h-4 text-green-accent" />
                    <div>
                      <p className="font-medium text-text-primary text-sm">Business Hours</p>
                      <p className="text-xs text-text-secondary">Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary"
            >
              Find answers to common questions about our platform
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-surface border border-gray-700/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-all duration-200 hover:scale-[1.01]"
                >
                  <h3 className="text-lg font-semibold text-text-primary pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    className="flex-shrink-0"
                  >
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

