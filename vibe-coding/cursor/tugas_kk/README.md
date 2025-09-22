# E-Commerce Sijual AI

A modern, responsive e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS, featuring AI-powered customer service integration with n8n and Neon PostgreSQL database. The platform includes a mobile-first responsive design with a collapsible sidebar navigation and comprehensive product management system.

## 🚀 Features

### Core Features
- **Modern UI/UX**: Dark theme with green & yellow accents, fully responsive design
- **AI-Powered Customer Service**: Integrated chat system with n8n webhook
- **Authentication**: NextAuth.js with Google & GitHub OAuth
- **Database**: Neon PostgreSQL with Prisma ORM
- **Shopping Cart**: Full cart functionality with persistent storage
- **Product Management**: Categories, search, filtering, and pagination
- **Animations**: Smooth transitions with Framer Motion
- **Multi-language Support**: Indonesian and English language switching
- **Mobile-First Design**: Responsive sidebar navigation and mobile-optimized layouts

### Mobile Features
- **Responsive Sidebar**: Collapsible navigation for mobile devices
- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Mobile Profile Settings**: Easy-to-use profile management on mobile
- **Responsive Footer**: Mobile-optimized footer layout
- **Mobile Product Cards**: Touch-friendly product displays

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme and responsive design
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

## 📁 Project Structure & Component Details

```
├── app/                           # Next.js App Router
│   ├── (main)/                    # Main application routes
│   │   ├── about/                 # About page
│   │   │   └── page.tsx          # About page component
│   │   ├── contact/               # Contact page
│   │   │   └── page.tsx          # Contact page component
│   │   ├── shop/                  # Shop page
│   │   │   └── page.tsx          # Shop page component
│   │   ├── products/[id]/         # Dynamic product detail page
│   │   │   └── page.tsx          # Product detail component
│   │   ├── seller/[sellerId]/     # Seller profile page
│   │   │   └── page.tsx          # Seller profile component
│   │   ├── page.tsx              # Home page
│   │   └── layout.tsx            # Main layout wrapper
│   ├── auth/                      # Authentication pages
│   │   ├── signin/               # Sign in page
│   │   │   └── page.tsx          # Sign in component
│   │   └── layout.tsx            # Auth layout wrapper
│   ├── api/                       # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   │   └── route.ts          # Auth API handler
│   │   ├── cart/                  # Cart API endpoints
│   │   │   ├── [id]/             # Individual cart item operations
│   │   │   │   └── route.ts      # Cart item API handler
│   │   │   └── route.ts          # Cart API handler
│   │   ├── chat/                  # Chat API endpoints
│   │   │   ├── history/          # Chat history endpoint
│   │   │   │   └── route.ts      # Chat history API handler
│   │   │   └── route.ts          # Chat API handler
│   │   └── products/              # Products API endpoints
│   │       ├── [id]/             # Individual product operations
│   │       │   └── route.ts      # Product detail API handler
│   │       └── route.ts          # Products list API handler
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout component
│   ├── providers.tsx             # React Query & NextAuth providers
│   ├── template.tsx              # Template wrapper
│   ├── loading.tsx               # Global loading component
│   ├── error.tsx                 # Global error component
│   ├── not-found.tsx             # 404 page component
│   └── default.tsx               # Default page component
├── components/                    # Reusable UI components
│   ├── AIChatModal.tsx          # AI chat modal component
│   ├── CartDrawer.tsx           # Shopping cart drawer component
│   ├── ChatDrawer.tsx           # AI chat interface component
│   ├── ErrorBoundary.tsx        # Error boundary wrapper
│   ├── Footer.tsx               # Site footer component
│   ├── LanguageSwitcher.tsx     # Language switching component
│   ├── LoadingSpinner.tsx       # Loading spinner component
│   ├── Navbar.tsx               # Navigation bar component
│   ├── ProductCard.tsx          # Product card component
│   ├── ProfileDropdown.tsx      # User profile dropdown
│   ├── ProtectedLink.tsx        # Protected route wrapper
│   ├── SearchBar.tsx            # Search functionality component
│   └── UserProfileModal.tsx     # User profile modal component
├── lib/                          # Utility libraries and configurations
│   ├── auth.ts                  # NextAuth configuration
│   ├── language-context.tsx     # Language context provider
│   ├── prisma.ts                # Prisma client configuration
│   └── types.ts                 # TypeScript type definitions
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma            # Prisma database schema
│   ├── seed.ts                  # Database seeding script
│   └── dev.db                   # Development database file
└── public/                       # Static assets
    ├── google-logo.svg          # Google OAuth logo
    ├── placeholder-product.jpg  # Default product image
    └── placeholder-product.svg  # Default product SVG
```

