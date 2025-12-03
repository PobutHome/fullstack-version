import type { ReactNode } from 'react'
import React from 'react'

/**
 * Custom layout for test-design page
 * Note: This page still uses the parent layout (Header/Footer)
 * The test page components have their own header/nav matching Figma
 */
export default function TestDesignLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--color-white)'
    }}>
      {children}
    </div>
  )
}

