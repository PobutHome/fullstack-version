import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import "./InnerSection.css"

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
  const innerClassName = `innerSection ${className}`.trim()

  return (
    <div className={innerClassName} style={style} {...props}>
      {children}
    </div>
  )
}


