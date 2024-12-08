import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
        {children}
    </ProtectedRoute>
  )
}

export default ProtectedLayout