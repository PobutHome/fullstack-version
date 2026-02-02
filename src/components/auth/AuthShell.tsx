import type { ReactNode } from 'react'

import Link from 'next/link'

import { Container } from '@/components/Container'
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
            <div className="text-sys-text-muted text-sm">
              <Link className="hover:underline" href="/">
                Головна
              </Link>{' '}
              → <span className="text-sys-text">{crumb}</span>
            </div>
          ) : null}

          <div
            className={[
              'w-full max-w-[52rem] mx-auto',
              'bg-sys-surface border border-sys-border-strong rounded-radius-primary',
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

