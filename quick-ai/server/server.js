import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express()

await connectCloudinary()

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}))

// Cookie configuration for SameSite
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  next()
})

app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res )=>res.send('Server is Live'))

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API is working',
        timestamp: new Date().toISOString()
    });
})

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log('Sever is running on port', PORT)
})
