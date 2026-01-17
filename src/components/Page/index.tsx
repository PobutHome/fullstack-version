import type { HTMLAttributes, ReactNode } from "react"
import "./Page.css"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Page({
  className = "",
  children,
  style,
  ...props
}: Props) {
  const combinedClassName = `page ${className}`.trim()
  
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

