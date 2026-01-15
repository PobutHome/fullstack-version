import type { HTMLAttributes, ReactNode } from "react"
import "./Container.css"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Container({
  className = "",
  children,
  style,
  ...props
}: Props) {
  const combinedClassName = `container ${className}`.trim()
  
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



