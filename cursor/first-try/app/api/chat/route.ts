import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { N8NResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { message, productId, context } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      })
    }

    // Save user message to database
    const userMessage = await prisma.message.create({
      data: {
        userId: user.id,
        productId: productId || null,
        role: 'user',
        content: message,
      },
      include: {
        user: true,
        product: true,
      },
    })

    // Call N8N webhook
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_API_KEY && {
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
        }),
      },
      body: JSON.stringify({
        userId: user.id,
        productId: productId || null,
        message,
        context: context || {},
        sessionId: session.user.email,
      }),
    })

    let n8nData: N8NResponse
    if (n8nResponse.ok) {
      n8nData = await n8nResponse.json()
    } else {
      // Fallback response if N8N is not available
      n8nData = {
        reply: 'Terima kasih atas pertanyaan Anda. Tim customer service kami akan segera merespons. Silakan coba lagi nanti.',
        suggestions: [
          'Bagaimana cara memesan?',
          'Apa saja menu yang tersedia?',
          'Bagaimana cara pembayaran?',
        ],
      }
    }

    // Save agent response to database
    const agentMessage = await prisma.message.create({
      data: {
        userId: user.id,
        productId: productId || null,
        role: 'agent',
        content: n8nData.reply,
      },
      include: {
        user: true,
        product: true,
      },
    })

    return NextResponse.json({
      userMessage,
      agentMessage,
      suggestions: n8nData.suggestions || [],
      metadata: n8nData.metadata || {},
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

