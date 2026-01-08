import type { HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  leftSidebar: ReactNode
  rightSidebar: ReactNode
  /** Left sidebar width (default: auto) */
  leftSidebarWidth?: string
  /** Right sidebar width (default: auto) */
  rightSidebarWidth?: string
  /** Gap between sections (default: 2) */
  gap?: 1 | 2 | 3
}

export function PageWithTwoSidebars({
  leftSidebar,
  rightSidebar,
  leftSidebarWidth,
  rightSidebarWidth,
  gap = 2,
  className = "",
  children,
  style,
  ...props
}: Props) {
  const base = "fe-page-component"
  const sidebarClass = "fe-page-with-two-sidebars"
  const gapClass = gap ? `fe-gap-${gap}` : ""
  
  const combinedClassName = `${base} ${sidebarClass} ${gapClass} ${className}`.trim()
  
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(leftSidebarWidth && {
      ['--left-sidebar-width' as string]: typeof leftSidebarWidth === 'string' ? leftSidebarWidth : `${leftSidebarWidth}px`,
    }),
    ...(rightSidebarWidth && {
      ['--right-sidebar-width' as string]: typeof rightSidebarWidth === 'string' ? rightSidebarWidth : `${rightSidebarWidth}px`,
    }),
  }
  
  return (
    <div 
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    >
      <aside className="fe-page-with-two-sidebars__left">{leftSidebar}</aside>
      <main className="fe-page-with-two-sidebars__main">{children}</main>
      <aside className="fe-page-with-two-sidebars__right">{rightSidebar}</aside>
    </div>
  )
}

