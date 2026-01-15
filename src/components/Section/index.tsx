import type { HTMLAttributes, ReactNode } from "react"

import styles from "./Section.module.css"

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

/**
 * Canonical layout primitive:
 * Page -> Section (semantic wrapper)
 *
 * - Accepts native <section> props (including `id`)
 * - Does NOT enforce Container: use <Container> explicitly inside when needed
 * - Allows full-width siblings in the same section (outside Container)
 */
export function Section({
  children,
  className = "",
  style,
  ...props
}: Props) {
  const sectionClassName = `${styles.root} ${className}`.trim()

  return (
    <section className={sectionClassName} style={style} {...props}>
      {children}
    </section>
  )
}


