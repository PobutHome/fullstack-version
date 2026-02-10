import type { ReactNode } from 'react'

import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'

type Props = {
  title: ReactNode
  /** Optional breadcrumb label after "Головна" */
  crumb?: string
  children: ReactNode
}

/**
 * Auth pages shell (centered card with green border) – matches provided UI screenshots.
 */
export function AuthShell({ title, crumb, children }: Props) {
  return (
    <Section className="pt-layout-gap-3 pb-layout-gap-3">
      <Container>
        <InnerSection className="grid gap-space-20">
          {crumb ? (
            <Breadcrumbs items={[{ label: 'Головна', href: '/' }, { label: crumb }]} />
          ) : null}

          <div
            className={[
              'w-full max-w-208 mx-auto',
              'bg-sys-surface border border-sys-accent rounded-radius-primary',
              'shadow-shadow-sm',
              'p-space-20 tablet:p-space-30',
            ].join(' ')}
          >
            <h1 className="pobut-H2 text-center mb-space-20">{title}</h1>
            {children}
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}

