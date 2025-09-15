import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart, Users, Sparkles } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {

  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth()

  const fetchCreations = async () => {
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setCreations(data.creations);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } 
    setLoading(false);
  }

  const imageLikeToggle = async (id) => {
    try {
      const {data} = await axios.post('/api/user/get-user-creations', {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        toast.success(data.message);
        await fetchCreations();
      }else{
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } 
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
    <div className='h-full overflow-y-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500'>
          <Users className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>Community Gallery</h1>
          <p className='text-purple-200'>Discover amazing AI creations from our community</p>
        </div>
      </div>

      {/* Creations Grid */}
      <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
        {creations.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {creations.map((creation, index)=> (
              <div key={index} className='relative group cursor-pointer hover-lift'>
                <div className='aspect-square rounded-xl overflow-hidden bg-purple-900/20 border border-purple-500/20'>
                  <img 
                    src={creation.content} 
                    alt={creation.prompt} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  
                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'>
                    <div className='absolute bottom-0 left-0 right-0 p-4'>
                      <p className='text-white text-sm font-medium mb-3 line-clamp-2'>
                        {creation.prompt}
                      </p>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Sparkles className='w-4 h-4 text-purple-400' />
                          <span className='text-xs text-purple-300 capitalize'>{creation.type}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className='text-white text-sm font-medium'>{creation.likes.length}</span>
                          <Heart 
                            onClick={(e) => {
                              e.stopPropagation();
                              imageLikeToggle(creation.id);
                            }} 
                            className={`w-5 h-5 hover:scale-110 cursor-pointer transition-all duration-200 ${
                              creation.likes.includes(user?.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-white hover:text-red-400'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex-1 flex justify-center items-center min-h-64'>
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center'>
                <Users className='w-8 h-8 text-purple-400'/>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>No Creations Yet</h3>
                <p className='text-purple-300'>Be the first to share your AI creations with the community!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className='h-full flex items-center justify-center'>
      <div className='text-center space-y-4'>
        <div className='w-12 h-12 mx-auto rounded-full border-4 border-purple-500 border-t-transparent animate-spin'></div>
        <p className='text-purple-300'>Loading community creations...</p>
      </div>
    </div>
  )
}

export default Community
