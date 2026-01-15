import type { HTMLAttributes, ReactNode } from "react"

import styles from "./Page.module.css"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Page({
  className = "",
  children,
  style,
  ...props
}: Props) {
  const combinedClassName = `${styles.root} ${className}`.trim()
  
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

