import React, {useState, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebar && !event.target.closest('.sidebar-container')) {
        setSidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebar, isMobile])

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen gradient-dark'>
      {/* Top Navigation */}
      <nav className='w-full px-6 sm:px-8 min-h-16 flex items-center justify-between border-b border-purple-500/20 glass backdrop-blur-xl'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl gradient-primary flex items-center justify-center'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
          <img 
            className='cursor-pointer w-32 sm:w-44 transition-transform hover:scale-105' 
            src={assets.logo} 
            alt="Logo" 
            onClick={() => navigate('/')} 
          />
        </div>
        
        <div className='flex items-center gap-4'>
          {isMobile && (
            <button
              onClick={() => setSidebar(!sidebar)}
              className='p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300 hover-lift'
            >
              {sidebar ? (
                <X className='w-6 h-6 text-purple-300' />
              ) : (
                <Menu className='w-6 h-6 text-purple-300' />
              )}
            </button>
          )}
        </div>
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)] relative'>
        {/* Mobile Overlay */}
        {isMobile && sidebar && (
          <div 
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            onClick={() => setSidebar(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`sidebar-container ${isMobile ? 'fixed z-50' : 'relative'}`}>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} isMobile={isMobile} />
        </div>
        
        {/* Main Content */}
        <div className='flex-1 gradient-dark overflow-hidden'>
          <div className='h-full overflow-y-auto'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen gradient-dark'>
      <div className='glass p-8 rounded-2xl max-w-md w-full mx-4'>
        <div className='text-center mb-6'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center'>
            <Sparkles className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-white mb-2'>Welcome to Quick AI</h1>
          <p className='text-purple-200'>Sign in to access powerful AI tools</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}

export default Layout
