'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Phone, Mail, User, MapPin, Calendar, Edit3, Save, RotateCcw, Upload, Trash2, Globe, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useLanguage } from '@/lib/language-context'
import { LanguageSwitcher } from './LanguageSwitcher'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { data: session, update } = useSession()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
    bio: '',
    profileImage: session?.user?.image || '',
    dateOfBirth: '',
    gender: '',
    occupation: ''
  })

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
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profileImage: event.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update session data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
          email: formData.email,
          image: formData.profileImage
        }
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      address: '',
      bio: '',
      profileImage: session?.user?.image || '',
      dateOfBirth: '',
      gender: '',
      occupation: ''
    })
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 min-h-screen"
          onClick={onClose}
        >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-surface border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-text-primary">{t('profile.title')}</h2>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Globe className="w-4 h-4" />
                    <LanguageSwitcher />
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-gray-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Profile Image & Basic Info */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-accent/20 bg-gray-800 flex items-center justify-center">
                          {formData.profileImage ? (
                            <img
                              src={formData.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-16 h-16 text-gray-400" />
                          )}
                        </div>
                        {isEditing && (
                          <div className="absolute -bottom-2 -right-2 flex space-x-1">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="w-8 h-8 bg-green-accent rounded-full flex items-center justify-center text-white hover:bg-green-accent/90 transition-colors"
                              title={t('profile.uploadPhoto')}
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            {formData.profileImage && (
                              <button
                                onClick={() => setFormData(prev => ({ ...prev, profileImage: '' }))}
                                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                title={t('profile.removePhoto')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-gray-600 text-center text-xl font-semibold text-text-primary focus:border-green-accent focus:outline-none w-full"
                              placeholder={t('profile.fullName')}
                            />
                          ) : (
                            formData.name || t('profile.fullName')
                          )}
                        </h3>
                        <p className="text-text-muted text-sm">
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-gray-600 text-center text-sm text-text-muted focus:border-green-accent focus:outline-none w-full"
                              placeholder={t('profile.emailAddress')}
                            />
                          ) : (
                            formData.email || t('profile.emailAddress')
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-text-primary mb-3">{t('profile.completion')}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-text-muted">{t('profile.basicInfo')}</span>
                          <span className="text-green-accent">100%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-muted">{t('profile.contactDetails')}</span>
                          <span className="text-yellow-accent">60%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-muted">{t('profile.personalInfo')}</span>
                          <span className="text-yellow-accent">40%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Form Fields */}
                  <div className="lg:col-span-2 space-y-6">

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                        <Phone className="w-5 h-5" />
                        <span>{t('profile.contactInformation')}</span>
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-text-primary font-medium">
                          <Phone className="w-4 h-4" />
                          <span>{t('profile.phoneNumber')}</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+62 812-3456-7890"
                            className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary">
                            {formData.phone || t('profile.notProvided')}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-text-primary font-medium">
                          <MapPin className="w-4 h-4" />
                          <span>{t('profile.address')}</span>
                        </label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder={t('profile.completeAddress')}
                            rows={2}
                            className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none resize-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary min-h-[60px]">
                            {formData.address || t('profile.notProvided')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>{t('profile.personalInformation')}</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-text-primary font-medium">
                            <Calendar className="w-4 h-4" />
                            <span>{t('profile.dateOfBirth')}</span>
                          </label>
                          {isEditing ? (
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary">
                              {formData.dateOfBirth || t('profile.notProvided')}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-text-primary font-medium">
                            <User className="w-4 h-4" />
                            <span>{t('profile.gender')}</span>
                          </label>
                          {isEditing ? (
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none"
                            >
                              <option value="">{t('profile.selectGender')}</option>
                              <option value="male">{t('profile.male')}</option>
                              <option value="female">{t('profile.female')}</option>
                              <option value="other">{t('profile.other')}</option>
                              <option value="prefer-not-to-say">{t('profile.preferNotToSay')}</option>
                            </select>
                          ) : (
                            <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary">
                              {formData.gender || t('profile.notProvided')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-text-primary font-medium">
                          <User className="w-4 h-4" />
                          <span>{t('profile.occupation')}</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder={t('profile.jobTitle')}
                            className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary">
                            {formData.occupation || t('profile.notProvided')}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-text-primary font-medium">
                          <User className="w-4 h-4" />
                          <span>{t('profile.bio')}</span>
                        </label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder={t('profile.tellAboutYourself')}
                            rows={4}
                            className="w-full px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary focus:border-green-accent focus:outline-none resize-none"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-bg-primary border border-gray-700 rounded-lg text-text-primary min-h-[100px]">
                            {formData.bio || t('profile.notProvided')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center p-6 border-t border-gray-800 bg-gray-800/30">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <span>{t('profile.completion')}: 75%</span>
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-green-accent to-yellow-accent rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-4 py-2 text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{t('profile.cancel')}</span>
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-6 py-2 bg-green-accent hover:bg-green-accent/90 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        <span>{isLoading ? t('profile.saving') : t('profile.save')}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-6 py-2 bg-green-accent hover:bg-green-accent/90 text-white rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{t('profile.edit')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Logout Button - Below Profile Completion */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => {
                    signOut()
                    onClose()
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-text-primary rounded-lg transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('profile.logout')}</span>
                </button>
              </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
