import React, { useState } from 'react'
import { Sparkles, FileText } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
            
  const {getToken} = useAuth()
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
      setLoading(true)

      const formData = new FormData();
      formData.append('resume', input);

      const {data} = await axios.post('/api/ai/resume-review', formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

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
        <div className='p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500'>
          <FileText className='w-6 h-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>Resume Review</h1>
          <p className='text-purple-200'>Get AI-powered resume analysis and feedback</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Configuration Panel */}
        <div className='w-full lg:max-w-md'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20'>
            <form onSubmit={onSubmitHandler} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-purple-200 mb-2'>
                  Upload Resume
                </label>
                <div className='relative'>
                  <input 
                    onChange={(e)=> setInput(e.target.files[0])} 
                    type="file" 
                    accept='application/pdf' 
                    className='w-full p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent' 
                    required 
                  />
                </div>
                <p className='text-xs text-purple-400 mt-2'>Supports PDF resume only</p>
              </div>
              
              <button 
                disabled={loading} 
                className='w-full btn-primary flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200'
              >
                {loading ? (
                  <span className='w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
                ) : (
                  <FileText className='w-5 h-5' />
                )}
                Review Resume
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className='flex-1'>
          <div className='glass p-6 rounded-2xl border border-purple-500/20 min-h-96'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-teal-400'/>
              <h2 className='text-xl font-semibold text-white'>Analysis Results</h2>
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center min-h-64'>
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center'>
                    <FileText className='w-8 h-8 text-teal-400'/>
                  </div>
                  <p className='text-purple-300'>Upload a resume and click "Review Resume" to get started</p>
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

export default ReviewResume