## 🎨 Component Details

### Navigation Components

#### Navbar.tsx
**Location**: `components/Navbar.tsx`

The main navigation component that handles both desktop and mobile layouts:

**Features**:
- **Desktop Navigation**: Horizontal navigation with logo, menu items, and user actions
- **Mobile Sidebar**: Collapsible sidebar with hamburger menu trigger
- **Responsive Design**: Automatically switches between desktop and mobile layouts
- **User Authentication**: Sign in/out functionality with profile dropdown
- **Shopping Cart**: Cart icon with item count indicator
- **AI Chat Button**: Fixed position AI chat button for mobile

**Key Props**:
- No external props required (uses internal state and context)

**Mobile Features**:
- Sidebar slides in from left with smooth animation
- Profile settings accessible from sidebar
- Touch-friendly navigation items with icons
- "Explore Product" section for mobile users

#### Footer.tsx
**Location**: `components/Footer.tsx`

The site footer with comprehensive links and information:

**Features**:
- **Brand Section**: Logo, description, and contact information
- **Navigation Links**: Company, support, and legal links
- **Social Media**: Social media icons with hover effects
- **AI Assistant CTA**: Call-to-action for AI chat feature
- **Responsive Layout**: Mobile-optimized grid layout

**Mobile Optimizations**:
- Single column layout on mobile
- Two-column layout on tablet
- Five-column layout on desktop
- Touch-friendly social media icons
- Responsive text sizing

### Page Components

#### Home Page
**Location**: `app/(main)/page.tsx`

The main landing page featuring:

**Sections**:
1. **Hero Section**: Welcome message with call-to-action buttons
2. **Stats Section**: Key metrics and achievements
3. **Features Section**: Platform highlights with icons
4. **Featured Products**: Grid of featured products
5. **CTA Section**: Final call-to-action

**Mobile Features**:
- Responsive text sizing
- Touch-friendly buttons
- Optimized product grid
- Smooth animations

#### About Page
**Location**: `app/(main)/about/page.tsx`

Company information and team details:

**Sections**:
1. **Hero Section**: Company introduction
2. **Stats Section**: Company metrics
3. **Our Story**: Company history and mission
4. **Values Section**: Core company values
5. **Team Section**: Team member profiles
6. **CTA Section**: Call-to-action

**Mobile Features**:
- Responsive grid layouts
- Touch-friendly team cards
- Optimized image sizing

#### Shop Page
**Location**: `app/(main)/shop/page.tsx`

Product catalog with filtering and search:

**Features**:
- **Search Bar**: Real-time product search
- **Category Filter**: Visual category selection with emojis
- **Product Grid**: Responsive product display
- **Pagination**: Page navigation for large catalogs
- **Sorting**: Multiple sorting options

**Mobile Optimizations**:
- 4-column category grid on mobile
- 6-column on tablet
- 8-column on desktop
- Touch-friendly category buttons
- Responsive product cards

**Category System**:
- All Products (A)
- Food (🍽️)
- Beverages (🥤)
- Desserts (🍰)
- Snacks (🍿)
- Healthy (🥗)
- Fast Food (🍔)
- Coffee (☕)

