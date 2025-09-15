import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Crown, Sparkles, ArrowRight } from 'lucide-react'

const AiTools = () => {

    const navigate = useNavigate()
    const { user } = useUser()

  return (
    <div className='px-4 sm:px-20 xl:px-32 py-24 relative'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10'></div>
      
      <div className='relative z-10'>
        <div className='text-center space-y-6 mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-200 mb-4'>
            <Sparkles className='w-4 h-4' />
            <span>AI-Powered Solutions</span>
          </div>
          
          <h2 className='text-4xl sm:text-5xl font-bold text-white'>
            Powerful <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>AI Tools</span>
          </h2>
          <p className='text-purple-200 text-lg max-w-3xl mx-auto leading-relaxed'>
            Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {AiToolsData.map((tool, index) => (
            <div 
              key={index} 
              className='group glass p-8 rounded-2xl border border-purple-500/20 hover-lift cursor-pointer transition-all duration-300 hover:border-purple-400/40 card-stagger'
              onClick={() => user && navigate(tool.path)}
            >
              <div className='space-y-6'>
                {/* Icon */}
                <div className='relative'>
                  <div 
                    className='w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                    style={{background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`}}
                  >
                    <tool.Icon className='w-8 h-8 text-white' />
                  </div>
                  
                  {/* Premium Badge */}
                  {tool.premium && (
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center'>
                      <Crown className='w-3 h-3 text-white' />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className='space-y-3'>
                  <h3 className='text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300'>
                    {tool.title}
                  </h3>
                  <p className='text-purple-200 text-sm leading-relaxed'>
                    {tool.description}
                  </p>
                </div>

                {/* Action */}
                <div className='flex items-center justify-between pt-4'>
                  <div className='flex items-center gap-2 text-sm text-purple-300'>
                    <span>Try it now</span>
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
                  </div>
                  
                  {tool.premium && (
                    <div className='flex items-center gap-1 text-xs text-yellow-400'>
                      <Crown className='w-3 h-3' />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <div className='glass p-8 rounded-2xl border border-purple-500/20 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-white mb-4'>Ready to Get Started?</h3>
            <p className='text-purple-200 mb-6'>
              Join thousands of creators who are already using our AI tools to enhance their content.
            </p>
            <button 
              onClick={() => user ? navigate('/ai') : navigate('/sign-in')}
              className='btn-primary px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-3 mx-auto hover:scale-105 transition-transform duration-300'
            >
              <Sparkles className='w-5 h-5' />
              Start Creating Now
              <ArrowRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiTools
