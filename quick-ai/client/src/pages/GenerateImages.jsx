import React, { useState } from 'react'
import { Sparkles, Image, Download } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react' 
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyle =[ 'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style' ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
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
          link.download = `generated-image-${Date.now()}.png`
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
          link.download = `generated-image-${Date.now()}.png`
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
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const {data} = await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setContent(data.content);
        // Auto-download after successful generation
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
        <div className='p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500'>
          <Image className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>AI Image Generator</h1>
          <p className='text-purple-200'>Create stunning images with AI</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Configuration Panel */}
        <div className='w-full lg:max-w-md'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20'>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-purple-200 mb-2'>
                  Describe Your Image
                </label>
                <textarea 
                  onChange={(e)=> setInput(e.target.value)} 
                  value={input} 
                  rows={4} 
                  className='w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none' 
                  placeholder='Describe what you want to see in the image...' 
                  required 
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-purple-200 mb-3'>
                  Style
                </label>
                <div className='flex flex-wrap gap-2'>
                  {imageStyle.map((item)=> (
                    <button
                      type="button"
                      onClick={()=> setSelectedStyle(item)} 
                      className={`text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedStyle === item 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                          : 'bg-purple-900/30 text-purple-300 border border-purple-500/30 hover:bg-purple-800/40'
                      }`} 
                      key={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <label className='relative cursor-pointer'>
                  <input 
                    type="checkbox" 
                    onChange={(e) => setPublish(e.target.checked)} 
                    checked={publish} 
                    className='sr-only peer'  
                  />
                  <div className='w-11 h-6 bg-purple-700 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500 transition-all duration-200'></div>
                  <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-5'></span>
                </label>
                <p className='text-sm text-purple-200'>Make this image Public</p>
              </div>
              
              <button 
                disabled={loading} 
                className='w-full btn-primary flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                ) : (
                  <Image className='w-5 h-5'/>
                )}
                Generate Image
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className='flex-1'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Image className='w-5 h-5 text-green-400'/>
                <h2 className='text-xl font-semibold text-white'>Generated Image</h2>
              </div>
              {content && (
                <button
                  onClick={handleDownload}
                  className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm font-medium'
                >
                  <Download className='w-4 h-4'/>
                  Download
                </button>
              )}
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center min-h-64'>
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center'>
                    <Image className='w-8 h-8 text-green-400'/>
                  </div>
                  <p className='text-purple-300'>Describe your image and click "Generate Image" to get started</p>
                </div>
              </div>
            ) : (
              <div className='mt-3 h-full'>
                <img 
                  src={content} 
                  alt="Generated image" 
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

export default GenerateImages
