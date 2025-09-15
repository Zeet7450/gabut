import { assets } from "../assets/assets";
import { Star, Quote } from 'lucide-react';

const Testimonial  = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'Quick AI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'Quick AI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'Quick AI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 relative'>
            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-blue-900/5'></div>
            
            <div className='relative z-10'>
                <div className='text-center space-y-6 mb-16'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-200 mb-4'>
                        <Star className='w-4 h-4' />
                        <span>Customer Stories</span>
                    </div>
                    
                    <h2 className='text-4xl sm:text-5xl font-bold text-white'>
                        Loved by <span className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Creators</span>
                    </h2>
                    <p className='text-purple-200 text-lg max-w-2xl mx-auto'>
                        Don't just take our word for it. Here's what our users are saying about their experience.
                    </p>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                    {dummyTestimonialData.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className='group glass p-8 rounded-2xl border border-purple-500/20 hover-lift transition-all duration-300 hover:border-purple-400/40 card-stagger'
                        >
                            <div className='space-y-6'>
                                {/* Quote Icon */}
                                <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center'>
                                    <Quote className='w-6 h-6 text-white' />
                                </div>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    {Array(5).fill(0).map((_, img) => (
                                        <Star 
                                            key={img} 
                                            className={`w-5 h-5 ${
                                                img < testimonial.rating 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-600'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                
                                {/* Content */}
                                <p className='text-purple-200 text-sm leading-relaxed'>
                                    "{testimonial.content}"
                                </p>
                                
                                {/* Author */}
                                <div className='flex items-center gap-4 pt-4 border-t border-purple-500/20'>
                                    <img 
                                        src={testimonial.image} 
                                        className='w-12 h-12 rounded-full border-2 border-purple-400/30 object-cover' 
                                        alt={testimonial.name} 
                                    />
                                    <div className='text-sm'>
                                        <h3 className='font-semibold text-white'>{testimonial.name}</h3>
                                        <p className='text-purple-300 text-xs'>{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonial;