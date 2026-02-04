import type { HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Container({
  className = "",
  children,
  style,
  ...props
}: Props) {
  // Using Tailwind classes - max-width 100rem (1600px), responsive padding
  const combinedClassName = `w-full max-w-[100rem] mx-auto px-[clamp(1.25rem,4vw,5rem)] ${className}`.trim()
  
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



