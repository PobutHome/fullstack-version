import type { HTMLAttributes, ReactNode } from "react"

type SidebarPosition = "left" | "right"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  sidebar: ReactNode
  sidebarPosition?: SidebarPosition
  /** Sidebar width (default: auto) */
  sidebarWidth?: string
  /** Main content gap css value (default: var(--layout-gap-2)) */
  gap?: string
}

export function PageWithSidebar({
  sidebar,
  sidebarPosition = "left",
  sidebarWidth,
  gap = "var(--layout-gap-2)",
  className = "",
  children,
  style,
  ...props
}: Props) {
  const base = "fe-page-component"
  const sidebarClass = `fe-page-with-sidebar--${sidebarPosition}`
  
  const combinedClassName = `${base} ${sidebarClass} ${className}`.trim()
  
  const combinedStyle: React.CSSProperties = {
    ...style,
    gap,
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