#### Product Detail Page
**Location**: `app/(main)/products/[id]/page.tsx`

Individual product information and purchase options:

**Features**:
- **Product Images**: Main image with thumbnail gallery
- **Product Info**: Title, price, description, ratings
- **Quantity Selector**: Add/remove quantity controls
- **Action Buttons**: Add to cart, chat with CS, wishlist
- **Testimonials**: Customer reviews and ratings
- **Seller Information**: Seller profile and statistics

**Mobile Features**:
- Single column layout on mobile
- Two-column layout on desktop
- Touch-friendly image gallery
- Responsive testimonial grid
- Mobile-optimized seller section

#### Contact Page
**Location**: `app/(main)/contact/page.tsx`

Contact information and inquiry form:

**Features**:
- **Contact Info**: Multiple contact methods
- **Contact Form**: Name, email, subject, message fields
- **AI Assistant**: Direct access to AI chat
- **FAQ Section**: Expandable frequently asked questions

**Mobile Features**:
- Single column form layout on mobile
- Two-column layout on desktop
- Touch-friendly form inputs
- Responsive FAQ accordion

### Modal Components

#### UserProfileModal.tsx
**Location**: `components/UserProfileModal.tsx`

User profile management modal:

**Features**:
- **Profile Information**: Name, email, phone, address
- **Profile Image**: Upload and preview functionality
- **Settings**: Language switching and preferences
- **Edit Mode**: Toggle between view and edit modes
- **Form Validation**: Input validation and error handling

**Mobile Features**:
- Full-screen modal on mobile
- Touch-friendly form inputs
- Responsive layout
- Easy-to-use language switcher

#### CartDrawer.tsx
**Location**: `components/CartDrawer.tsx`

Shopping cart drawer component:

**Features**:
- **Cart Items**: Display of added products
- **Quantity Controls**: Update item quantities
- **Remove Items**: Delete items from cart
- **Total Calculation**: Price and quantity totals
- **Checkout Button**: Proceed to checkout

**Mobile Features**:
- Slide-in drawer from right
- Touch-friendly controls
- Responsive item display

#### ChatDrawer.tsx
**Location**: `components/ChatDrawer.tsx`

AI chat interface:

**Features**:
- **Message History**: Previous conversation display
- **Input Field**: Type and send messages
- **AI Responses**: Real-time AI assistant replies
- **Product Context**: Product-specific chat when applicable

**Mobile Features**:
- Full-screen chat on mobile
- Touch-friendly input
- Responsive message bubbles

### Utility Components

#### LanguageSwitcher.tsx
**Location**: `components/LanguageSwitcher.tsx`

Language switching component:

**Features**:
- **Language Toggle**: Switch between Indonesian and English
- **Context Integration**: Uses language context for state management
- **Visual Indicator**: Shows current language selection

#### ProtectedLink.tsx
**Location**: `components/ProtectedLink.tsx`

Authentication-protected link wrapper:

**Features**:
- **Auth Check**: Verifies user authentication
- **Redirect**: Redirects to sign-in if not authenticated
- **Seamless Integration**: Works like regular Next.js Link

## 🎨 Styling & Theme

### Color Scheme
The project uses a custom dark theme defined in `tailwind.config.js`:

```javascript
colors: {
  'bg-primary': '#0b1220',      // Very dark background
  'bg-secondary': '#0f1724',    // Secondary background
  'surface': '#0f1724',         // Card/surface background
  'text-primary': '#f8fafc',    // Primary text color
  'text-secondary': '#cbd5e1',  // Secondary text color
  'text-muted': '#94a3b8',      // Muted text color
  'green-accent': '#10B981',    // Primary accent color
  'yellow-accent': '#F59E0B',   // Secondary accent color
  'border': '#1e293b',          // Border color
  'border-hover': '#334155',    // Hover border color
}
```

### Responsive Design
The project uses mobile-first responsive design with the following breakpoints:

- **Mobile**: Default (0px+)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+)
- **Large Desktop**: `lg:` (1024px+)

