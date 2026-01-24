"use server"

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"
import { Page } from "@/components/Page"
import { Section } from "@/components/Section"
import styles from "./design-system.module.css"

function DsCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`fe-card ${styles.card} ${className}`.trim()}>{children}</div>
}

function DsCodeBlock({ children }: { children: string }) {
  return <pre className={styles.codeBlock}><small>{children}</small></pre>
}

export default async function DesignSystemPage() {
  return (
    <Page data-app="frontend" className={styles.page}>
      {/* Hero Section */}
      <Section id="hero">
        <Container>
          <InnerSection>
            <h1>Design System</h1>
            <p>
              Complete reference guide for all design tokens, components, and utilities
              used in the frontend application.
            </p>
            <div className={`${styles.textSpacing} mt-layout-gap-1`}>
              <small>
                All styles are scoped to{" "}
                <code className={styles.inlineCodePill}>
                  data-app="frontend"
                </code>
              </small>
              <small>
                Customize values in:{" "}
                <code className={styles.inlineCodePill}>
                  src/app/styles/
                </code>
              </small>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Conventions & Navigation (read this first) */}
      <Section id="conventions">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Conventions (Read This First)</h2>
            <small className="mb-layout-gap-2 block">
              The goal is "fast changes with zero guessing": one way to build layouts, one
              way to apply spacing, one place to edit tokens.
            </small>

            <DsCard>
              <div className={styles.gridGap1}>
                <h3>Table of contents</h3>
                <div
                  className={styles.wrapRow}
                >
                  {[
                    ["Conventions", "conventions"],
                    ["Layout", "layout"],
                    ["Layout Recipes", "layout-recipes"],
                    ["Typography", "typography"],
                    ["Colors", "colors"],
                    ["Spacing", "spacing"],
                    ["Buttons", "buttons"],
                    ["Links", "links"],
                    ["Inputs", "inputs"],
                    ["Cards", "cards"],
                    ["Badges", "badges"],
                    ["Navigation", "navigation"],
                    ["Layout helpers", "layout-helpers"],
                    ["Layout components", "layout-components"],
                    ["Quick reference", "quick-reference"],
                  ].map(([label, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`fe-link ${styles.pillLink}`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.gridGap2}>
                <div className={styles.gridGap1}>
                  <h3>Layout convention (canonical)</h3>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    <small>
                      <strong>✅ Always compose pages like this:</strong>{" "}
                      <code>{`<Page data-app="frontend">`}</code> →{" "}
                      <code>{`<Section id="...">`}</code> → <code>{`<Container>`}</code> →{" "}
                      <code>{`<InnerSection>`}</code>
                    </small>
                    <small>
                      <strong>✅ Use semantic blocks:</strong> each top-level <code>{`<Section>`}</code>{" "}
                      must have an <code>id</code> for anchors + predictable DOM.
                    </small>
                    <small>
                      <strong>✅ Use rhythm variables:</strong> page rhythm via{" "}
                      <code>--fe-page-gap</code>, inner rhythm via <code>--fe-inner-gap</code>.
                    </small>
                    <small>
                      <strong>❌ Avoid hardcoded spacing:</strong> don't sprinkle <code>px</code>{" "}
                      values in layouts; use tokens like <code>var(--layout-gap-2)</code> and{" "}
                      <code>var(--space-20)</code>.
                    </small>
                    <small>
                      <strong>When to use PageSection:</strong> use <code>{`<PageSection>`}</code>{" "}
                      when your section is <em>always</em> contained (no full-width siblings).
                      Use <code>{`<Section>`}</code> when you need a full-width background/band and a
                      contained inner area inside it.
                    </small>
                  </div>
                </div>

                <div className={styles.gridGap1}>
                  <h3>Where do styles go?</h3>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    <small>
                      <strong>Important (Next.js rule):</strong> plain global <code>.css</code> files can't be
                      imported from arbitrary components. If you want per-component CSS next to
                      a component, use a colocated <strong>CSS file</strong>: <code>Component.css</code> (imported by that component).
                    </small>
                    <small>
                      <strong>Design tokens (source of truth):</strong>{" "}
                      <code>src/app/styles/*-tokens.css</code> (palette, semantic, spacing, fonts, etc.)
                    </small>
                    <small>
                      <strong>Reusable UI patterns:</strong> grouped global styles in{" "}
                      <code>src/app/styles/&lt;Group&gt;/*.css</code> (links/cards/badges/nav/header/etc). These
                      are imported once by <code>src/app/(app)/globals.css</code>.
                    </small>
                    <small>
                      <strong>Per-component styles (colocated):</strong> <code>src/components/*/Component.css</code>
                      imported by the component (best for styles used by only that component).
                    </small>
                    <small>
                      <strong>Component code:</strong> <code>src/components/*</code> (React primitives like{" "}
                      <code>Page</code>, <code>Container</code>, <code>InnerSection</code>, <code>Button</code>)
                    </small>
                    <small>
                      <strong>Rule of thumb:</strong> if a style is reused across 2+ routes, it must live
                      in the design system styles (not inside a route).
                    </small>
                  </div>
                </div>

                <div className={styles.gridGap1}>
                  <h3>CSS Modules example (recommended)</h3>
                  <pre className={styles.codeBlock}>
                    <small>{`// src/components/MyCard/MyCard.css
.root {
  background: var(--sys-card-bg);
  border: 1px solid var(--sys-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20);
}

// src/components/MyCard/index.tsx
import "./MyCard.css"

export function MyCard({ children }: { children: React.ReactNode }) {
  return <div className="root">{children}</div>
}`}</small></pre>
                  <div className={styles.muted}>
                    <small>
                    This keeps styles "in the component folder" while still using the same tokens as the
                    global design system.
                    </small>
                  </div>
                </div>
              </div>
            </DsCard>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Section */}
      <Section id="layout">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Layout</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>
              Canonical structure rules that should be used across the whole app. The
              goal: consistent spacing, consistent max-width, and predictable DOM.
            </small>

        <div
          className="fe-card baseGap p-space-20 grid"
        >
          <div className="grid gap-layout-gap-1">
            <h3>Rules</h3>
            <div className="grid gap-layout-gap-1">
              <small><strong>1)</strong> Every page starts with <code>{`<Page data-app="frontend">`}</code> — the page is the shell.</small>
              <small><strong>2)</strong> Pages are composed of top-level <code>{`<Section id="...">`}</code> blocks (semantic, supports anchors via <code>id</code>).</small>
              <small><strong>3)</strong> Use explicit <code>{`<Container>`}</code> + <code>{`<InnerSection>`}</code> inside each <code>{`<Section>`}</code>.</small>
              <small><strong>4)</strong> For custom layouts, use CSS vars/tokens directly (e.g. <code>gap: var(--layout-gap-2)</code>, <code>padding: var(--space-20)</code>).</small>
              <small><strong>5)</strong> Avoid ad-hoc hardcoded pixel spacing—use system tokens so spacing stays consistent across routes.</small>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-layout-gap-2">
            {/* Visual demo */}
            <div className="fe-gap-tight grid">
              <p><strong>Visual: Page → Section → Container → Inner</strong></p>
              <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
                <div className="grid gap-layout-gap-1">
                  <small><strong>Page</strong> (full width)</small>
                  <div className="p-space-20 bg-sys-surface rounded-radius-lg border border-dashed border-sys-border">
                    <small><strong>Section</strong> (vertical rhythm / background / semantics)</small>
                    <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
                      <small><strong>Container</strong> (centered + max-width + padding-inline)</small>
                      <div className={styles.demoInnerBox}>
                        <small><strong>Inner</strong> (any layout)</small>
                        <div className={styles.mutedMore}>
                          <small>Cards, forms, grids, tables, etc.</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code demo */}
            <div className="grid gap-layout-gap-1">
              <p><strong>Code</strong></p>
                <DsCodeBlock>{`import { Page } from "@/components/Page"
import { Section } from "@/components/Section"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"

export default function ExamplePage() {
  return (
    <Page
      data-app="frontend"
      className="pt-space-20 pb-space-50"
    >
      <Section id="hero">
        {/* Optional: full-width content can live here */}
        <Container>
          <InnerSection>
            <h1>Title</h1>
            <p>Subtitle</p>
          </InnerSection>
        </Container>
      </Section>

      <Section id="content">
        <Container>
          <InnerSection>
            <h2>Section</h2>
            <div
              className="fe-card"
              style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
            >
              {/* inner components (any layout) */}
            </div>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}`}</DsCodeBlock>
              <div className={styles.mutedMore}>
                <small>
                  Uses: <code>{`<Section>`}</code> (semantic + <code>id</code>) with explicit{" "}
                  <code>{`<Container>`}</code> + <code>{`<InnerSection>`}</code> to enforce the canonical DOM, and
                  system tokens (CSS vars) for spacing.
                </small>
              </div>
            </div>
          </div>

        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Recipes Section */}
      <Section id="layout-recipes">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Layout Recipes (Copy/Paste)</h2>
            <small className="mb-layout-gap-2 block">
              These are the only "approved" layout patterns. If a page needs something else,
              we add a new layout primitive (don't freestyle per-page).
            </small>

            <div
              className="fe-card p-space-20 grid gap-layout-gap-2"
            >
              <div className="grid gap-layout-gap-1">
                <h3>Recipe A: Standard page sections</h3>
                <pre
                  className={styles.codeBlock}
                >{`import { Page } from "@/components/Page"
import { Section } from "@/components/Section"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"

export default function MyPage() {
  return (
    <Page data-app="frontend">
      <Section id="hero">
        <Container>
          <InnerSection>
            {/* hero content */}
          </InnerSection>
        </Container>
      </Section>

      <Section id="content">
        <Container>
          <InnerSection>
            {/* main content */}
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}`}</pre>
                <div className={styles.muted}>
                  <small>
                    If you need a tighter/looser stack inside InnerSection, override{" "}
                    <code>--fe-inner-gap</code>:{" "}
                    <code>{`style={{ ["--fe-inner-gap" as any]: "var(--layout-gap-1)" }}`}</code>
                  </small>
                </div>
              </div>

              <div className="grid gap-layout-gap-1">
                <h3>Recipe B: Full-width band + contained content</h3>
                <pre
                  className={styles.codeBlock}
                >{`<Section id="promo" style={{ background: "var(--sys-surface-accent)" }}>
  {/* full width background/band */}
  <Container>
    <InnerSection>
      {/* constrained content */}
    </InnerSection>
  </Container>
</Section>`}</pre>
              </div>

              <div className={styles.muted}>
                <small>
                  Sidebar layout primitives were intentionally removed from this project to keep the
                  layout system small and predictable. If we need sidebars later, we'll add a single
                  new primitive with a documented recipe here.
                </small>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section id="typography">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Typography</h2>
            <small className="mb-layout-gap-2 block">
              Font: Unbounded | Responsive sizes: Mobile → Tablet (48rem) → Desktop
              (64rem) | Styles are applied directly to HTML tags (h1, h2, h3, p, small)
            </small>
        
        <div
          className="fe-card p-space-20 grid gap-layout-gap-2"
        >
          <div className="grid gap-layout-gap-1">
            <div>
              <h1>Heading 1 — Unbounded Bold</h1>
              <small style={{ marginTop: "0.5rem", display: "block" }}>
                Mobile: 1.25rem (20px) | Tablet: 2rem (32px) | Desktop: 2.5rem (40px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h1&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <h2>Heading 2 — Unbounded Regular</h2>
              <small style={{ marginTop: "0.5rem", display: "block" }}>
                Mobile: 1rem (16px) | Tablet: 1.5rem (24px) | Desktop: 2rem (32px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h2&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <h3>Heading 3 — Unbounded Bold</h3>
              <small style={{ marginTop: "0.5rem", display: "block" }}>
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h3&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <p>Body — Unbounded Regular</p>
              <small style={{ marginTop: "0.5rem", display: "block" }}>
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;p&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <small>Caption — Unbounded Regular (Muted Color)</small>
              <small style={{ marginTop: "0.5rem", display: "block" }}>
                Mobile: 0.4375rem (7px) | Tablet: 0.5625rem (9px) | Desktop: 0.625rem (10px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3% | Color: Muted (65% opacity)
                <br />
                Use: <code>&lt;small&gt;</code> or <code>&lt;p className="caption"&gt;</code> | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Colors Section */}
      <Section id="colors">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Colors</h2>
            <small className="mb-layout-gap-2 block">Brand colors, semantic tokens, and text colors</small>
        
        <div
          className="fe-card p-space-20 grid gap-layout-gap-2"
        >
          <div>
            <h3 className="mb-space-20">Brand Colors</h3>
            <small className="mb-space-20 block">All raw brand colors from Figma. These are the source of truth for your brand palette.</small>
            
            <div className="grid gap-layout-gap-2">
              <div>
                <h4 className="mb-space-20">Blue (Primary Brand Color)</h4>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-layout-gap-2">
                  <div className="grid gap-layout-gap-1">
                    <div className="h-16 bg-color-blue rounded-radius-lg" />
                    <small>
                      <strong>Blue:</strong> #00004c<br />
                      <code>var(--color-blue)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-blue-hover)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Blue Hover:</strong> #3b3bf9<br />
                      <code>var(--color-blue-hover)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-blue-click)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Blue Click:</strong> #00001f<br />
                      <code>var(--color-blue-click)</code>
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: "var(--space-20)" }}>Green (Accent Brand Color)</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Green:</strong> #72cb1a<br />
                      <code>var(--color-green)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green-hover)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Green Hover:</strong> #beff7e<br />
                      <code>var(--color-green-hover)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green-click)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Green Click:</strong> #408000<br />
                      <code>var(--color-green-click)</code>
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: "var(--space-20)" }}>Neutral Colors</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-white)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>White:</strong> #ffffff<br />
                      <code>var(--color-white)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-black)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Black:</strong> #000000<br />
                      <code>var(--color-black)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-neutral-border)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Neutral Border:</strong> #e5e7eb<br />
                      <code>var(--color-neutral-border)</code>
                    </small>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-default-background)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Default Background:</strong> #ffffff<br />
                      <code>var(--color-default-background)</code>
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: "var(--space-20)" }}>Status Colors</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-error)", borderRadius: "var(--radius-lg)" }} />
                    <small>
                      <strong>Error:</strong> #ff0000<br />
                      <code>var(--color-error)</code>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            
            <small style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", display: "block" }}>
              <strong>Note:</strong> These are raw palette tokens. They should NOT be used directly in components.
              <br />
              Use semantic tokens instead (e.g., <code>--sys-accent</code> instead of <code>--color-green</code>).
              <br />
              Edit: <code>src/app/styles/palette-tokens.css</code>
            </small>
          </div>

          <div style={{ display: "grid", gap: "var(--layout-gap-3, var(--layout-gap-2))" }}>
            <h3 style={{ marginBottom: "var(--space-20)" }}>Semantic Colors</h3>
            <small>All semantic tokens reference palette tokens. Edit: <code>src/app/styles/semantic-tokens.css</code></small>
            
            {/* Interactive Colors (Blue) */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Interactive (Blue - Links, Clickable Text)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Interactive:</strong> Blue<br />
                    <code>var(--sys-interactive)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive-hover)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Interactive Hover:</strong><br />
                    <code>var(--sys-interactive-hover)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive-active)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Interactive Active:</strong><br />
                    <code>var(--sys-interactive-active)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* Accent Colors (Green) */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Accent (Green - Primary Actions, Buttons)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Accent (Primary):</strong> Bright Green<br />
                    <code>var(--sys-accent)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-hover)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Accent Hover:</strong><br />
                    <code>var(--sys-accent-hover)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-active)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Accent Active:</strong><br />
                    <code>var(--sys-accent-active)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Accent Secondary:</strong> Light Pastel<br />
                    <code>var(--sys-accent-secondary)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-tertiary)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Accent Tertiary:</strong> Dark Olive<br />
                    <code>var(--sys-accent-tertiary)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* Surfaces */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Surfaces (Backgrounds)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Surface:</strong> White<br />
                    <code>var(--sys-surface)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-2)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Surface 2:</strong> Alternative<br />
                    <code>var(--sys-surface-2)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-accent)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Surface Accent:</strong> Green BG<br />
                    <code>var(--sys-surface-accent)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Surface Interactive:</strong> Blue BG<br />
                    <code>var(--sys-surface-interactive)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Text Colors</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-inverse)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p>Text</p>
                  </div>
                  <small>
                    <strong>Text:</strong> Blue<br />
                    <code>var(--sys-text)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text-muted)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <small>
                    <strong>Text Muted:</strong> 65% opacity<br />
                    <code>var(--sys-text-muted)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text-subtle)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <small>
                    <strong>Text Subtle:</strong> 40% opacity<br />
                    <code>var(--sys-text-subtle)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-on-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p>On Accent</p>
                  </div>
                  <small>
                    <strong>Text On Accent:</strong> White<br />
                    <code>var(--sys-text-on-accent)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* Borders */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Borders</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Border:</strong> Neutral Gray<br />
                    <code>var(--sys-border)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Border Strong:</strong> Green<br />
                    <code>var(--sys-border-strong)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Border Interactive:</strong> Blue<br />
                    <code>var(--sys-border-interactive)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-subtle)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Border Subtle:</strong> 60% opacity<br />
                    <code>var(--sys-border-subtle)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>States (Error, Warning, Success)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-danger)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Danger:</strong> Red<br />
                    <code>var(--sys-danger)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-warning)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Warning:</strong> Orange<br />
                    <code>var(--sys-warning)</code>
                  </small>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-success)", borderRadius: "var(--radius-lg)" }} />
                  <small>
                    <strong>Success:</strong> Green<br />
                    <code>var(--sys-success)</code>
                  </small>
                </div>
              </div>
            </div>

            {/* Component-Specific */}
            <div>
              <h4 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Component-Specific Tokens</h4>
              <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
                <div>
                  <p style={{ marginBottom: "var(--space-10)" }}><strong>Buttons:</strong></p>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <small><code>--sys-btn-primary-bg</code> → Primary Button background</small>
                    <small><code>--sys-btn-secondary-bg</code> → Secondary Button background</small>
                    <small><code>--sys-btn-tertiary-bg</code> → Tertiary Button background</small>
                    <small><code>--sys-btn-outline-border</code> → Outline Button border</small>
                    <small><code>--sys-btn-interactive-border</code> → Interactive Button border</small>
                  </div>
                </div>
                <div>
                  <p style={{ marginBottom: "var(--space-10)" }}><strong>Inputs:</strong></p>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <small><code>--sys-input-border</code> → Input border</small>
                    <small><code>--sys-input-border-hover</code> → Input border hover</small>
                    <small><code>--sys-input-border-focus</code> → Input border focus</small>
                    <small><code>--sys-input-bg</code> → Input background</small>
                    <small><code>--sys-input-fg</code> → Input text color</small>
                  </div>
                </div>
                <div>
                  <p style={{ marginBottom: "var(--space-10)" }}><strong>Cards:</strong></p>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <small><code>--sys-card-bg</code> → Card background</small>
                    <div><code>--sys-card-border</code> → Card border</div>
                    <div><code>--sys-card-bg-hover</code> → Card hover background</div>
                  </div>
                </div>
                <div>
                  <p style={{ marginBottom: "var(--space-10)" }}><strong>Navigation:</strong></p>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <small><code>--sys-nav-bg</code> → Navigation background</small>
                    <small><code>--sys-nav-link</code> → Navigation link color</small>
                    <small><code>--sys-nav-link-hover</code> → Navigation link hover</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Spacing Section */}
      <Section id="spacing">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Spacing System</h2>
            <p style={{ marginBottom: "var(--layout-gap-2)" }}>
              Complete guide to using spacing tokens and utilities. All spacing is mobile-first and responsive.
            </p>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>
              <strong>Mobile-First Approach:</strong> Base styles are for mobile, then enhanced for Tablet (≥48rem / 768px) and Desktop (≥64rem / 1024px).
            </small>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          {/* Figma Spacing Reference */}
          <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-20)" }}>
            <h3 style={{ marginBottom: "var(--space-20)" }}>Figma Design Spacing Reference</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <p><strong>Desktop:</strong> Margin 150px | Spacing 20px/50px</p>
              <p><strong>Tablet:</strong> Margin 50px | Spacing 10px/20px/30px</p>
              <p><strong>Mobile:</strong> Margin 10px | Spacing 10px/20px</p>
              <small style={{ marginTop: "var(--space-10)", display: "block" }}>
                <strong>What this means:</strong>
                <br />
                • <strong>Margin</strong> = Layout margin token (available for custom use, not used by Page component)
                <br />
                • <strong>Spacing</strong> = Vertical gaps between elements (sections, cards, etc.)
              </small>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)" }}>Component Spacing Scale</h3>
            <small style={{ marginBottom: "var(--space-20)", display: "block" }}>Raw spacing values for component-level padding/margins</small>
            <div className="fe-gap-tight" style={{ display: "grid" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-10)", height: "var(--space-10)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <p><code>--space-10</code>: 0.625rem (10px)</p>
                  <small>Use: <code>padding: var(--space-10)</code></small>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-20)", height: "var(--space-20)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <p><code>--space-20</code>: 1.25rem (20px)</p>
                  <small>Use: <code>padding: var(--space-20)</code></small>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-30)", height: "var(--space-30)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <p><code>--space-30</code>: 1.875rem (30px) - Tablet only</p>
                  <small>Use: <code>padding: var(--space-30)</code></small>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-50)", height: "var(--space-50)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <p><code>--space-50</code>: 3.125rem (50px) - Desktop only</p>
                  <small>Use: <code>padding: var(--space-50)</code></small>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)" }}>Layout Spacing (From Figma)</h3>
            <small style={{ marginBottom: "var(--space-20)", display: "block" }}>These values match your Figma design specifications</small>
            
            <div className="baseGap" style={{ display: "grid" }}>
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}><code>--layout-margin</code>: Layout margin token (available for custom use)</p>
                <div className="fe-gap-tight" style={{ paddingLeft: "var(--space-20)", display: "grid" }}>
                  <small>📱 <strong>Mobile:</strong> 0.625rem (10px)</small>
                  <small>📱 <strong>Tablet:</strong> 3.125rem (50px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 9.375rem (150px)</small>
                  <small style={{ marginTop: "var(--space-10)" }}>
                    <strong>Note:</strong> Page component no longer uses this padding. Use Container component for width constraints.
                  </small>
                </div>
              </div>
              
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-1</code>: Small vertical spacing</p>
                <div className="fe-gap-tight" style={{ paddingLeft: "var(--space-20)", display: "grid" }}>
                  <small>📱 <strong>Mobile:</strong> 0.625rem (10px)</small>
                  <small>📱 <strong>Tablet:</strong> 0.625rem (10px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 1.25rem (20px)</small>
                  <small style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-1)</code> (flex/grid) or set <code>--fe-inner-gap</code> for InnerSection rhythm
                  </small>
                </div>
              </div>
              
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-2</code>: Medium vertical spacing</p>
                <div className="fe-gap-tight" style={{ paddingLeft: "var(--space-20)", display: "grid" }}>
                  <small>📱 <strong>Mobile:</strong> 1.25rem (20px)</small>
                  <small>📱 <strong>Tablet:</strong> 1.25rem (20px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 3.125rem (50px)</small>
                  <small style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-2)</code> (flex/grid) or use the default InnerSection rhythm
                  </small>
                </div>
              </div>
              
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-3</code>: Large vertical spacing (Tablet+)</p>
                <div style={{ paddingLeft: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
                  <small>📱 <strong>Mobile:</strong> Not available (falls back to gap-2)</small>
                  <small>📱 <strong>Tablet:</strong> 1.875rem (30px)</small>
                  <small>🖥️ <strong>Desktop:</strong> Falls back to gap-2 (50px)</small>
                  <small style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-3)</code> (flex/grid) or adjust <code>--fe-page-gap</code> for page-level spacing
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <h4 style={{ marginBottom: "var(--space-20)" }}>Visual Example: How These Are Used</h4>
            <div className="baseGap" style={{ display: "grid" }}>
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}>1. <strong>Page Container</strong> (uses <code>--layout-margin</code>):</p>
                <div style={{ padding: "var(--space-10)", background: "var(--sys-surface)", border: "2px dashed var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-block", padding: "var(--space-10) var(--space-20)", background: "var(--sys-accent)", color: "var(--sys-text-inverse)", borderRadius: "var(--radius-lg)" }}>
                      Page Content Area
                    </div>
                    <small style={{ marginTop: "var(--space-10)", display: "block" }}>
                      ← <code>--layout-margin</code> (10px/50px/150px) → 
                    </small>
                  </div>
                </div>
              </div>
              
              <div>
                <p style={{ marginBottom: "var(--space-10)" }}>2. <strong>Vertical Stacking</strong> (uses <code>--layout-gap-*</code>):</p>
                <div style={{ padding: "var(--space-10)", background: "var(--sys-surface)", border: "2px dashed var(--sys-border-strong)", borderRadius: "var(--radius-lg)", display: "grid", gap: "var(--layout-gap-2)" }}>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }}><small>Section 1</small></div>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }}><small>Section 2</small></div>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }}><small>Section 3</small></div>
                  <small style={{ textAlign: "center", marginTop: "var(--space-10)", display: "block" }}>
                    Gap between sections = <code>--layout-gap-2</code> (20px/20px/50px)
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Semantic InnerSection vertical gap helper */}
          <div
            style={{
              marginTop: "var(--space-20)",
              padding: "var(--space-20)",
              background: "var(--sys-surface-2)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <h4 style={{ marginBottom: "var(--space-20)" }}>
              Semantic InnerSection Gap (Y axis)
            </h4>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div className="fe-gap-base" style={{ display: "grid" }}>
                <small>
                  <strong>Token:</strong> <code>--ds-inner-section-gap-y</code> — vertical distance between stacked
                  blocks (e.g. InnerSections).
                </small>
                <small>
                  Mobile: 20px (0.625rem) | Tablet: 30px (1.875rem) | Desktop: 50px (3.125rem)
                </small>
                <small>
                  <strong>Utility class:</strong> <code>fe-gap-inner-section-y</code> — applies{" "}
                  <code>margin-top: var(--ds-inner-section-gap-y)</code>.
                </small>
                <small>
                  <strong>Edit:</strong>{" "}
                  <code>src/app/styles/Spacing/spacing-tokens.css</code> (token) and{" "}
                  <code>src/app/styles/Spacing/spacing.css</code> (utility class).
                </small>
              </div>

              {/* Mini demo */}
              <div
                style={{
                  marginTop: "var(--space-20)",
                  padding: "var(--space-20)",
                  background: "var(--sys-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px dashed var(--sys-border)",
                  display: "grid",
                  gap: "var(--layout-gap-2)",
                }}
              >
                <p>Example: two InnerSections with semantic gap (via class, no inline spacing)</p>
                <div
                  style={{
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--sys-border)",
                    padding: "var(--space-20)",
                    display: "grid",
                    gap: "var(--layout-gap-1)",
                  }}
                >
                  <InnerSection>
                    <small>First InnerSection (no extra margin on top)</small>
                  </InnerSection>
                  <InnerSection className="marginSections">
                    <small>
                      Second InnerSection with <code>className="fe-gap-inner-section-y"</code> — the space between
                      these two blocks is driven by <code>--ds-inner-section-gap-y</code> (20 / 30 / 50px in rem).
                    </small>
                  </InnerSection>
                </div>

                <DsCodeBlock>{`// Semantic vertical gap between stacked sections
// Token (responsive):
//   --ds-inner-section-gap-y → 20px / 30px / 50px in rem

// Utility class (global):
// src/app/styles/Spacing/spacing.css
[data-app="frontend"] .marginSections {
  margin-top: var(--ds-inner-section-gap-y);
}

// Usage in JSX
<InnerSection>
  {/* first block */}
</InnerSection>
<InnerSection className="marginSections">
  {/* second block, offset on Y axis by the token */}
</InnerSection>`}</DsCodeBlock>
              </div>
            </div>
          </div>

          {/* Comprehensive Usage Guide */}
          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <h4 style={{ marginBottom: "var(--space-20)" }}>How to Use Spacing in Your Components</h4>
            
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              {/* 1. Between Sections */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>1. Spacing Between Sections</h5>
                <small style={{ marginBottom: "var(--space-10)", display: "block" }}>
                  Use <code>fe-gap-inner-section-y</code> class on InnerSection components to create consistent vertical spacing between sections.
                </small>
                <DsCodeBlock>{`// ✅ Correct: Use utility class
<Section id="hero">
  <Container>
    <InnerSection>
      {/* First section - no spacing needed */}
    </InnerSection>
  </Container>
</Section>

<Section id="content">
  <Container>
    <InnerSection className="fe-gap-inner-section-y">
      {/* Subsequent sections - add spacing class */}
    </InnerSection>
  </Container>
</Section>

// The spacing is responsive:
// Mobile: 20px | Tablet: 30px | Desktop: 50px`}</DsCodeBlock>
              </div>

              {/* 2. Component Padding */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>2. Component Padding</h5>
                <small style={{ marginBottom: "var(--space-10)", display: "block" }}>
                  Use <code>--space-*</code> tokens for component-level padding (cards, buttons, inputs, etc.).
                </small>
                <DsCodeBlock>{`// ✅ Correct: Use space tokens
.fe-card {
  padding: var(--space-20);  /* 20px on all screens */
}

.fe-button {
  padding: var(--space-10) var(--space-20);  /* 10px vertical, 20px horizontal */
}

// Available tokens:
// --space-10: 10px (all screens)
// --space-20: 20px (all screens)
// --space-30: 30px (tablet+ only)
// --space-50: 50px (desktop only)`}</DsCodeBlock>
              </div>

              {/* 3. Layout Gaps */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>3. Layout Gaps (Flex/Grid)</h5>
                <small style={{ marginBottom: "var(--space-10)", display: "block" }}>
                  Use <code>--layout-gap-*</code> tokens for gaps in flex/grid containers. These are responsive.
                </small>
                <DsCodeBlock>{`// ✅ Correct: Use layout gap tokens
.container {
  display: grid;
  gap: var(--layout-gap-2);  /* Responsive: 20px / 20px / 50px */
}

// Or use utility classes:
<div className="gap-1">  {/* Small gap: 10px / 10px / 20px */}
<div className="gap-2">  {/* Medium gap: 20px / 20px / 50px */}
<div className="gap-3">  {/* Large gap: fallback / 30px / fallback */}

// Available tokens:
// --layout-gap-1: Small (10px / 10px / 20px)
// --layout-gap-2: Medium (20px / 20px / 50px)
// --layout-gap-3: Large (fallback / 30px / fallback)`}</DsCodeBlock>
              </div>

              {/* 4. Vertical Stacking */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>4. Vertical Stacking (Stack Utilities)</h5>
                <small style={{ marginBottom: "var(--space-10)", display: "block" }}>
                  Use <code>stack-*</code> utility classes for automatic vertical spacing between direct children.
                </small>
                <DsCodeBlock>{`// ✅ Correct: Use stack utilities
<div className="stack-1">
  <div>First item</div>
  <div>Second item</div>  {/* margin-top: var(--layout-gap-1) */}
  <div>Third item</div>   {/* margin-top: var(--layout-gap-1) */}
</div>

<div className="stack-2">
  <div>First item</div>
  <div>Second item</div>  {/* margin-top: var(--layout-gap-2) */}
  <div>Third item</div>   {/* margin-top: var(--layout-gap-2) */}
</div>

// Available classes:
// .stack-1: Small spacing (10px / 10px / 20px)
// .stack-2: Medium spacing (20px / 20px / 50px)
// .stack-3: Large spacing (fallback / 30px / fallback)`}</DsCodeBlock>
              </div>

              {/* 5. Page Top Padding */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>5. Page Top Padding</h5>
                <small style={{ marginBottom: "var(--space-10)", display: "block" }}>
                  The Page component automatically applies responsive top padding using <code>--ds-inner-section-gap-y</code>.
                </small>
                <DsCodeBlock>{`// ✅ Correct: Page component handles top padding
<Page data-app="frontend">
  {/* Automatically has padding-top: 20px / 30px / 50px */}
  <Section id="hero">
    {/* Your content */}
  </Section>
</Page>

// The padding is defined in:
// src/components/Page/Page.css
// Uses: padding-top: var(--ds-inner-section-gap-y)`}</DsCodeBlock>
              </div>

              {/* Common Mistakes */}
              <div>
                <h5 style={{ marginBottom: "var(--space-10)" }}>❌ Common Mistakes to Avoid</h5>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <small><strong>1. Don't use hardcoded pixel values:</strong></small>
                  <small style={{ paddingLeft: "var(--space-20)" }}>
                    ❌ <code>padding: 20px</code><br />
                    ✅ <code>padding: var(--space-20)</code>
                  </small>
                  
                  <small><strong>2. Don't mix spacing systems:</strong></small>
                  <small style={{ paddingLeft: "var(--space-20)" }}>
                    ❌ <code>gap: 20px</code> when you should use <code>gap: var(--layout-gap-2)</code><br />
                    ✅ Use <code>--space-*</code> for padding/margin, <code>--layout-gap-*</code> for gaps
                  </small>
                  
                  <small><strong>3. Don't forget responsive spacing:</strong></small>
                  <small style={{ paddingLeft: "var(--space-20)" }}>
                    ❌ Fixed spacing that doesn't adapt to screen size<br />
                    ✅ Use responsive tokens that change at breakpoints
                  </small>
                  
                  <small><strong>4. Don't add spacing to first InnerSection:</strong></small>
                  <small style={{ paddingLeft: "var(--space-20)" }}>
                    ❌ <code>&lt;InnerSection className="fe-gap-inner-section-y"&gt;</code> on first section<br />
                    ✅ Only add spacing class to subsequent sections
                  </small>
                </div>
              </div>
            </div>
          </div>

          <small style={{ marginTop: "var(--space-20)", display: "block" }}>
            <strong>Edit tokens:</strong> <code>src/app/styles/Spacing/spacing-tokens.css</code><br />
            <strong>Edit utilities:</strong> <code>src/app/styles/Spacing/spacing.css</code>
          </small>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section id="buttons">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Buttons</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>
              All Buttons use rounded pill shape (border-radius: 9999px). All use semantic
              tokens from <code>semantic-tokens.css</code>
            </small>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          <div>
            <h3 style={{ marginBottom: "var(--space-20)" }}>Add to Cart Buttons (Додати в кошик)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="add-to-cart-outline">Додати в кошик</Button>
                  <Button variant="add-to-cart-outline" disabled>Додати в кошик</Button>
                </div>
                <small>
                  <code>variant="add-to-cart-outline"</code> or <code>className="fe-btn fe-btn--add-to-cart-outline"</code>
                  <br />
                  Background: Transparent | Border: Bright Green | Text: Bright Green
                  <br />
                  Hover: Lighter green | Active: Darker green
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="add-to-cart-filled">Додати в кошик</Button>
                  <Button variant="add-to-cart-filled" disabled>Додати в кошик</Button>
                </div>
                <small>
                  <code>variant="add-to-cart-filled"</code> or <code>className="fe-btn fe-btn--add-to-cart-filled"</code>
                  <br />
                  Background: Dark Green (#408000) | Text: White
                  <br />
                  Hover: Bright green | Active: Dark green
                </small>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Buy Buttons (Купити)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-primary">Купити</Button>
                  <Button variant="buy-primary" disabled>Купити</Button>
                </div>
                <small>
                  <code>variant="buy-primary"</code> or <code>className="fe-btn fe-btn--buy-primary"</code>
                  <br />
                  Background: Bright Lime Green (#72cb1a) | Text: White
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-secondary">Купити</Button>
                  <Button variant="buy-secondary" disabled>Купити</Button>
                </div>
                <small>
                  <code>variant="buy-secondary"</code> or <code>className="fe-btn fe-btn--buy-secondary"</code>
                  <br />
                  Background: Light Pastel Green (#beff7e) | Text: Blue (changes to white on hover)
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-tertiary">Купити</Button>
                  <Button variant="buy-tertiary" disabled>Купити</Button>
                </div>
                <small>
                  <code>variant="buy-tertiary"</code> or <code>className="fe-btn fe-btn--buy-tertiary"</code>
                  <br />
                  Background: Dark Olive Green (#408000) | Text: White
                </small>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>More Button (Більше)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                <Button variant="more" icon={<span>▼</span>} iconPosition="right">
                  Більше
                </Button>
                <Button variant="more" disabled icon={<span>▼</span>} iconPosition="right">
                  Більше
                </Button>
              </div>
              <small>
                <code>variant="more"</code> or <code>className="fe-btn fe-btn--more"</code>
                <br />
                Background: Dark Gray | Border: Bright Green | Text: Bright Green
                <br />
                Includes chevron icon (can be added via icon prop)
              </small>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Catalog Button (Каталог)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="catalog" icon={<span>☰</span>} iconPosition="left">
                    Каталог
                  </Button>
                  <Button variant="catalog" icon={<span>☰</span>} iconPosition="left" className="fe-btn--catalog-active">
                    Каталог
                  </Button>
                </div>
                <small>
                  <code>variant="catalog"</code> or <code>className="fe-btn fe-btn--catalog"</code>
                  <br />
                  Default: Dark Gray BG, Thin Green Border | Hover: Thicker Border | Active: Filled Green BG, White Text
                  <br />
                  Includes grid icon (can be added via icon prop)
                </small>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Legacy Variants</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="primary" disabled>Primary Disabled</Button>
                </div>
                <small>
                  <code>variant="primary"</code> or <code>className="fe-btn fe-btn--primary"</code>
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="outline" disabled>Outline Disabled</Button>
                </div>
                <small>
                  <code>variant="outline"</code> or <code>className="fe-btn fe-btn--outline"</code>
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="danger" disabled>Danger Disabled</Button>
                </div>
                <small>
                  <code>variant="danger"</code> or <code>className="fe-btn fe-btn--danger"</code>
                </small>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="qty">Quantity Button</Button>
                  <Button variant="qty" disabled>Quantity Disabled</Button>
                </div>
                <small>
                  <code>variant="qty"</code> or <code>className="fe-btn fe-btn--qty"</code>
                </small>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <small>
              <strong>Usage:</strong> Import and use the Button component:
              <br />
              <code style={{ fontSize: "0.9em" }}>{`import { Button } from '@/components/Button'`}</code>
              <br />
              <code style={{ fontSize: "0.9em" }}>{`<Button variant="add-to-cart-outline">Додати в кошик</Button>`}</code>
              <br />
              <br />
              <strong>Edit:</strong> <code>src/app/styles/Buttons/button-tokens.css</code> (Button component uses Tailwind classes directly)
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Links Section */}
      <Section id="links">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Links</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Interactive link styles with hover and active states</small>
        
        <div className={`fe-card ${styles.card}`}>
          <div className={styles.gridGap1}>
            <div>
              <a className="fe-link pobut_body" href="#">Regular Link</a>
            </div>
            <small>
              <code>className="fe-link"</code>
              <br />
              Color: Blue | Hover: Blue Hover | Active: Blue Click
              <br />
              Edit: <code>src/app/styles/Links/links.css</code>
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Inputs Section */}
      <Section id="inputs">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Inputs</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Search input with icon support</small>
        
        <div className={`fe-card ${styles.card}`}>
          <div className={styles.gridGap1}>
        <div className="fe-search" style={{ maxWidth: "42rem" }}>
          <span className="fe-search__icon">🔍</span>
          <input className="fe-input" placeholder="Шукати продукт або бренд" />
            </div>
            <small>
              <code>className="fe-search"</code> wrapper with <code>className="fe-search__icon"</code> and <code>className="fe-input"</code>
              <br />
              Height: 2.5rem | Border-radius: 9999px (pill) | Padding: 2.75rem left (for icon) + 1rem right
              <br />
              Edit: <code>src/app/styles/Search/search.css</code> + <code>src/app/styles/Inputs/input.css</code>
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section id="cards">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Cards & Surfaces</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Card components with different variants</small>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--layout-gap-2)" }}>
          <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
            <div >Regular Card</div>
            <p>Background: White | Border: Neutral | Shadow: Small</p>
            <small>
              <code>className="fe-card"</code>
              <br />
              Border-radius: 0.75rem | Border: 1px solid
              <br />
              Edit: <code>src/app/styles/Cards/cards.css</code>
            </small>
          </div>

          <div className="fe-card fe-card--soft" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
            <h3>Soft Card</h3>
            <p>Background: Surface-2 | Border: Neutral</p>
            <small>
              <code>className="fe-card fe-card--soft"</code>
              <br />
              Background: var(--sys-surface-2)
              <br />
              Edit: <code>src/app/styles/Cards/cards.css</code>
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Badges Section */}
      <Section id="badges">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Badges</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Inline badge component for labels and tags</small>
        
        <div className={`fe-card ${styles.card}`}>
          <div className={styles.gridGap1}>
            <div>
              <span className="fe-badge">Badge Example</span>
            </div>
            <small>
              <code>className="fe-badge"</code>
              <br />
              Display: inline-flex | Padding: 0.25rem 0.5rem | Border-radius: 9999px
              <br />
              Background: 10% accent color | Border: Strong border | Color: Accent
              <br />
              Edit: <code>src/app/styles/Badges/badges.css</code>
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Product Card Section */}
      <Section id="product-card">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Product Card</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Complete product card component example</small>
        
        <div className={`fe-card ${styles.card}`}>
        <div className="fe-product" style={{ maxWidth: "22rem" }}>
            <div style={{ height: "10rem", background: "var(--sys-surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <small>Product Image</small>
            </div>
          <div className="fe-product__body" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div className="fe-availability"><small>● в наявності</small></div>
              <p>Пакет паперовий / 220*280*120 мм / коричневий / 100 шт</p>
              <h3 className="fe-price">255 грн</h3>
              <Button variant="add-to-cart-outline">Додати в кошик</Button>
            </div>
          </div>
          <small>
            <code>className="fe-product"</code> with <code>className="fe-product__body"</code>
            <br />
            Border-radius: 0.75rem | Border: 1px solid strong border | Overflow: hidden
            <br />
            Price uses <code>className="fe-price"</code> (green, bold)
            <br />
            Availability uses <code>className="fe-availability"</code> (green)
            <br />
            Edit: <code>src/app/styles/Product/product.css</code>
          </small>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Navigation Section */}
      <Section id="navigation">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Navigation</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)" }}>Header and navigation bar components</small>
        
        <div className={`fe-card ${styles.card}`}>
          <div className={styles.gridGap2}>
            <div>
              <h3 style={{ marginBottom: "var(--space-20)" }}>Header</h3>
              <div className="fe-header" style={{ padding: "var(--space-20)", borderRadius: "var(--radius-lg)" }}>
                <div className="fe-topbar">
                  <h2>Logo</h2>
                  <div style={{ background: "var(--sys-surface-2)", padding: "0.5rem", borderRadius: "0.25rem" }}><small>Search Bar Area</small></div>
                  <small>User Icons</small>
                </div>
              </div>
              <small style={{ marginTop: "var(--space-20)", display: "block" }}>
                <code>className="fe-header"</code> with <code>className="fe-topbar"</code>
                <br />
                Background: Surface | Border-bottom: 1px solid border
                <br />
                Topbar: Grid layout (auto 1fr auto) | Gap: layout-gap-2
                <br />
                Edit: <code>src/app/styles/Header/header.css</code>
              </small>
            </div>

            <div>
              <h3  style={{ marginBottom: "var(--space-20)" }}>Navigation Bar</h3>
              <div className="fe-nav" style={{ padding: "var(--space-20)", borderRadius: "var(--radius-lg)" }}>
                <div className="fe-nav__row">
                  <a className="fe-nav__link pobut_body" href="#">Оптовим клієнтам</a>
                  <a className="fe-nav__link pobut_body" href="#">Каталог</a>
                  <a className="fe-nav__link pobut_body" href="#">Акції</a>
                  <a className="fe-nav__link pobut_body" href="#">Відгуки</a>
                </div>
              </div>
              <small style={{ marginTop: "var(--space-20)" }}>
                <code>className="fe-nav"</code> with <code>className="fe-nav__row"</code> and <code>className="fe-nav__link"</code>
                <br />
                Background: Accent (green) | Color: Text inverse (white)
                <br />
                Links: Opacity 0.95 → 1 on hover
                <br />
                Edit: <code>src/app/styles/Nav/nav.css</code>
              </small>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Helpers Section */}
      <Section id="layout-helpers">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Layout Helpers</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Use system spacing tokens (CSS vars) for custom layouts</small>
        
        <div className={`fe-card ${styles.card}`}>
          <div className={styles.gridGap1}>
            <div>
              <p><code>fe-page</code></p>
              <small>
                Legacy utility class. Use <code>Page</code> component instead.
              </small>
            </div>
            <div>
              <p><code>--layout-gap-1</code>, <code>--layout-gap-2</code>, <code>--layout-gap-3</code></p>
              <small>
                Use these tokens for <code>gap</code> in flex/grid layouts, or override rhythm via <code>--fe-page-gap</code> / <code>--fe-inner-gap</code>.
                <br />
                Example: <code>{`style={{ gap: "var(--layout-gap-2)" }}`}</code>
              </small>
            </div>
            <div>
              <p><code>--space-10</code>, <code>--space-20</code>, <code>--space-30</code>, <code>--space-50</code></p>
              <small>
                Use these tokens for padding/margins.
                <br />
                Example: <code>{`style={{ padding: "var(--space-20)" }}`}</code>
              </small>
            </div>
            <small style={{ marginTop: "var(--space-20)", display: "block" }}>
              Tokens live in: <code>src/app/styles/Spacing/spacing-tokens.css</code>
            </small>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Components Section */}
      <Section id="layout-components">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Layout Components</h2>
            <small style={{ marginBottom: "var(--layout-gap-2)", display: "block" }}>Structural components for consistent page layouts</small>
        
        <div className={`fe-card ${styles.card}`}>
          {/* Page Component */}
          <div>
            <h3  style={{ marginBottom: "var(--space-20)" }}>Page Component</h3>
            <small style={{ marginBottom: "var(--space-20)", display: "block" }}>
              Simple page wrapper with no padding. Use Container component explicitly inside when you need width constraints.
            </small>

            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              {/* Page with Container */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <p style={{ marginBottom: "var(--space-10)" }}><strong>Page with Container</strong></p>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Page>
                    <Container>
                      <div className={`fe-card ${styles.card}`}>
                        <p>Page Content</p>
                        <small>Container wraps content (max-width: 1440px)</small>
                      </div>
                    </Container>
                  </Page>
                </div>
                <small>
                  <code>{`<Page>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<Container>...</Container>`}</code>
                  <br />
                  Container must be used explicitly inside Page
                </small>
              </div>

              {/* Page with Full-Width Section */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <p style={{ marginBottom: "var(--space-10)" }}><strong>Page with Full-Width Section</strong></p>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Page>
                    <div className="fe-card" style={{ padding: "var(--space-20)", background: "var(--sys-surface-accent)", display: "grid", gap: "var(--layout-gap-2)" }}>
                      <p style={{ color: "var(--sys-text-on-accent)" }}>Full-Width Section</p>
                      <small style={{ color: "var(--sys-text-on-accent)" }}>This section spans full page width</small>
                    </div>
                    <Container>
                      <div className={`fe-card ${styles.card}`}>
                        <p>Contained Section</p>
                        <small>This section is constrained by Container</small>
                      </div>
                    </Container>
                  </Page>
                </div>
                <small>
                  <code>{`<Page>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<div>Full-width content</div>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<Container>...</Container>`}</code>
                  <br />
                  Mix full-width and contained sections as needed
                </small>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <small>
                <strong>Usage:</strong>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`import { Page } from '@/components/Page'`}</code>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`import { Container } from '@/components/Container'`}</code>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`<Page>`}</code>
                <br />
                <code style={{ fontSize: "0.9em", paddingLeft: "1rem" }}>{`<Container>...</Container>`}</code>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`</Page>`}</code>
                <br />
                <br />
                <strong>Props:</strong>
                <br />
                • Standard HTML div props (className, style, etc.)
                <br />
                <br />
                <strong>Features:</strong>
                <br />
                • Simple wrapper with no padding
                <br />
                • Use Container explicitly inside when you need width constraints
                <br />
                • Mix full-width sections with contained sections as needed
                <br />
                • Simple API: just create a new page file and return <code>{`<Page>children</Page>`}</code>
                <br />
                <br />
                <strong>Edit:</strong> <code>src/components/Page/index.tsx</code> & <code>src/components/Page/Page.css</code>
              </small>
            </div>
          </div>

          {/* Container Component */}
          <div style={{ marginTop: "var(--space-20)" }}>
            <h3  style={{ marginBottom: "var(--space-20)" }}>Container Component</h3>
            <small style={{ marginBottom: "var(--space-20)", display: "block" }}>
              Centered container with max-width constraints. Use for content that should be constrained in width.
            </small>

            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              {/* Default Container */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <p style={{ marginBottom: "var(--space-10)" }}><strong>Default Container</strong></p>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Container>
                    <div className="fe-card" style={{ padding: "var(--space-20)" }}>
                      <p>Max-width: 1440px (90rem)</p>
                      <small>Centered content with default max-width</small>
                    </div>
                  </Container>
                </div>
                <small>
                  <code>{`<Container>`}</code> - Max-width: 1440px
                </small>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <small>
                <strong>Usage:</strong>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`import { Container } from '@/components/Container'`}</code>
                <br />
                <code style={{ fontSize: "0.9em" }}>{`<Container>...</Container>`}</code>
                <br />
                <br />
                <strong>Props:</strong>
                <br />
                • Standard HTML div props (className, style, etc.)
                <br />
                <br />
                <strong>Edit:</strong> <code>src/components/Container/index.tsx</code> & <code>src/components/Container/Container.css</code>
              </small>
            </div>
          </div>

          {/* Creating a New Page Example */}
          <div style={{ marginTop: "var(--space-20)" }}>
            <h3  style={{ marginBottom: "var(--space-20)" }}>Creating a New Page</h3>
            <small style={{ marginBottom: "var(--space-20)", display: "block" }}>
              Simply create a new page file and return <code>{`<Page>`}</code> with your content. Use Container explicitly when needed.
            </small>
            <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
              <Page>
                <Container>
                  <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
                    <div className={`fe-card ${styles.card}`}>
                      <h3>Example Page</h3>
                      <p>Page wrapper with explicit Container.</p>
                      <small>Container handles width constraints, Page is just a wrapper.</small>
                    </div>
                  </div>
                </Container>
              </Page>
            </div>
            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <small>
                <strong>Example Page File:</strong>
                <br />
                <code style={{ fontSize: "0.85em", display: "block", marginTop: "var(--space-10)" }}>
                  {`// src/app/my-page/page.tsx
import { Page } from '@/components/Page'
import { Container } from '@/components/Container'

export default function MyPage() {
  return (
    <Page>
      <Container>
        <h1 >My Page</h1>
        <p>Content goes here</p>
      </Container>
    </Page>
  )
}`}
                </code>
              </small>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Quick Reference Section */}
      <Section id="quick-reference">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Quick Reference: Where to Edit</h2>
        
        <div className={`fe-card ${styles.card}`} style={{ marginTop: "var(--layout-gap-1)" }}>
          <div className={styles.gridGap1}>
            <div>
              <h3>Typography</h3>
              <p>
                <code>src/app/styles/Fonts/typography.css</code> - Font sizes, weights, line heights
                <br />
                <code>src/app/styles/Fonts/font-tokens.css</code> - Font families, weights, tracking
              </p>
            </div>
            <div>
              <h3>Colors</h3>
              <p>
                <code>src/app/styles/palette-tokens.css</code> - Brand colors (blue, green)
                <br />
                <code>src/app/styles/semantic-tokens.css</code> - Semantic colors (text, surfaces, borders)
              </p>
            </div>
            <div>
              <h3>Spacing</h3>
              <p>
                <code>src/app/styles/Spacing/spacing-tokens.css</code> - All spacing values
                <br />
                Use CSS vars in components (e.g. <code>gap</code>, <code>padding</code>, <code>margin</code>) rather than utility classes.
              </p>
            </div>
            <div>
              <h3>Components</h3>
              <p>
                <code>src/app/styles/&lt;Group&gt;/*.css</code> - Reusable UI patterns (cards/badges/links/nav/header/product/search/etc)
                <br />
                <code>src/components/Page/index.tsx</code> - Page layout component (uses Tailwind classes directly)
                <br />
                <code>src/components/Container/index.tsx</code> - Container component (uses Tailwind classes directly)
                <br />
                <code>src/components/Section/index.tsx</code> - Section (semantic wrapper, uses Tailwind classes directly)
                <br />
                <code>src/components/InnerSection/index.tsx</code> - InnerSection (uses Tailwind classes directly)
                <br />
                <code>src/components/Button/index.tsx</code> - Button component (uses Tailwind classes directly)
                <br />
                <code>src/app/styles/Buttons/button-tokens.css</code> - Button tokens
              </p>
            </div>
            <div>
              <h3>Base Styles</h3>
              <p>
                <code>src/app/(app)/globals.css</code> - Base HTML element styles (h1-h6, p, a, Button, etc.)
              </p>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}
