export interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: Product
}

export interface Message {
  id: string
  userId?: string
  productId?: string
  role: 'user' | 'agent' | 'system'
  content: string
  createdAt: Date
  user?: {
    id: string
    name?: string
    email: string
    image?: string
  }
  product?: Product
}

export interface N8NResponse {
  reply: string
  suggestions?: string[]
  metadata?: Record<string, any>
}

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
}

