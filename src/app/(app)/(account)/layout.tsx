import type { ReactNode } from 'react'

import { headers as getHeaders } from 'next/headers.js'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { RenderParams } from '@/components/RenderParams'
import { AccountNav } from '@/components/AccountNav'
import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <Page className="pb-layout-gap-3">
      <Section>
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <RenderParams />

            <div className="grid gap-space-20 items-start tablet:grid-cols-[18rem_1fr] tablet:gap-[100px] desktop:gap-[150px]">
              {user && (
                <aside className="min-w-0">
                  <AccountNav />
                </aside>
              )}

              <div className="min-w-0">
                <div className="bg-sys-surface border border-sys-border-strong rounded-radius-primary p-space-20 tablet:p-space-30">
                  {children}
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}
