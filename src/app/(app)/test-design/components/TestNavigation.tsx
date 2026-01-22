'use client'


export function TestNavigation() {
  const navItems = [
    'Оптовим клієнтам',
    'Каталог',
    'Акції і пропозиції',
    'Відгуки',
    'Про Нас',
    'Контакти',
    'Адреса'
  ]

  return (
    <nav style={{
      backgroundColor: 'var(--color-green)',
      padding: 'var(--layout-spacing-small) var(--layout-margin)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--layout-spacing-medium)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {navItems.map((item, index) => (
        <a
          key={index}
          href="#"
          style={{
            color: 'var(--color-white)',
            textDecoration: 'none',
            fontWeight: 400,
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          {item}
        </a>
      ))}
    </nav>
  )
}

