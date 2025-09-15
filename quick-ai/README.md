# 🚀 Quick AI - AI-Powered Content Creation Platform

A modern, full-stack web application that leverages artificial intelligence to help users create various types of content including articles, blog titles, images, and more. Built with React, Node.js, and integrated with multiple AI services.

## ✨ Features

### 🤖 AI-Powered Tools

- **📝 Article Writer** - Generate comprehensive articles on any topic
- **🏷️ Blog Title Generator** - Create compelling blog titles with AI
- **🎨 Image Generator** - Generate stunning images from text descriptions
- **✂️ Background Removal** - Remove backgrounds from images automatically
- **🔧 Object Removal** - Remove unwanted objects from images
- **📄 Resume Review** - Get AI-powered resume analysis and feedback

### 🎨 Modern UI/UX

- **Dark Purple Theme** - Beautiful dark purple gradient design
- **Glass Morphism** - Modern glass effect with backdrop blur
- **Responsive Design** - Optimized for all screen sizes
- **Smooth Animations** - Elegant transitions and hover effects
- **Auto-Download** - Automatic download for generated images

### 🔐 Authentication & User Management

- **Clerk Integration** - Secure user authentication
- **User Profiles** - Personalized user experience
- **Usage Tracking** - Free and premium plan management
- **Community Gallery** - Share and discover AI creations

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk React** - Authentication components
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **React Markdown** - Markdown rendering

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Clerk Express** - Authentication middleware
- **Neon Database** - PostgreSQL database
- **Cloudinary** - Image storage and processing
- **Multer** - File upload handling
- **OpenAI** - AI model integration (Gemini)
- **PDF-Parse** - PDF processing
- **CORS** - Cross-origin resource sharing

### AI Services

- **Google Gemini 2.0 Flash** - Text generation and analysis
- **Clipdrop API** - Image processing and manipulation
- **Cloudinary** - Image optimization and transformation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quick-ai
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL=your_neon_database_url

   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # AI Services
   GEMINI_API_KEY=your_gemini_api_key
   CLIPDROP_API_KEY=your_clipdrop_api_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Frontend
   VITE_BASE_URL=http://localhost:3000
   ```

4. **Run the application**

   ```bash
   # Start the server (Terminal 1)
   cd server
   npm run server

   # Start the client (Terminal 2)
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
quick-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Static assets
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Public assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── configs/            # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middleware
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
├── .env                    # Environment variables
└── README.md
```

## 🎨 UI/UX Features

### Design System

- **Color Palette**: Dark purple gradients with glass morphism
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind CSS
- **Animations**: Smooth transitions and hover effects

### Component Features

- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Loading States**: Beautiful loading animations
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback
- **Auto-Download**: Seamless file downloads

## 🔧 API Endpoints

### Authentication Required

- `POST /api/ai/generate-article` - Generate articles
- `POST /api/ai/generate-blog-titles` - Generate blog titles
- `POST /api/ai/generate-image` - Generate images
- `POST /api/ai/remove-image-background` - Remove backgrounds
- `POST /api/ai/remove-image-object` - Remove objects
- `POST /api/ai/resume-review` - Review resumes
- `GET /api/user/get-user-creations` - Get user creations
- `GET /api/user/get-published-creations` - Get community creations

### Public

- `GET /api/test` - API health check

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 🐛 Troubleshooting

### Common Issues

1. **500 Internal Server Error**

   - Check environment variables
   - Verify API keys are valid
   - Check server logs for detailed errors

2. **401 Unauthorized Error**

   - Ensure user is logged in
   - Check Clerk configuration
   - Verify authentication tokens

3. **CORS Issues**

   - Verify CORS configuration in server.js
   - Check if frontend URL is allowed

4. **Port Conflicts**
   - Ensure ports 3000 and 5173 are available
   - Kill existing processes if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini** - AI text generation
- **Clipdrop** - Image processing services
- **Cloudinary** - Image storage and optimization
- **Clerk** - Authentication services
- **Neon** - Database hosting
- **Vercel** - Frontend hosting

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ and AI**
