import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
 

createRoot(document.getElementById('root')).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl="/"
    appearance={{
      baseTheme: undefined,
      variables: {
        colorPrimary: '#8b5cf6',
        colorBackground: '#1a1a2e',
        colorInputBackground: '#16213e',
        colorInputText: '#ffffff',
        colorText: '#ffffff',
        colorTextSecondary: '#a78bfa',
        borderRadius: '0.75rem',
        fontFamily: 'Inter, sans-serif'
      }
    }}
    localization={{
      signIn: {
        start: {
          title: "Welcome to Quick AI",
          subtitle: "Sign in to your account to continue"
        }
      }
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
)
