'use server'

import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import { ButtonsShowcase } from './ButtonsShowcase'
import { ColorVariablesTable } from './ColorVariablesTable'

export default async function SystemPage() {
  return (
    <Page data-app="frontend" className="pt-space-20 pb-space-50">
      <Section id="hero">
        <Container>
          <InnerSection>
            <h1>System Design</h1>
            <p className="text-sys-text-muted">
              Essential design tokens, layout components, typography, colors, and spacing.
            </p>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Components */}
      <Section id="layout">
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <div>
              <h2>Layout Components</h2>
              <p className="text-sys-text-muted">
                Use these in order:{' '}
                <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
                  Section → Container → InnerSection
                </code>
              </p>
            </div>

            <div className="grid gap-layout-gap-2">
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">Section</h3>
                <p className="text-sys-text-muted mb-space-10">
                  Semantic wrapper:{' '}
                  <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
                    &lt;Section&gt;
                  </code>
                </p>
                <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                  <small className="font-mono text-sys-text-muted">
                    {`className="w-full relative"`}
                  </small>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">Container</h3>
                <p className="text-sys-text-muted mb-space-10">
                  Max-width container with responsive padding:{' '}
                  <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
                    &lt;Container&gt;
                  </code>
                </p>
                <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                  <small className="font-mono text-sys-text-muted">
                    max-w-[100rem] mx-auto px-[clamp(1.25rem,4vw,5rem)]
                  </small>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">InnerSection</h3>
                <p className="text-sys-text-muted mb-space-10">
                  Content wrapper:{' '}
                  <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
                    &lt;InnerSection&gt;
                  </code>
                </p>
                <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                  <small className="font-mono text-sys-text-muted">
                    {`className="w-full min-w-0"`}
                  </small>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Typography */}
      <Section id="typography">
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <div>
              <h2>Typography</h2>
              <p className="text-sys-text-muted">HTML elements and Tailwind utility classes.</p>
            </div>

            <div className="grid gap-layout-gap-2">
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h1 className="mb-space-10">Heading 1</h1>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`<h1> or className="pobut-H1"`}
                    </small>
                  </div>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h2 className="mb-space-10">Heading 2</h2>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`<h2> or className="pobut-H2"`}
                    </small>
                  </div>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">Heading 3</h3>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`<h3> or className="pobut-H3"`}
                    </small>
                  </div>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <p className="mb-space-10">
                  Body text paragraph. Use for regular content and descriptions.
                </p>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`<p> or className="pobut-body"`}
                    </small>
                  </div>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <small className="mb-space-10 block">
                  Small text for captions, labels, and secondary information.
                </small>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`<small> or className="pobut-caption"`}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Colors */}
      <Section id="colors">
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <div>
              <h2>Colors</h2>
              <p className="text-sys-text-muted">
                Semantic color system with background and foreground pairs.
              </p>
            </div>

            <div className="grid gap-layout-gap-2">
              {/* Background */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-bg">
                <div className="grid gap-space-10">
                  <div>
                    <h3 className="text-sys-text">Background</h3>
                    <small className="text-sys-text-muted">Page background</small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      bg-sys-bg / text-sys-text
                    </small>
                  </div>
                </div>
              </div>

              {/* Surface */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <div className="grid gap-space-10">
                  <div>
                    <h3 className="text-sys-text">Surface</h3>
                    <small className="text-sys-text-muted">Card and container backgrounds</small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      bg-sys-surface / text-sys-text
                    </small>
                  </div>
                </div>
              </div>

              {/* Surface 2 */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                <div className="grid gap-space-10">
                  <div>
                    <h3 className="text-sys-text">Surface 2</h3>
                    <small className="text-sys-text-muted">
                      Secondary surface (subtle backgrounds)
                    </small>
                  </div>
                  <div className="bg-sys-surface p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      bg-sys-surface-2 / text-sys-text
                    </small>
                  </div>
                </div>
              </div>

              {/* Accent */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-accent">
                <div className="grid gap-space-10">
                  <div>
                    <h3 className="text-sys-text-on-accent">Accent</h3>
                    <small className="text-sys-text-on-accent opacity-80">
                      Primary actions, buttons, highlights
                    </small>
                  </div>
                  <div className="bg-sys-surface p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      bg-sys-accent / text-sys-text-on-accent
                    </small>
                  </div>
                </div>
              </div>

              {/* Interactive */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-interactive">
                <div className="grid gap-space-10">
                  <div>
                    <h3 className="text-sys-text-on-interactive">Interactive</h3>
                    <small className="text-sys-text-on-interactive opacity-80">
                      Links, clickable elements
                    </small>
                  </div>
                  <div className="bg-sys-surface p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      bg-sys-interactive / text-sys-text-on-interactive
                    </small>
                  </div>
                </div>
              </div>

              {/* Color Variables Table */}
              <ColorVariablesTable />

              {/* States */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <div className="grid gap-space-10">
                  <h3 className="text-sys-text">States</h3>
                  <div className="grid gap-space-10">
                    <div className="bg-sys-success p-space-10 rounded-radius-md">
                      <p className="text-sys-text-on-success">bg-sys-success</p>
                    </div>
                    <div className="bg-sys-warning p-space-10 rounded-radius-md">
                      <p className="text-sys-text-on-warning">bg-sys-warning</p>
                    </div>
                    <div className="bg-sys-danger p-space-10 rounded-radius-md">
                      <p className="text-sys-text-on-danger">bg-sys-danger</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Borders & Radius */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <div className="grid gap-space-10">
                  <h3 className="text-sys-text">Borders</h3>
                  <div className="grid gap-space-10">
                    <p className="text-sys-text-muted">
                      You can use any colors for borders but prefer using those variables:
                      sys-accent, sys-surface-interactive, sys-overlay...
                    </p>
                  </div>

                  <h3 className="text-sys-text">Border Radius (Design Tokens)</h3>
                  <p className="text-sys-text-muted text-sm">
                    Each radius token is optimized for specific UI components and contexts. Choose
                    based on visual hierarchy and component size.
                  </p>
                  <div className="grid gap-space-20">
                    {/* radius-none */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-none)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">
                              --sys-radius-none
                            </div>
                            <small className="text-sys-text-muted">0 (No radius)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-none
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Sharp-cornered elements (rare)</li>
                              <li>Square badges or icons</li>
                              <li>Grid layouts with no softening</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-primary (responsive) */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-primary)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">--sys-radius-primary</div>
                            <small className="text-sys-text-muted">0.625rem (10px) mobile — 1.25rem (20px) tablet+</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-primary
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Card container corners (default card radius)</li>
                              <li>Smaller featured items, image corners</li>
                              <li>InnerSections with their own background</li>
                            </ul>
                            <p className="text-sys-text-muted text-sm mt-space-10">
                              Use `rounded-radius-primary` on card components and responsive containers. It will render as 10px on mobile and 20px on tablet and above.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-sm */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-sm)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">--sys-radius-sm</div>
                            <small className="text-sys-text-muted">0.25rem (4px)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-sm
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Small inputs and form elements</li>
                              <li>Code blocks and inline code</li>
                              <li>Minor UI accents and separators</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-md */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-md)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">--sys-radius-md</div>
                            <small className="text-sys-text-muted">0.5rem (8px)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-md
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Standard buttons and form inputs</li>
                              <li>Cards and containers</li>
                              <li>Default component styling</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-lg */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-lg)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">--sys-radius-lg</div>
                            <small className="text-sys-text-muted">0.75rem (12px)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-lg
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Large cards and modals</li>
                              <li>Featured sections and panels</li>
                              <li>Primary container elements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-xl */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-xl)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">--sys-radius-xl</div>
                            <small className="text-sys-text-muted">1rem (16px)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-xl
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Large modal dialogs</li>
                              <li>Call-to-action sections</li>
                              <li>Hero banners and featured content</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-2xl */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-2xl)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">
                              --sys-radius-2xl
                            </div>
                            <small className="text-sys-text-muted">1.375rem (22px)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-2xl
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Extra-large decorative elements</li>
                              <li>Maximum visual softness for emphasis</li>
                              <li>Standout section containers (rare)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* radius-full */}
                    <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface-2">
                      <div className="grid gap-space-10">
                        <div className="flex items-center gap-space-10">
                          <div
                            className="w-16 h-16 bg-sys-accent flex-shrink-0"
                            style={{ borderRadius: 'var(--sys-radius-full)' }}
                          />
                          <div>
                            <div className="font-mono font-bold text-sys-text">
                              --sys-radius-full
                            </div>
                            <small className="text-sys-text-muted">9999px (Circular)</small>
                          </div>
                        </div>
                        <div className="grid gap-space-10">
                          <div className="bg-sys-surface p-space-10 rounded-radius-sm">
                            <span className="font-mono text-sys-text font-semibold text-base">
                              Tailwind CSS: rounded-radius-full
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sys-text mb-space-10">Use for:</p>
                            <ul className="list-disc list-inside text-sys-text-muted text-sm space-y-1">
                              <li>Avatar circles and profile pictures</li>
                              <li>Badge backgrounds</li>
                              <li>Pill-shaped buttons and tags</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Spacing */}
      <Section id="spacing">
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <div>
              <h2>Spacing</h2>
              <p className="text-sys-text-muted">
                Responsive spacing tokens for gaps, margins, and padding.
              </p>
            </div>

            <div className="grid gap-layout-gap-2">
              {/* Component Spacing */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">Component Spacing</h3>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      space-10: 0.625rem (10px)
                    </small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-20 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      space-20: 1.25rem (20px)
                    </small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-30 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      space-30: 1.875rem (30px) - Tablet+
                    </small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-50 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      space-50: 3.125rem (50px) - Desktop+
                    </small>
                  </div>
                </div>
              </div>

              {/* Layout Gaps */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">
                  gap- layout-gap-1 (Responsive) Mobile 10px → Desktop 20px{' '}
                </h3>
                <p>use layout-gap-1 for responsive gaps in grid layouts.</p>
                <div className="grid gap-layout-gap-1">
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 1</small>
                  </div>
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 2</small>
                  </div>
                </div>
              </div>
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">
                  gap- layout-gap-2 (Responsive) Mobile 20px → Desktop 50px{' '}
                </h3>
                <p>use layout-gap-2 for responsive gaps in grid layouts.</p>
                <div className="grid gap-layout-gap-2">
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 1</small>
                  </div>
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 2</small>
                  </div>
                </div>
              </div>

              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">
                  gap- layout-gap-3 (Responsive) Mobile 20px → Tablet 30px → Desktop 50px{' '}
                </h3>
                <p>use layout-gap-3 for responsive gaps in grid layouts.</p>
                <div className="grid gap-layout-gap-3">
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 1</small>
                  </div>
                  <div className="bg-sys-surface-2 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">item 2</small>
                  </div>
                </div>
              </div>

              {/* Usage Examples */}
              <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
                <h3 className="mb-space-10">Usage Examples</h3>
                <div className="grid gap-space-10">
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`className="gap-layout-gap-2"`} (responsive gap)
                    </small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`className="p-space-20"`} (static padding)
                    </small>
                  </div>
                  <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                    <small className="font-mono text-sys-text-muted">
                      {`className="mt-layout-gap-2"`} (responsive margin-top)
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Buttons */}
      <Section id="buttons">
        <Container>
          <InnerSection className="grid gap-layout-gap-2">
            <div>
              <h2>Buttons</h2>
              <p className="text-sys-text-muted">
                All available button variants, sizes, and states using the Button component.
              </p>
            </div>
            <ButtonsShowcase />
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}
