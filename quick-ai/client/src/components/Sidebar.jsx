import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users, LogOut, Sparkles, Crown } from 'lucide-react'
import { NavLink } from 'react-router-dom'


const navItems = [
  {to: '/ai', label: 'Dashboard', Icon: House, color: 'from-blue-500 to-cyan-500'},
  {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, color: 'from-purple-500 to-pink-500'},
  {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, color: 'from-indigo-500 to-purple-500'},
  {to: '/ai/generate-images', label: 'Generate Image', Icon: Image, color: 'from-green-500 to-emerald-500', premium: true},
  {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, color: 'from-orange-500 to-red-500', premium: true},
  {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, color: 'from-violet-500 to-purple-500', premium: true},
  {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText, color: 'from-teal-500 to-cyan-500', premium: true},
  {to: '/ai/community', label: 'Community', Icon: Users, color: 'from-rose-500 to-pink-500'},
]


const Sidebar = ({sidebar, setSidebar, isMobile = false}) => {
  const { user } = useUser()
  const { signOut, openUserProfile} = useClerk()

  return (
    <div className={`
      w-64 bg-gradient-to-b from-purple-900/90 to-purple-800/90 backdrop-blur-xl border-r border-purple-500/20 
      flex flex-col justify-between items-center h-full
      ${isMobile ? 'fixed left-0 top-16 z-50' : 'relative'}
      ${sidebar || !isMobile ? 'translate-x-0' : '-translate-x-full'}
      transition-all duration-300 ease-in-out
      glass
    `}>
      {/* User Profile Section */}
      <div className='w-full p-6 border-b border-purple-500/20'>
        <div className='flex flex-col items-center space-y-3'>
          <div className='relative'>
            <img 
              src={user.imageUrl} 
              alt="User avatar" 
              className='w-16 h-16 rounded-full border-2 border-purple-400/50 shadow-lg hover:scale-105 transition-transform duration-300' 
            />
            <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
              <Sparkles className='w-3 h-3 text-white' />
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-white font-semibold text-lg'>{user.fullName}</h1>
            <div className='flex items-center gap-1 justify-center mt-1'>
              <Protect plan='premium' fallback={
                <span className='text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded-full'>Free</span>
              }>
                <span className='text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1'>
                  <Crown className='w-3 h-3' />
                  Premium
                </span>
              </Protect>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className='flex-1 w-full px-4 py-6 space-y-2 overflow-y-auto'>
        {navItems.map(({to, label, Icon, color, premium}) => (
          <NavLink 
            key={to} 
            to={to} 
            end={to === '/ai'} 
            onClick={() => isMobile && setSidebar(false)} 
            className={({isActive}) => `
              group relative px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-300
              ${isActive 
                ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105` 
                : 'text-purple-200 hover:text-white hover:bg-purple-700/50 hover:transform hover:scale-105'
              }
              ${premium ? 'border border-purple-400/30' : ''}
            `}
          >
            {({isActive}) => (
              <>
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-purple-600/30 group-hover:bg-white/20'} transition-colors duration-300`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-300 group-hover:text-white'} transition-colors duration-300`} />
                </div>
                <span className='font-medium'>{label}</span>
                {premium && (
                  <Crown className='w-4 h-4 text-yellow-400 ml-auto' />
                )}
                {isActive && (
                  <div className='absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse' />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* User Actions */}
      <div className='w-full p-4 border-t border-purple-500/20'>
        <div className='flex items-center justify-between'>
          <div 
            onClick={openUserProfile} 
            className='flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-purple-700/50 transition-all duration-300 hover:scale-105'
          >
            <img 
              src={user.imageUrl} 
              alt="User avatar" 
              className='w-10 h-10 rounded-full border border-purple-400/50' 
            />
            <div className='flex-1 min-w-0'>
              <h1 className='text-sm font-medium text-white truncate'>{user.fullName}</h1>
              <p className='text-xs text-purple-300 truncate'>
                <Protect plan='premium' fallback='Free Plan'>Premium Plan</Protect>
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className='p-2 rounded-lg text-purple-300 hover:text-white hover:bg-red-500/20 transition-all duration-300 hover:scale-110'
          >
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
