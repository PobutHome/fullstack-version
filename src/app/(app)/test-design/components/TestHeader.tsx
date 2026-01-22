'use client'


export function TestHeader() {
  return (
    <header style={{
      backgroundColor: 'var(--color-white)',
      padding: 'var(--layout-spacing-small) var(--layout-margin)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--color-neutral-border)'
    }}>
      {/* Left: Search Icon */}
      <button
        aria-label="Search"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: 'var(--color-blue)' }}
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Center: Logo */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.125rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.25rem'
        }}>
          <span style={{ 
            color: 'var(--color-blue)',
            lineHeight: '1'
          }}>
            Pabut
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ color: 'var(--color-green)', marginBottom: '-0.125rem' }}
          >
            <path
              d="M3 21L12 3L21 21H3Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span style={{
          color: 'var(--color-blue)',
          opacity: 0.7,
          fontSize: '0.875rem'
        }}>
          Home
        </span>
      </div>

      {/* Right: Hamburger Menu */}
      <button
        aria-label="Menu"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}
      >
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: 'var(--color-blue)',
          borderRadius: '2px'
        }} />
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: 'var(--color-blue)',
          borderRadius: '2px'
        }} />
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: 'var(--color-blue)',
          borderRadius: '2px'
        }} />
      </button>
    </header>
  )
}

