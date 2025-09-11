'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-bg-primary">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Something went wrong!
            </h2>
            <p className="text-text-secondary mb-6">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
