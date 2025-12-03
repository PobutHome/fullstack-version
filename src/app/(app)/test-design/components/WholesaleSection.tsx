'use client'

import React from 'react'

export function WholesaleSection() {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 4H3V8H21V4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 16H12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 4V20H3V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: 'Індивідуальні знижки для бізнесу'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: 'Швидка доставка по Україні'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
            fill="currentColor"
          />
        </svg>
      ),
      text: 'Персональний менеджер для оптових клієнтів'
    }
  ]

  return (
    <section
      className="layout-margin"
      style={{
        paddingTop: 'var(--layout-spacing-medium)',
        paddingBottom: 'var(--layout-spacing-medium)',
        position: 'relative',
        backgroundColor: 'var(--color-white)'
      }}
    >
      {/* Background Pattern (subtle green shapes) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, var(--color-green) 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <h2 className="pobut_H1" style={{
          color: 'var(--color-blue)',
          marginBottom: 'var(--layout-spacing-small)',
          textAlign: 'center'
        }}>
          Оптовим клієнтам
        </h2>

        {/* Description */}
        <p className="pobut_body" style={{
          color: 'var(--color-blue)',
          opacity: 0.8,
          textAlign: 'center',
          marginBottom: 'var(--layout-spacing-medium)',
          maxWidth: '50rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Отримайте спеціальні ціни при замовленні від 50 одиниць товару
        </p>

        {/* Feature Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--layout-spacing-medium)',
          marginTop: 'var(--layout-spacing-medium)',
          maxWidth: '75rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--layout-spacing-small)',
                padding: 'var(--layout-spacing-medium)'
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  border: `2px solid var(--color-green)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)',
                  backgroundColor: 'var(--color-white)'
                }}
              >
                {feature.icon}
              </div>

              {/* Feature Text */}
              <p className="pobut_body" style={{
                color: 'var(--color-green)',
                textAlign: 'center',
                maxWidth: '15rem'
              }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider Line */}
      <div
        style={{
          height: '1px',
          backgroundColor: 'var(--color-green)',
          opacity: 0.3,
          marginTop: 'var(--layout-spacing-medium)'
        }}
      />
    </section>
  )
}

