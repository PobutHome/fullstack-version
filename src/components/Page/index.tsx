import { Container } from "@/components/Container"
import type { HTMLAttributes, ReactNode } from "react"

type ContainerVariant = "default" | "narrow" | "wide"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** Container variant (default: "default"). Set to null to disable container wrapper. */
  containerVariant?: ContainerVariant | null
}

export function Page({
  containerVariant = "default",
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
      {containerVariant !== null ? (
        <Container variant={containerVariant}>
          {children}
        </Container>
      ) : (
        children
      )}
    </div>
  )
}

