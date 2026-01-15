import type { HTMLAttributes, ReactNode } from "react"

type Variant = "default" | "narrow" | "wide"

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant
  children: ReactNode
}

export function Container({
  variant = "default",
  className = "",
  children,
  style,
  ...props
}: Props) {
  const base = "fe-container"
  
  // Variant class
  const variantClass = 
    variant === "narrow" ? "fe-container--narrow"
    : variant === "wide" ? "fe-container--wide" 
    : ""
  
  // Combine classes
  const combinedClassName = `${base} ${variantClass} ${className}`.trim()
  
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



