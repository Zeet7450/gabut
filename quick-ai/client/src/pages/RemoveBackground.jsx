import React, { useState } from 'react'
import { Sparkles, Eraser, Download } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const handleDownload = () => {
    if (content) {
      // Convert image to blob for better download
      fetch(content)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `background-removed-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
          toast.success('Image downloaded successfully!')
        })
        .catch(() => {
          // Fallback method
          const link = document.createElement('a')
          link.href = content
          link.download = `background-removed-${Date.now()}.png`
          link.target = '_blank'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          toast.success('Image downloaded successfully!')
        })
    }
  }
      
  const {getToken} = useAuth()
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
      setLoading(true)

      const formData = new FormData();
      formData.append('image', input);

      const {data} = await axios.post('/api/ai/remove-image-background', formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setContent(data.content);
        // Auto-download after successful processing
        setTimeout(() => {
          handleDownload();
        }, 1000);
      }else{
        toast.error(data.message);
      }
    }catch (error) {
      toast.error(error.message);
    } 
    setLoading(false);
    }


  return (
    <div className='h-full overflow-y-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500'>
          <Eraser className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>Background Removal</h1>
          <p className='text-purple-200'>Remove backgrounds from images with AI</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Configuration Panel */}
        <div className='w-full lg:max-w-md'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20'>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-purple-200 mb-2'>
                  Upload Image
                </label>
                <div className='relative'>
                  <input 
                    onChange={(e)=> setInput(e.target.files[0])} 
                    type="file" 
                    accept='image/*' 
                    className='w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent' 
                    required 
                  />
                </div>
                <p className='text-xs text-purple-400 mt-2'>Supports JPG, PNG, and other image formats</p>
              </div>
              
              <button 
                disabled={loading} 
                className='w-full btn-primary flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                ) : (
                  <Eraser className='w-5 h-5'/>
                )}
                Remove Background
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className='flex-1'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Eraser className='w-5 h-5 text-red-400'/>
                <h2 className='text-xl font-semibold text-white'>Processed Image</h2>
              </div>
              {content && (
                <button
                  onClick={handleDownload}
                  className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 text-sm font-medium'
                >
                  <Download className='w-4 h-4'/>
                  Download
                </button>
              )}
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center min-h-64'>
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center'>
                    <Eraser className='w-8 h-8 text-red-400'/>
                  </div>
                  <p className='text-purple-300'>Upload an image and click "Remove Background" to get started</p>
                </div>
              </div>
            ) : (
              <div className='mt-3 h-full'>
                <img 
                  src={content} 
                  alt="Processed image" 
                  className='w-full h-full object-contain rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300' 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RemoveBackground
