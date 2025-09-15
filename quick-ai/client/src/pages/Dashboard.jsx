import React, { use, useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles, Crown, TrendingUp, Zap } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-auto p-6 space-y-6'>
      {/* Welcome Section */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Welcome back! 👋</h1>
        <p className='text-purple-200'>Here's what's happening with your AI creations today.</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Total Creations Card */}
        <div className='group glass p-6 rounded-2xl border border-purple-500/20 hover-lift'>
          <div className='flex justify-between items-start mb-4'>
            <div className='space-y-1'>
              <p className='text-purple-300 text-sm font-medium'>Total Creations</p>
              <h2 className='text-3xl font-bold text-white'>{creations.length}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm text-purple-200'>
            <TrendingUp className='w-4 h-4' />
            <span>+{creations.length} this month</span>
          </div>
        </div>

        {/* Active Plan Card */}
        <div className='group glass p-6 rounded-2xl border border-purple-500/20 hover-lift'>
          <div className='flex justify-between items-start mb-4'>
            <div className='space-y-1'>
              <p className='text-purple-300 text-sm font-medium'>Active Plan</p>
              <h2 className='text-3xl font-bold text-white'>
                <Protect plan='Premium' fallback='Free'>Premium</Protect>
              </h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Crown className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm text-purple-200'>
            <Zap className='w-4 h-4' />
            <span>
              <Protect plan='Premium' fallback='Upgrade for unlimited access'>Unlimited access</Protect>
            </span>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className='group glass p-6 rounded-2xl border border-purple-500/20 hover-lift md:col-span-2 lg:col-span-1'>
          <div className='flex justify-between items-start mb-4'>
            <div className='space-y-1'>
              <p className='text-purple-300 text-sm font-medium'>Quick Actions</p>
              <h2 className='text-3xl font-bold text-white'>AI Tools</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <Zap className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm text-purple-200'>
            <Sparkles className='w-4 h-4' />
            <span>6 powerful AI tools available</span>
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold text-white'>Recent Creations</h3>
          <div className='flex items-center gap-2 text-sm text-purple-300'>
            <Sparkles className='w-4 h-4' />
            <span>{creations.length} total</span>
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='relative'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-purple-500/30 border-t-purple-500'></div>
              <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-purple-300 animate-pulse'></div>
            </div>
          </div>
        ) : creations.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {creations.map((item, index) => (
              <div 
                key={item.id} 
                className='card-enter'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CreationItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className='glass p-12 rounded-2xl text-center border border-purple-500/20'>
            <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center'>
              <Sparkles className='w-10 h-10 text-purple-400' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>No creations yet</h3>
            <p className='text-purple-300 mb-6'>Start creating amazing content with our AI tools!</p>
            <button className='btn-primary px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform duration-300'>
              Create Your First Content
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
