'use client'


export function CatalogSection() {
  return (
    <section
      className="layout-margin"
      style={{
        paddingTop: 'var(--layout-spacing-medium)',
        paddingBottom: 'var(--layout-spacing-medium)'
      }}
    >
      <h2 className="pobut_H1" style={{
        color: 'var(--color-blue)',
        marginBottom: 'var(--layout-spacing-medium)'
      }}>
        Каталог
      </h2>
      
      {/* Placeholder for catalog content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 'var(--layout-spacing-medium)',
        marginTop: 'var(--layout-spacing-medium)'
      }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 'var(--radius-md)',
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF'
            }}
          >
            <span className="pobut_caption">Category {index + 1}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

