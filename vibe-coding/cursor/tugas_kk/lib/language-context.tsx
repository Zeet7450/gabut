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
    'profile.logout': 'Keluar',
    'profile.viewProfile': 'Lihat Profil',
    'profile.orders': 'Pesanan',
    'profile.settings': 'Pengaturan',
    
    // AI Chat Modal
    'chat.title': 'Asisten AI',
    'chat.online': 'Online • Siap membantu',
    'chat.minimize': 'Minimalkan',
    'chat.maximize': 'Maksimalkan',
    'chat.typeMessage': 'Ketik pesan...',
    'chat.send': 'Kirim',
    'chat.pressEnter': 'Tekan Enter untuk mengirim, Shift+Enter untuk baris baru',
    'chat.aiTyping': 'AI sedang mengetik...',
    'chat.welcome': 'Halo! Saya asisten AI Anda. Bagaimana saya bisa membantu Anda hari ini?',
    
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.shop': 'Toko',
    'nav.contact': 'Kontak',
    'nav.signIn': 'Masuk',
    'nav.signOut': 'Keluar',
    'nav.aiAssistant': 'Asisten AI',
    'nav.search': 'Cari',
    'nav.cart': 'Keranjang',
    'nav.menu': 'Menu',
    
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
    'footer.company': 'Perusahaan',
    'footer.support': 'Dukungan',
    'footer.legal': 'Legal',
    'footer.description': 'Platform e-commerce terpercaya Anda dengan layanan pelanggan bertenaga AI. Nikmati pengalaman berbelanja yang mulus dengan bantuan cerdas tersedia 24/7.',
    'footer.needHelp': 'Butuh Bantuan?',
    'footer.aiAssistantDesc': 'Asisten AI kami siap membantu Anda 24/7',
    'footer.startChatting': 'Mulai Chat',
    'footer.madeWith': 'Dibuat dengan',
    'footer.forCustomers': 'untuk pelanggan kami.',
    
    // Homepage
    'home.welcome': 'Selamat Datang di',
    'home.subtitle': 'Temukan makanan dan minuman menakjubkan dengan layanan pelanggan bertenaga AI. Dapatkan bantuan instan, rekomendasi personal, dan pengalaman berbelanja yang mulus.',
    'home.exploreProducts': 'Jelajahi Produk',
    'home.learnMore': 'Pelajari Lebih Lanjut',
    'home.happyCustomers': 'Pelanggan Puas',
    'home.productsSold': 'Produk Terjual',
    'home.countries': 'Negara',
    'home.yearsExperience': 'Tahun Pengalaman',
    'home.whyChooseUs': 'Mengapa Memilih Kami?',
    'home.whyChooseUsDesc': 'Kami menggabungkan teknologi canggih dengan layanan luar biasa untuk memberikan pengalaman berbelanja terbaik yang mungkin.',
    'home.aiPoweredSupport': 'Dukungan Berbasis AI',
    'home.aiPoweredSupportDesc': 'Dapatkan bantuan instan dari asisten AI kami 24/7',
    'home.securePayments': 'Pembayaran Aman',
    'home.securePaymentsDesc': 'Transaksi Anda dilindungi dengan keamanan tingkat bank',
    'home.communityDriven': 'Berbasis Komunitas',
    'home.communityDrivenDesc': 'Bergabunglah dengan ribuan pelanggan puas di seluruh dunia',
    'home.featuredProducts': 'Produk Unggulan',
    'home.featuredProductsDesc': 'Temukan produk paling populer dan bernilai tinggi kami',
    'home.viewAllProducts': 'Lihat Semua Produk',
    'home.readyToStart': 'Siap Memulai Belanja?',
    'home.readyToStartDesc': 'Bergabunglah dengan ribuan pelanggan puas dan rasakan masa depan e-commerce',
    'home.shopNow': 'Belanja Sekarang',
    'home.contactUs': 'Hubungi Kami',
    
    // About Page
    'about.title': 'Tentang',
    'about.subtitle': 'Kami merevolusi e-commerce dengan layanan pelanggan bertenaga AI, menciptakan pengalaman berbelanja yang mulus yang mengutamakan pelanggan.',
    'about.happyCustomers': 'Pelanggan Puas',
    'about.awardsWon': 'Penghargaan',
    'about.countriesServed': 'Negara Dilayani',
    'about.customerSatisfaction': 'Kepuasan Pelanggan',
    'about.ourStory': 'Cerita Kami',
    'about.ourStoryDesc1': 'Didirikan pada tahun 2023, E-Commerce CS AI lahir dari observasi sederhana: platform e-commerce tradisional sering membuat pelanggan merasa frustrasi dan tidak didukung selama perjalanan berbelanja mereka.',
    'about.ourStoryDesc2': 'Kami berusaha mengubahnya dengan mengintegrasikan teknologi AI canggih dengan desain yang berpusat pada manusia, menciptakan pengalaman berbelanja yang tidak hanya efisien, tetapi benar-benar menyenangkan.',
    'about.ourStoryDesc3': 'Hari ini, kami bangga melayani ribuan pelanggan di seluruh dunia, membantu mereka menemukan produk menakjubkan dengan dukungan asisten AI cerdas kami yang tersedia 24/7.',
    'about.ourValues': 'Nilai-Nilai Kami',
    'about.ourValuesDesc': 'Nilai-nilai inti ini memandu semua yang kami lakukan dan membentuk budaya perusahaan kami',
    'about.ourMission': 'Misi Kami',
    'about.ourMissionDesc': 'Merevolusi e-commerce dengan menggabungkan teknologi AI canggih dengan layanan pelanggan yang luar biasa, membuat belanja online lebih intuitif dan menyenangkan.',
    'about.innovation': 'Inovasi',
    'about.innovationDesc': 'Kami terus mendorong batas-batas apa yang mungkin dalam e-commerce, menggunakan AI untuk menciptakan pengalaman berbelanja yang dipersonalisasi dan mulus.',
    'about.customerFirst': 'Pelanggan Utama',
    'about.customerFirstDesc': 'Setiap keputusan yang kami buat dipandu oleh komitmen kami untuk memberikan pengalaman terbaik bagi pelanggan kami.',
    'about.meetOurTeam': 'Temui Tim Kami',
    'about.meetOurTeamDesc': 'Orang-orang yang penuh semangat di balik platform inovatif kami',
    'about.joinOurJourney': 'Bergabunglah dengan Perjalanan Kami',
    'about.joinOurJourneyDesc': 'Jadilah bagian dari masa depan e-commerce. Rasakan berbelanja seperti belum pernah sebelumnya.',
    'about.startShopping': 'Mulai Berbelanja',
    'about.getInTouch': 'Hubungi Kami',
    
    // Cart
    'cart.title': 'Keranjang Belanja',
    'cart.empty': 'Keranjang Anda kosong',
    'cart.emptyDesc': 'Tambahkan beberapa item untuk memulai',
    'cart.total': 'Total',
    'cart.checkout': 'Lanjut ke Pembayaran',
    'cart.remove': 'Hapus',
    'cart.quantity': 'Jumlah',
    'cart.items': 'item',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Ongkos Kirim',
    'cart.tax': 'Pajak',
    'cart.grandTotal': 'Total Keseluruhan',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi kesalahan',
    'common.success': 'Berhasil',
    'common.close': 'Tutup',
    'common.save': 'Simpan',
    'common.cancel': 'Batal',
    'common.edit': 'Edit',
    'common.delete': 'Hapus',
    'common.add': 'Tambah',
    'common.search': 'Cari',
    'common.filter': 'Filter',
    'common.sort': 'Urutkan',
    'common.view': 'Lihat',
    'common.back': 'Kembali',
    'common.next': 'Selanjutnya',
    'common.previous': 'Sebelumnya',
    'common.finish': 'Selesai',
    'common.continue': 'Lanjutkan',
    'common.yes': 'Ya',
    'common.no': 'Tidak',
    'common.ok': 'OK',
    'common.confirm': 'Konfirmasi',
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
    'profile.logout': 'Sign Out',
    'profile.viewProfile': 'View Profile',
    'profile.orders': 'Orders',
    'profile.settings': 'Settings',
    
    // AI Chat Modal
    'chat.title': 'AI Assistant',
    'chat.online': 'Online • Ready to help',
    'chat.minimize': 'Minimize',
    'chat.maximize': 'Maximize',
    'chat.typeMessage': 'Type a message...',
    'chat.send': 'Send',
    'chat.pressEnter': 'Press Enter to send, Shift+Enter for new line',
    'chat.aiTyping': 'AI is typing...',
    'chat.welcome': 'Hello! I\'m your AI assistant. How can I help you today?',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.shop': 'Shop',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.aiAssistant': 'AI Assistant',
    'nav.search': 'Search',
    'nav.cart': 'Cart',
    'nav.menu': 'Menu',
    
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
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.description': 'Your trusted e-commerce platform with AI-powered customer service. Experience seamless shopping with intelligent assistance available 24/7.',
    'footer.needHelp': 'Need Help?',
    'footer.aiAssistantDesc': 'Our AI assistant is here to help you 24/7',
    'footer.startChatting': 'Start Chatting',
    'footer.madeWith': 'Made with',
    'footer.forCustomers': 'for our customers.',
    
    // Homepage
    'home.welcome': 'Welcome to',
    'home.subtitle': 'Discover amazing food and beverages with AI-powered customer service. Get instant help, personalized recommendations, and seamless shopping experience.',
    'home.exploreProducts': 'Explore Products',
    'home.learnMore': 'Learn More',
    'home.happyCustomers': 'Happy Customers',
    'home.productsSold': 'Products Sold',
    'home.countries': 'Countries',
    'home.yearsExperience': 'Years Experience',
    'home.whyChooseUs': 'Why Choose Us?',
    'home.whyChooseUsDesc': 'We combine cutting-edge technology with exceptional service to deliver the best shopping experience possible.',
    'home.aiPoweredSupport': 'AI-Powered Support',
    'home.aiPoweredSupportDesc': 'Get instant help from our AI assistant 24/7',
    'home.securePayments': 'Secure Payments',
    'home.securePaymentsDesc': 'Your transactions are protected with bank-level security',
    'home.communityDriven': 'Community Driven',
    'home.communityDrivenDesc': 'Join thousands of satisfied customers worldwide',
    'home.featuredProducts': 'Featured Products',
    'home.featuredProductsDesc': 'Discover our most popular and highly-rated products',
    'home.viewAllProducts': 'View All Products',
    'home.readyToStart': 'Ready to Start Shopping?',
    'home.readyToStartDesc': 'Join thousands of satisfied customers and experience the future of e-commerce',
    'home.shopNow': 'Shop Now',
    'home.contactUs': 'Contact Us',
    
    // About Page
    'about.title': 'About',
    'about.subtitle': 'We\'re revolutionizing e-commerce with AI-powered customer service, creating seamless shopping experiences that put customers first.',
    'about.happyCustomers': 'Happy Customers',
    'about.awardsWon': 'Awards Won',
    'about.countriesServed': 'Countries Served',
    'about.customerSatisfaction': 'Customer Satisfaction',
    'about.ourStory': 'Our Story',
    'about.ourStoryDesc1': 'Founded in 2023, E-Commerce CS AI was born from a simple observation: traditional e-commerce platforms often leave customers feeling frustrated and unsupported during their shopping journey.',
    'about.ourStoryDesc2': 'We set out to change that by integrating cutting-edge AI technology with human-centered design, creating a shopping experience that\'s not just efficient, but truly delightful.',
    'about.ourStoryDesc3': 'Today, we\'re proud to serve thousands of customers worldwide, helping them discover amazing products with the support of our intelligent AI assistant that\'s available 24/7.',
    'about.ourValues': 'Our Values',
    'about.ourValuesDesc': 'These core values guide everything we do and shape our company culture',
    'about.ourMission': 'Our Mission',
    'about.ourMissionDesc': 'To revolutionize e-commerce by combining cutting-edge AI technology with exceptional customer service, making online shopping more intuitive and enjoyable.',
    'about.innovation': 'Innovation',
    'about.innovationDesc': 'We continuously push the boundaries of what\'s possible in e-commerce, using AI to create personalized and seamless shopping experiences.',
    'about.customerFirst': 'Customer First',
    'about.customerFirstDesc': 'Every decision we make is guided by our commitment to providing the best possible experience for our customers.',
    'about.meetOurTeam': 'Meet Our Team',
    'about.meetOurTeamDesc': 'The passionate people behind our innovative platform',
    'about.joinOurJourney': 'Join Our Journey',
    'about.joinOurJourneyDesc': 'Be part of the future of e-commerce. Experience shopping like never before.',
    'about.startShopping': 'Start Shopping',
    'about.getInTouch': 'Get in Touch',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Add some items to get started',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    'cart.items': 'items',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.grandTotal': 'Grand Total',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.continue': 'Continue',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.confirm': 'Confirm',
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
