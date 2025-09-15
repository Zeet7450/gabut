import React from 'react'
import { PricingTable } from '@clerk/clerk-react'
import { Crown, Sparkles, Check } from 'lucide-react'

const Plan = () => {
  return (
    <div className='px-4 sm:px-20 xl:px-32 py-24 relative'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10'></div>
      
      <div className='relative z-10 max-w-4xl mx-auto'>
        <div className='text-center space-y-6 mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-200 mb-4'>
            <Crown className='w-4 h-4' />
            <span>Pricing Plans</span>
          </div>
          
          <h2 className='text-4xl sm:text-5xl font-bold text-white'>
            Choose Your <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Plan</span>
          </h2>
          <p className='text-purple-200 text-lg max-w-2xl mx-auto'>
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
          </p>
        </div>

        {/* Custom Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {/* Free Plan */}
          <div className='glass p-8 rounded-2xl border border-purple-500/20 hover-lift transition-all duration-300'>
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center'>
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-white'>Free Plan</h3>
                  <p className='text-purple-300'>Perfect for getting started</p>
                </div>
              </div>
              
              <div className='space-y-4'>
                <div className='text-4xl font-bold text-white'>$0<span className='text-lg text-purple-300'>/month</span></div>
                
                <ul className='space-y-3'>
                  {[
                    '10 AI generations per month',
                    'Article Writer access',
                    'Blog Title Generator',
                    'Basic support',
                    'Community access'
                  ].map((feature, index) => (
                    <li key={index} className='flex items-center gap-3 text-purple-200'>
                      <Check className='w-5 h-5 text-green-400' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className='glass p-8 rounded-2xl border border-purple-400/40 hover-lift transition-all duration-300 relative overflow-hidden'>
            {/* Premium Badge */}
            <div className='absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
              <Crown className='w-3 h-3' />
              Popular
            </div>
            
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl gradient-primary flex items-center justify-center'>
                  <Crown className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-white'>Premium Plan</h3>
                  <p className='text-purple-300'>For serious creators</p>
                </div>
              </div>
              
              <div className='space-y-4'>
                <div className='text-4xl font-bold text-white'>$29<span className='text-lg text-purple-300'>/month</span></div>
                
                <ul className='space-y-3'>
                  {[
                    'Unlimited AI generations',
                    'All AI tools access',
                    'Image generation',
                    'Background removal',
                    'Object removal',
                    'Resume review',
                    'Priority support',
                    'Advanced analytics'
                  ].map((feature, index) => (
                    <li key={index} className='flex items-center gap-3 text-purple-200'>
                      <Check className='w-5 h-5 text-green-400' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Clerk Pricing Table */}
        <div className='glass p-8 rounded-2xl border border-purple-500/20'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-bold text-white mb-2'>Ready to Upgrade?</h3>
            <p className='text-purple-200'>Use our secure payment system powered by Clerk</p>
          </div>
          <PricingTable />
        </div>
      </div>
    </div>
  )
}

export default Plan
