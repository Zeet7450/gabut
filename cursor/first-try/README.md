# E-Commerce CS AI

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, featuring AI-powered customer service integration with n8n and Neon PostgreSQL database.

## 🚀 Features

- **Modern UI/UX**: Dark theme with green & yellow accents, responsive design
- **AI-Powered Customer Service**: Integrated chat system with n8n webhook
- **Authentication**: NextAuth.js with Google & GitHub OAuth
- **Database**: Neon PostgreSQL with Prisma ORM
- **Shopping Cart**: Full cart functionality with persistent storage
- **Product Management**: Categories, search, filtering, and pagination
- **Animations**: Smooth transitions with Framer Motion
- **Custom Cursor**: Interactive cursor design
- **Accessibility**: Keyboard navigation and ARIA labels

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **AI Integration**: n8n webhook
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Neon PostgreSQL database account
- n8n account (for AI integration)
- Google OAuth credentials
- GitHub OAuth credentials

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-cs-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Database
DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# N8N Integration
N8N_WEBHOOK_URL=your-n8n-webhook-url
N8N_API_KEY=your-n8n-api-key
```

### 4. Database Setup

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

Seed the database with sample data:

```bash
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Neon Database Setup

1. Visit [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env.local` file as `DATABASE_URL`

### OAuth Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://yourdomain.com/api/auth/callback/github` (production)

### n8n Integration Setup

1. Set up an n8n instance (cloud or self-hosted)
2. Create a webhook trigger node
3. Configure the webhook URL and API key
4. Set up your AI processing workflow

#### Example n8n Webhook Configuration

```json
{
  "webhookUrl": "https://your-n8n-instance.com/webhook/chat",
  "apiKey": "your-api-key",
  "expectedPayload": {
    "userId": "string",
    "productId": "string (optional)",
    "message": "string",
    "context": "object"
  },
  "responseFormat": {
    "reply": "string",
    "suggestions": "string[] (optional)",
    "metadata": "object (optional)"
  }
}
```

#### Testing n8n Webhook

You can test the n8n webhook using curl:

```bash
curl -X POST "YOUR_N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_N8N_API_KEY" \
  -d '{
    "userId": "test-user-123",
    "productId": "product-456",
    "message": "Hello, I need help with this product",
    "context": {
      "cart": [],
      "product": {
        "id": "product-456",
        "title": "Sample Product",
        "category": "Makanan",
        "price": 25000
      }
    }
  }'
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── shop/              # Shop page
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── cart/          # Cart API endpoints
│   │   ├── chat/          # Chat API endpoints
│   │   └── products/      # Products API endpoints
│   ├── auth/              # Authentication pages
│   ├── products/[id]/     # Product detail page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # React Query & NextAuth providers
├── components/            # Reusable components
│   ├── CartDrawer.tsx     # Shopping cart drawer
│   ├── ChatDrawer.tsx     # AI chat interface
│   ├── Footer.tsx         # Site footer
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProductCard.tsx    # Product card component
│   ├── ProfileDropdown.tsx # User profile dropdown
│   └── SearchBar.tsx      # Search functionality
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── types.ts          # TypeScript type definitions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts           # Database seeding script
└── public/               # Static assets
```

## 🎨 Customization

### Theme Colors

The project uses a custom dark theme with green and yellow accents. You can modify colors in `tailwind.config.js`:

```javascript
colors: {
  'bg-primary': '#0b1220',      // Very dark background
  'bg-secondary': '#0f1724',    // Secondary background
  'surface': '#0f1724',         // Card/surface background
  'green-accent': '#10B981',    // Primary accent color
  'yellow-accent': '#F59E0B',   // Secondary accent color
  'muted': '#94A3B8',           // Muted text color
}
```

### Custom Cursor

The custom cursor is implemented in `globals.css`. You can modify the cursor styles:

```css
.custom-cursor {
  cursor: url("data:image/svg+xml;utf8,<svg>...</svg>"), auto;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL`
- `NEXTAUTH_URL` (your production domain)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` & `GITHUB_SECRET`
- `N8N_WEBHOOK_URL` & `N8N_API_KEY`

## 🧪 Testing

Run the linter:

```bash
npm run lint
```

## 📝 API Documentation

### Products API

- `GET /api/products` - Get all products with filtering
- `GET /api/products/[id]` - Get single product

### Cart API

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

### Chat API

- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/history` - Get chat history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact support at support@ecommerce-cs-ai.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Prisma](https://www.prisma.io/) for the database ORM
- [n8n](https://n8n.io/) for workflow automation
- [Neon](https://neon.tech/) for the PostgreSQL database

---

Made with ❤️ for modern e-commerce experiences.
