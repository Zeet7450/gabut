import React from 'react'
import { assets } from '../assets/assets'
import { Sparkles, Mail, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="px-4 sm:px-20 xl:px-32 pt-16 w-full text-purple-200 mt-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-12 border-b border-purple-500/20 pb-12">
          {/* Brand Section */}
          <div className="lg:max-w-96 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <img className="h-9" src={assets.logo} alt="Quick AI Logo" />
            </div>
            <p className="text-purple-300 text-sm leading-relaxed">
              Experience the power of AI with Quick AI. Transform your content creation with our suite of premium AI tools. 
              Write articles, generate images, and enhance your workflow with cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-purple-600/30 hover:bg-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 text-purple-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-purple-600/30 hover:bg-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5 text-purple-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-purple-600/30 hover:bg-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-purple-300" />
              </a>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-12">
            <div>
              <h2 className="font-semibold mb-6 text-white text-lg">Company</h2>
              <ul className="text-sm space-y-3">
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">About us</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Contact us</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Privacy policy</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Terms of service</a></li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-semibold text-white mb-6 text-lg">Resources</h2>
              <ul className="text-sm space-y-3">
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">API Reference</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Community</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors duration-300">Blog</a></li>
              </ul>
            </div>
            
            {/* Newsletter Section */}
            <div className="lg:max-w-80">
              <h2 className="font-semibold text-white mb-6 text-lg">Stay Updated</h2>
              <div className="space-y-4">
                <p className="text-purple-300 text-sm">
                  Get the latest news, articles, and resources, sent to your inbox weekly.
                </p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input 
                      className="w-full h-12 pl-10 pr-4 bg-purple-900/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300" 
                      type="email" 
                      placeholder="Enter your email" 
                    />
                  </div>
                  <button className="btn-primary px-6 h-12 text-white rounded-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                    <span className="text-sm font-medium">Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-400 text-sm">
            Copyright 2025 © Quick AI. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-purple-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-purple-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-purple-400 hover:text-white transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
