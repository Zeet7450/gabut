import React, { useState } from 'react'
import { Sparkles, Hash } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const blogCategories =[ 'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Travel', 'Education', 'Food' ]

    const [selectedCategory, setSelectedCategory] = useState('General')
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    
    const {getToken} = useAuth()
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`

      const {data} = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setContent(data.content);
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
        <div className='p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500'>
          <Hash className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>AI Title Generator</h1>
          <p className='text-purple-200'>Generate compelling blog titles with AI</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Configuration Panel */}
        <div className='w-full lg:max-w-md'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20'>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-purple-200 mb-2'>
                  Keyword
                </label>
                <input 
                  onChange={(e)=> setInput(e.target.value)} 
                  value={input} 
                  type="text" 
                  className='w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent' 
                  placeholder='The future of artificial intelligence is...' 
                  required 
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-purple-200 mb-3'>
                  Category
                </label>
                <div className='flex flex-wrap gap-2'>
                  {blogCategories.map((item)=> (
                    <button
                      type="button"
                      onClick={()=> setSelectedCategory(item)} 
                      className={`text-xs px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedCategory === item 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                          : 'bg-purple-900/30 text-purple-300 border border-purple-500/30 hover:bg-purple-800/40'
                      }`} 
                      key={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                disabled={loading} 
                className='w-full btn-primary flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                ) : (
                  <Hash className='w-5 h-5'/>
                )}
                Generate Title
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className='flex-1'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
            <div className='flex items-center gap-3 mb-4'>
              <Hash className='w-5 h-5 text-purple-400'/>
              <h2 className='text-xl font-semibold text-white'>Generated Titles</h2>
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center min-h-64'>
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center'>
                    <Hash className='w-8 h-8 text-purple-400'/>
                  </div>
                  <p className='text-purple-300'>Enter a keyword and click "Generate Title" to get started</p>
                </div>
              </div>
            ) : (
              <div className='prose prose-invert max-w-none text-purple-100'>
                <Markdown>{content}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles
