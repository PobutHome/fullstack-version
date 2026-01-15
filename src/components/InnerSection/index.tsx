import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** Extra classes for the inner wrapper */
  className?: string
  /** Pass-through style for the inner wrapper */
  style?: CSSProperties
}

/**
 * Canonical layout primitive:
 * Section -> Container -> InnerSection (free layout)
 *
 * Use inside a <Container> (or any width-constraining wrapper).
 */
export function InnerSection({ children, className = "", style, ...props }: Props) {
  const innerClassName = `fe-page-section__inner ${className}`.trim()

  const combinedStyle: CSSProperties = {
    // Default vertical rhythm inside InnerSection; override per-instance via style:
    // style={{ ["--fe-inner-gap" as any]: "var(--layout-gap-1)" }}
    ["--fe-inner-gap" as any]: "var(--layout-gap-2)",
    ...style,
  }

  return (
    <div className={innerClassName} style={combinedStyle} {...props}>
      {children}
    </div>
  )
}


