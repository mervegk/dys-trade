'use client'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import AuthCheck from '../AuthCheck'

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AuthCheck>
          {children}
        </AuthCheck>
      </SessionProvider>
    </Provider>
  )
}