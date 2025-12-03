import React from 'react'
import { TestHeader } from './components/TestHeader'
import { TestNavigation } from './components/TestNavigation'
import { HeroCarousel } from './components/HeroCarousel'
import { WholesaleSection } from './components/WholesaleSection'
import { ProductCards } from './components/ProductCards'
import { CatalogSection } from './components/CatalogSection'

export default function TestDesignPage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--color-white)'
    }}>
      {/* Header with Logo, Search, Menu */}
      <TestHeader />
      
      {/* Green Navigation Bar */}
      <TestNavigation />
      
      {/* Hero Carousel Section */}
      <HeroCarousel />
      
      {/* Wholesale Clients Section */}
      <WholesaleSection />
      
      {/* Product Cards Section */}
      <ProductCards />
      
      {/* Catalog Section */}
      <CatalogSection />
    </div>
  )
}

