import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

import { Container } from "@/components/Container"

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  /** Container variant (default: "default") */
  containerVariant?: "default" | "narrow" | "wide"
  /** Extra classes for the inner wrapper */
  innerClassName?: string
  /** Pass-through style for the inner wrapper */
  innerStyle?: CSSProperties
}

/**
 * Canonical layout primitive:
 * Page -> PageSection -> Container -> Inner (free layout)
 */
export function PageSection({
  children,
  className = "",
  style,
  containerVariant = "default",
  innerClassName = "",
  innerStyle,
  ...props
}: Props) {
  const sectionClassName = `fe-page-section ${className}`.trim()
  const innerCombinedClassName = `fe-page-section__inner ${innerClassName}`.trim()

  return (
    <section className={sectionClassName} style={style} {...props}>
      <Container variant={containerVariant}>
        <div className={innerCombinedClassName} style={innerStyle}>
          {children}
        </div>
      </Container>
    </section>
  )
}


