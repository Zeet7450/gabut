import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
