'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ProtectedLink({ href, children, className, onClick }: ProtectedLinkProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
    
    if (!session) {
      e.preventDefault()
      router.push('/auth/signin')
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
