'use client'


export function ProductCards() {
  const products = [
    {
      name: 'Паперові стакани 250 мл / 50 шт',
      retailPrice: '265',
      wholesalePrice: '230',
      inStock: true
    },
    {
      name: 'Паперові стакани 250 мл / 50 шт',
      retailPrice: '265',
      wholesalePrice: '230',
      inStock: true
    },
    {
      name: 'Паперові стакани 250 мл / 50 шт',
      retailPrice: '265',
      wholesalePrice: '230',
      inStock: true
    }
  ]

  return (
    <section
      className="layout-margin"
      style={{
        paddingTop: 'var(--layout-spacing-medium)',
        paddingBottom: 'var(--layout-spacing-medium)'
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--layout-spacing-medium)',
          marginBottom: 'var(--layout-spacing-small)'
        }}>
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: `1px solid var(--color-neutral-border)`,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '80%',
                  height: '80%',
                  backgroundColor: '#E5E7EB',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9CA3AF'
                }}>
                  {/* Placeholder for product image */}
                  <span>Product Image</span>
                </div>
              </div>

              {/* Product Details */}
              <div style={{
                padding: 'var(--layout-spacing-small)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--layout-spacing-small)'
              }}>
                {/* Stock Status */}
                {product.inStock && (
                  <span style={{
                    color: 'var(--color-green)'
                  }}>
                    • в наявності
                  </span>
                )}

                {/* Product Name */}
                <h3 style={{
                  color: 'var(--color-blue)',
                  fontWeight: 400
                }}>
                  {product.name}
                </h3>

                {/* Pricing Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--layout-spacing-small)',
                  marginTop: 'auto'
                }}>
                  {/* Retail Price */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--layout-spacing-small)'
                  }}>
                    <div>
                      <div style={{
                        color: 'var(--color-green)',
                        lineHeight: '1.2'
                      }}>
                        {product.retailPrice} грн
                      </div>
                      <span style={{
                        color: 'var(--color-blue)',
                        opacity: 0.6
                      }}>
                        роздріб
                      </span>
                    </div>
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: `1px solid var(--color-green)`,
                        backgroundColor: 'var(--color-white)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-green)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-green-hover)'
                        e.currentTarget.style.color = 'var(--color-white)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-white)'
                        e.currentTarget.style.color = 'var(--color-green)'
                      }}
                    >
                      Додати в кошик
                    </button>
                  </div>

                  {/* Wholesale Price */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--layout-spacing-small)'
                  }}>
                    <div>
                      <div style={{
                        color: 'var(--color-green)',
                        lineHeight: '1.2'
                      }}>
                        {product.wholesalePrice} грн
                      </div>
                      <span style={{
                        color: 'var(--color-blue)',
                        opacity: 0.6
                      }}>
                        опт від 50 шт
                      </span>
                    </div>
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: `1px solid var(--color-green)`,
                        backgroundColor: 'var(--color-white)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-green)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-green-hover)'
                        e.currentTarget.style.color = 'var(--color-white)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-white)'
                        e.currentTarget.style.color = 'var(--color-green)'
                      }}
                    >
                      Додати в кошик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--layout-spacing-small)',
          marginTop: 'var(--layout-spacing-small)'
        }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-green)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Previous products"
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
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-green)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Next products"
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
      </div>
    </section>
  )
}

