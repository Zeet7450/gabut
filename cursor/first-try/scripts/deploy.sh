#!/bin/bash

# E-Commerce CS AI Deployment Script
echo "🚀 Deploying E-Commerce CS AI..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please copy env.example to .env.local and fill in your environment variables."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🎉 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy to Vercel: vercel --prod"
    echo "2. Or deploy to your preferred platform"
    echo "3. Make sure to set environment variables in production"
else
    echo "❌ Build failed!"
    exit 1
fi


