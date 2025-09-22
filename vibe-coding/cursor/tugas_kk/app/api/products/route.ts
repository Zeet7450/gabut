import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SearchFilters } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const filters: any = {}

    if (category && category !== 'all') {
      filters.category = category
    }

    if (minPrice || maxPrice) {
      filters.price = {}
      if (minPrice) filters.price.gte = parseFloat(minPrice)
      if (maxPrice) filters.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      filters.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const orderBy: any = {}
    switch (sortBy) {
      case 'price-asc':
        orderBy.price = 'asc'
        break
      case 'price-desc':
        orderBy.price = 'desc'
        break
      case 'name-asc':
        orderBy.title = 'asc'
        break
      case 'name-desc':
        orderBy.title = 'desc'
        break
      case 'newest':
      default:
        orderBy.createdAt = 'desc'
        break
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: filters,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where: filters }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

