import type { HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Page({
  className = "",
  children,
  style,
  ...props
}: Props) {
  const base = "fe-page-component"
  
  const combinedClassName = `${base} ${className}`.trim()
  
  return (
    <div 
      className={combinedClassName}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

