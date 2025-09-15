import React, { useState } from 'react'
import { Sparkles, Edit, FileText, Zap, Clock, Target } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength =[ 
    {length: 800, text: 'Short (500-800 words)', icon: '📝', description: 'Quick reads'},
    {length: 1200, text: 'Medium (800-1200 words)', icon: '📄', description: 'Standard articles'},
    {length: 1600, text: 'Long (1200+ words)', icon: '📚', description: 'In-depth content'}
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const {data} = await axios.post('/api/ai/generate-article', {prompt,length:selectedLength.length}, {headers: {Authorization: `Bearer ${await getToken()}`}})

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
          <Edit className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>AI Article Writer</h1>
          <p className='text-purple-200'>Create compelling articles with AI assistance</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Configuration Panel */}
        <div className='w-full lg:max-w-md'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20'>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-purple-200 mb-2'>
                  Article Topic
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
                  Article Length
                </label>
                <div className='grid grid-cols-1 gap-3'>
                  {articleLength.map((item, index)=> (
                    <button
                      type="button"
                      onClick={()=> setSelectedLength(item)} 
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedLength.text === item.text 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-purple-400' 
                          : 'bg-purple-900/30 text-purple-300 border-purple-500/30 hover:bg-purple-800/40 hover:border-purple-400/50'
                      }`} 
                      key={index}
                    >
                      <div className='flex items-center gap-3'>
                        <span className='text-2xl'>{item.icon}</span>
                        <div>
                          <p className='font-medium text-sm'>{item.text}</p>
                          <p className='text-xs opacity-75'>{item.description}</p>
                        </div>
                      </div>
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
                  <Edit className='w-5 h-5'/>
                )}
                Generate Article
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className='flex-1'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-400'/>
              <h2 className='text-xl font-semibold text-white'>Generated Article</h2>
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center min-h-64'>
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center'>
                    <Edit className='w-8 h-8 text-purple-400'/>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-2'>Ready to Write?</h3>
                    <p className='text-purple-300'>Enter a topic and click "Generate Article" to get started</p>
                  </div>
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

export default WriteArticle
