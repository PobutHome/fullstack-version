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
  // Using Tailwind classes - responsive padding-top via ds-inner-section-gap-y
  const baseClasses = "w-full pt-layout-gap-3 grid gap-layout-gap-3"
  
  // Handle special variants via className
  // 'page-background' adds background image
  // 'sections-margin' adds gap between sections
  const hasBackground = className.includes('page-background')
  const hasSectionsMargin = className.includes('sections-margin')
  
  const variantClasses = [
    hasBackground && "bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat bg-fixed",
    hasSectionsMargin && "flex flex-col gap-ds-inner-section-gap-y",
  ].filter(Boolean).join(' ')
  
  const combinedClassName = `${baseClasses} ${variantClasses} ${className}`.trim()
  
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

