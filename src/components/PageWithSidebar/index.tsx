import type { HTMLAttributes, ReactNode } from "react"

type SidebarPosition = "left" | "right"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  sidebar: ReactNode
  sidebarPosition?: SidebarPosition
  /** Sidebar width (default: auto) */
  sidebarWidth?: string
  /** Main content gap (default: 2) */
  gap?: 1 | 2 | 3
}

export function PageWithSidebar({
  sidebar,
  sidebarPosition = "left",
  sidebarWidth,
  gap = 2,
  className = "",
  children,
  style,
  ...props
}: Props) {
  const base = "fe-page-component"
  const sidebarClass = `fe-page-with-sidebar--${sidebarPosition}`
  const gapClass = gap ? `fe-gap-${gap}` : ""
  
  const combinedClassName = `${base} ${sidebarClass} ${gapClass} ${className}`.trim()
  
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(sidebarWidth && {
      ['--sidebar-width' as string]: typeof sidebarWidth === 'string' ? sidebarWidth : `${sidebarWidth}px`,
    }),
  }
  
  return (
    <div 
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    >
      {sidebarPosition === "left" ? (
        <>
          <aside className="fe-page-with-sidebar__sidebar">{sidebar}</aside>
          <main className="fe-page-with-sidebar__main">{children}</main>
        </>
      ) : (
        <>
          <main className="fe-page-with-sidebar__main">{children}</main>
          <aside className="fe-page-with-sidebar__sidebar">{sidebar}</aside>
        </>
      )}
    </div>
  )
}

