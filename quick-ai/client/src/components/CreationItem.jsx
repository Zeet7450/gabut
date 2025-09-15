import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Calendar, Tag, Eye, EyeOff } from 'lucide-react'

const CreationItem = ({item}) => {

  const [expanded, setExpanded] = useState(false)

  const getTypeColor = (type) => {
    const colors = {
      'article': 'from-blue-500 to-cyan-500',
      'blog-title': 'from-purple-500 to-pink-500',
      'image': 'from-green-500 to-emerald-500',
      'resume-review': 'from-orange-500 to-red-500'
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  const getTypeIcon = (type) => {
    const icons = {
      'article': '📝',
      'blog-title': '🏷️',
      'image': '🖼️',
      'resume-review': '📄'
    }
    return icons[type] || '📄'
  }

  return (
    <div 
      onClick={() => setExpanded(!expanded)} 
      className='group glass p-6 rounded-2xl border border-purple-500/20 cursor-pointer hover-lift transition-all duration-300 hover:border-purple-400/40'
    >
      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-lg'>{getTypeIcon(item.type)}</span>
            <h2 className='text-white font-semibold text-lg truncate'>{item.prompt}</h2>
          </div>
          <div className='flex items-center gap-4 text-sm text-purple-300'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Tag className='w-4 h-4' />
              <span className='capitalize'>{item.type.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
        
        <div className='flex items-center gap-2'>
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
            {item.type.replace('-', ' ')}
          </span>
          <div className='p-2 rounded-lg bg-purple-600/30 group-hover:bg-purple-500/50 transition-colors duration-300'>
            {expanded ? (
              <ChevronUp className='w-4 h-4 text-purple-300' />
            ) : (
              <ChevronDown className='w-4 h-4 text-purple-300' />
            )}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className='mt-6 pt-6 border-t border-purple-500/20 animate-fadeIn'>
          {item.type === 'image' ? (
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-sm text-purple-300'>
                <Eye className='w-4 h-4' />
                <span>Click to view full size</span>
              </div>
              <div className='relative group/image'>
                <img 
                  src={item.content} 
                  alt="Generated content" 
                  className='w-full max-w-md mx-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300' 
                />
                <div className='absolute inset-0 bg-black/0 group-hover/image:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover/image:opacity-100 transition-opacity duration-300'>
                    <Eye className='w-8 h-8 text-white' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-sm text-purple-300'>
                <EyeOff className='w-4 h-4' />
                <span>Content preview</span>
              </div>
              <div className='max-h-96 overflow-y-auto glass p-4 rounded-xl border border-purple-500/20'>
                <div className='reset-tw text-purple-100 prose prose-invert max-w-none'>
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default  CreationItem
