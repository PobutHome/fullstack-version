import type { CSSProperties, HTMLAttributes, ReactNode } from "react"

import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"
import { Section } from "@/components/Section"

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode
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
  innerClassName = "",
  innerStyle,
  ...props
}: Props) {
  return (
    <Section className={className} style={style} {...props}>
      <Container>
        <InnerSection className={innerClassName} style={innerStyle}>
          {children}
        </InnerSection>
      </Container>
    </Section>
  )
}


