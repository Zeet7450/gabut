import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Play, Users, Zap, Star, ArrowRight } from 'lucide-react'
import userGroup from '../assets/user_group.png'

const Hero = () => {

    const navigate = useNavigate();

  return (
    <div className='relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-20 xl:px-32 overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20'></div>
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent'></div>
      
      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse'></div>
      <div className='absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000'></div>
      <div className='absolute bottom-40 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000'></div>
      
      <div className='relative z-10 text-center space-y-8 max-w-6xl mx-auto'>
        {/* Main Heading */}
        <div className='space-y-6'>
          <h1 className='text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-bold leading-tight'>
            <span className='text-white'>Create amazing content with</span>
            <br />
            <span className='bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'>
              AI tools
            </span>
          </h1>
          
          <p className='text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed'>
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow with cutting-edge technology.
          </p>
          
          {/* Badge - Moved down */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-200'>
            <Sparkles className='w-4 h-4' />
            <span>Powered by Advanced AI Technology</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <button 
            onClick={() => navigate('/ai')} 
            className='group btn-primary px-8 py-4 rounded-xl text-lg font-semibold text-white flex items-center gap-3 hover:scale-105 transition-all duration-300'
          >
            <Zap className='w-6 h-6' />
            Start Creating Now
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
          </button>
          
          <button className='group glass px-8 py-4 rounded-xl text-lg font-semibold text-white border border-purple-500/30 hover:border-purple-400/50 flex items-center gap-3 hover:scale-105 transition-all duration-300'>
            <Play className='w-6 h-6' />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-8 pt-8'>
          <div className='flex items-center gap-3 text-purple-200'>
            <img src={userGroup} alt="Users" className='h-8 w-auto' />
            <span className='text-sm font-medium'>Trusted by 10k+ users</span>
          </div>
          
          <div className='hidden sm:block w-px h-6 bg-purple-500/30'></div>
          
          <div className='flex items-center gap-2 text-purple-200'>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='w-4 h-4 text-yellow-400 fill-current' />
              ))}
            </div>
            <span className='text-sm font-medium'>4.9/5 rating</span>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Hero
