'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  id: {
    // Profile Modal
    'profile.title': 'Pengaturan Profil',
    'profile.edit': 'Edit Profil',
    'profile.save': 'Simpan Perubahan',
    'profile.cancel': 'Batal',
    'profile.completion': 'Kelengkapan Profil',
    'profile.basicInfo': 'Info Dasar',
    'profile.contactDetails': 'Detail Kontak',
    'profile.personalInfo': 'Info Pribadi',
    'profile.contactInformation': 'Informasi Kontak',
    'profile.personalInformation': 'Informasi Pribadi',
    'profile.phoneNumber': 'Nomor Telepon',
    'profile.website': 'Website',
    'profile.address': 'Alamat',
    'profile.dateOfBirth': 'Tanggal Lahir',
    'profile.gender': 'Jenis Kelamin',
    'profile.occupation': 'Pekerjaan',
    'profile.bio': 'Bio',
    'profile.notProvided': 'Belum diisi',
    'profile.selectGender': 'Pilih Jenis Kelamin',
    'profile.male': 'Laki-laki',
    'profile.female': 'Perempuan',
    'profile.other': 'Lainnya',
    'profile.preferNotToSay': 'Tidak ingin menyebutkan',
    'profile.uploadPhoto': 'Unggah Foto',
    'profile.removePhoto': 'Hapus Foto',
    'profile.fullName': 'Nama Lengkap',
    'profile.emailAddress': 'Alamat Email',
    'profile.completeAddress': 'Alamat Lengkap',
    'profile.jobTitle': 'Jabatan atau pekerjaan',
    'profile.tellAboutYourself': 'Ceritakan tentang diri Anda...',
    'profile.saving': 'Menyimpan...',
    'profile.language': 'Bahasa',
    'profile.selectLanguage': 'Pilih Bahasa',
    
    // AI Chat Modal
    'chat.title': 'Asisten AI',
    'chat.online': 'Online • Siap membantu',
    'chat.minimize': 'Minimalkan',
    'chat.maximize': 'Maksimalkan',
    'chat.typeMessage': 'Ketik pesan...',
    'chat.send': 'Kirim',
    'chat.pressEnter': 'Tekan Enter untuk mengirim, Shift+Enter untuk baris baru',
    
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.shop': 'Toko',
    'nav.contact': 'Kontak',
    
    // Footer
    'footer.aboutUs': 'Tentang Kami',
    'footer.ourTeam': 'Tim Kami',
    'footer.careers': 'Karir',
    'footer.press': 'Pers',
    'footer.helpCenter': 'Pusat Bantuan',
    'footer.contactUs': 'Hubungi Kami',
    'footer.shippingInfo': 'Info Pengiriman',
    'footer.returns': 'Pengembalian',
    'footer.privacyPolicy': 'Kebijakan Privasi',
    'footer.termsOfService': 'Syarat Layanan',
    'footer.cookiePolicy': 'Kebijakan Cookie',
    'footer.gdpr': 'GDPR',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi kesalahan',
    'common.success': 'Berhasil',
    'common.close': 'Tutup',
  },
  en: {
    // Profile Modal
    'profile.title': 'Profile Settings',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.completion': 'Profile Completion',
    'profile.basicInfo': 'Basic Info',
    'profile.contactDetails': 'Contact Details',
    'profile.personalInfo': 'Personal Info',
    'profile.contactInformation': 'Contact Information',
    'profile.personalInformation': 'Personal Information',
    'profile.phoneNumber': 'Phone Number',
    'profile.website': 'Website',
    'profile.address': 'Address',
    'profile.dateOfBirth': 'Date of Birth',
    'profile.gender': 'Gender',
    'profile.occupation': 'Occupation',
    'profile.bio': 'Bio',
    'profile.notProvided': 'Not provided',
    'profile.selectGender': 'Select Gender',
    'profile.male': 'Male',
    'profile.female': 'Female',
    'profile.other': 'Other',
    'profile.preferNotToSay': 'Prefer not to say',
    'profile.uploadPhoto': 'Upload Photo',
    'profile.removePhoto': 'Remove Photo',
    'profile.fullName': 'Full Name',
    'profile.emailAddress': 'Email Address',
    'profile.completeAddress': 'Complete Address',
    'profile.jobTitle': 'Job title or occupation',
    'profile.tellAboutYourself': 'Tell us about yourself...',
    'profile.saving': 'Saving...',
    'profile.language': 'Language',
    'profile.selectLanguage': 'Select Language',
    
    // AI Chat Modal
    'chat.title': 'AI Assistant',
    'chat.online': 'Online • Ready to help',
    'chat.minimize': 'Minimize',
    'chat.maximize': 'Maximize',
    'chat.typeMessage': 'Type a message...',
    'chat.send': 'Send',
    'chat.pressEnter': 'Press Enter to send, Shift+Enter for new line',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.shop': 'Shop',
    'nav.contact': 'Contact',
    
    // Footer
    'footer.aboutUs': 'About Us',
    'footer.ourTeam': 'Our Team',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.helpCenter': 'Help Center',
    'footer.contactUs': 'Contact Us',
    'footer.shippingInfo': 'Shipping Info',
    'footer.returns': 'Returns',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.gdpr': 'GDPR',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
