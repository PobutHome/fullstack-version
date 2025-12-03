'use client'

import React, { useState } from 'react'

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  // Placeholder image - replace with actual image path
  const placeholderImage = 'https://via.placeholder.com/1200x600/FFFFFF/E5E7EB?text=Dinnerware+Showcase'

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      marginBottom: 'var(--layout-spacing-medium)'
    }}>
      {/* Carousel Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 1',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${placeholderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
        
        {/* Left Arrow */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
          style={{
            position: 'absolute',
            left: 'var(--layout-spacing-small)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(114, 203, 26, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-white)'
          }}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
          style={{
            position: 'absolute',
            right: 'var(--layout-spacing-small)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(114, 203, 26, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-white)'
          }}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: 'var(--layout-spacing-small)',
        marginTop: 'var(--layout-spacing-small)'
      }}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '0.75rem',
              height: '0.75rem',
              borderRadius: '50%',
              border: `2px solid var(--color-green)`,
              background: index === currentSlide ? 'var(--color-green)' : 'transparent',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