### Custom CSS Classes
Global styles are defined in `app/globals.css` with custom utility classes:

- **Product Detail Styles**: Custom classes for product page layout
- **Loading States**: Skeleton loading animations
- **Error States**: Error page styling
- **Custom Cursor**: Interactive cursor design
- **Scrollbar Styling**: Custom scrollbar appearance

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

## 📱 Mobile Responsiveness

### Navigation
- **Desktop**: Horizontal navbar with logo and menu items
- **Mobile**: Hamburger menu with slide-out sidebar
- **Sidebar Features**:
  - Logo and close button
  - "Explore Product" section
  - Navigation links with icons
  - User profile section
  - Sign in/out functionality

### Layout Adaptations
- **Grid Systems**: Responsive grid layouts that adapt to screen size
- **Typography**: Responsive text sizing for readability
- **Spacing**: Optimized padding and margins for mobile
- **Touch Targets**: Minimum 44px touch targets for accessibility
- **Images**: Responsive image sizing and aspect ratios

### Component Optimizations
- **Forms**: Single-column layout on mobile, multi-column on desktop
- **Cards**: Stacked layout on mobile, grid layout on desktop
- **Modals**: Full-screen on mobile, centered on desktop
- **Buttons**: Full-width on mobile when appropriate

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
  - Query parameters: `category`, `sortBy`, `search`, `minPrice`, `maxPrice`, `page`, `limit`
- `GET /api/products/[id]` - Get single product by ID

### Cart API

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
  - Body: `{ productId: string, quantity: number }`
- `PUT /api/cart/[id]` - Update cart item quantity
  - Body: `{ quantity: number }`
- `DELETE /api/cart/[id]` - Remove item from cart

### Chat API

- `POST /api/chat` - Send message to AI assistant
  - Body: `{ message: string, productId?: string }`
- `GET /api/chat/history` - Get chat history

### Authentication API

- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin` - Sign in with credentials
- `GET /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

## 🔄 State Management

### React Query (TanStack Query)
Used for server state management:

- **Products**: Caching and synchronization of product data
- **Cart**: Real-time cart state updates
- **Chat**: Message history and AI responses
- **User Session**: Authentication state

### React Context
Used for client-side state:

- **Language Context**: Multi-language support
- **Theme Context**: Dark/light theme switching
- **UI State**: Modal and drawer states

## 🌐 Internationalization

The project supports multiple languages through the `LanguageSwitcher` component:

### Supported Languages
- **Indonesian**: Default language
- **English**: Secondary language

### Language Files
Language translations are managed through the `useLanguage` hook and context provider.

### Adding New Languages
1. Update the language context
2. Add translation keys
3. Update the language switcher component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Use TypeScript for type safety
- Write responsive components
- Test on multiple screen sizes
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact support at support@sijual.com

### Common Issues

**Database Connection Issues**:
- Verify your `DATABASE_URL` is correct
- Check if your Neon database is active
- Ensure Prisma schema is up to date

**Authentication Issues**:
- Verify OAuth credentials are correct
- Check redirect URIs match your domain
- Ensure `NEXTAUTH_SECRET` is set

**Mobile Layout Issues**:
- Test on actual devices, not just browser dev tools
- Check responsive breakpoints
- Verify touch targets are large enough

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Prisma](https://www.prisma.io/) for the database ORM
- [n8n](https://n8n.io/) for workflow automation
- [Neon](https://neon.tech/) for the PostgreSQL database
- [Lucide React](https://lucide.dev/) for beautiful icons
- [TanStack Query](https://tanstack.com/query) for server state management

## 📊 Performance

### Optimization Features
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Components and images load on demand
- **Caching**: React Query caching for API responses
- **Bundle Analysis**: Built-in bundle analyzer

### Performance Metrics
- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Mobile Performance**: Optimized for mobile devices

---

Made with ❤️ for modern e-commerce experiences.

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Sijual Development Team