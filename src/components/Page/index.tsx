import type { HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  background?: boolean
  sectionsMargin?: boolean
}

export function Page({
  className = "",
  background = false,
  sectionsMargin = false,
  children,
  style,
  ...props
}: Props) {
  // Using Tailwind classes - responsive vertical section gap via ds-sections-gap
  const baseClasses = "w-full pt-layout-gap-3 grid gap-layout-gap-3"

  const combinedClassName = [
    baseClasses,
    // Background image is decorative: avoid `bg-fixed` on small screens (can hurt LCP/scroll perf).
    background && "bg-[url('/images/background.svg')] bg-cover bg-center bg-no-repeat md:bg-fixed",
    sectionsMargin && "flex flex-col gap-ds-sections-gap",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim()
  
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

