import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

  return (
    <div className='fixed z-50 w-full bg-transparent backdrop-blur-xl'>
      <div className='flex justify-between items-center py-4 px-4 sm:px-20 xl:px-32'>
        {/* Logo Section */}
        <div 
          className='flex items-center gap-3 cursor-pointer group' 
          onClick={() => navigate('/')}
        >
          <div className='w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg'>
            <Sparkles className='w-7 h-7 text-white' />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300'>
              Quick AI
            </h1>
            <p className='text-xs text-purple-300 -mt-1'>
              AI-Powered Content Creation
            </p>
          </div>
        </div>

        {/* Right Section - Only Profile/User Button */}
        <div className='flex items-center gap-4'>
          {user ? (
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-xl border-2 border-purple-400/30",
                  userButtonPopoverCard: "glass border border-purple-500/20 backdrop-blur-xl",
                  userButtonPopoverActionButton: "hover:bg-purple-500/20 text-white",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
          ) : (
            <button 
              onClick={openSignIn} 
              className='group btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Sparkles className='w-4 h-4' />
              Get Started
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar