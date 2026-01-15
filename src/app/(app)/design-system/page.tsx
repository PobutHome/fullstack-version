"use server"

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"
import { Page } from "@/components/Page"
import { Section } from "@/components/Section"

export default async function DesignSystemPage() {
  return (
    <Page
      data-app="frontend"
      style={{ paddingTop: "var(--space-20)", paddingBottom: "var(--space-50)" }}
    >
      {/* Hero Section */}
      <Section id="hero">
        <Container>
          <InnerSection>
            <h1 className="pobut_H1">Design System</h1>
            <p className="pobut_body">
              Complete reference guide for all design tokens, components, and utilities
              used in the frontend application.
            </p>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <p className="pobut_caption">
                All styles are scoped to{" "}
                <code
                  className="pobut_caption"
                  style={{
                    background: "var(--sys-surface-2)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  data-app="frontend"
                </code>
              </p>
              <p className="pobut_caption">
                Customize values in:{" "}
                <code
                  className="pobut_caption"
                  style={{
                    background: "var(--sys-surface-2)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  src/app/styles/
                </code>
              </p>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Conventions & Navigation (read this first) */}
      <Section id="conventions">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Conventions (Read This First)</h2>
            <p className="pobut_caption">
              The goal is “fast changes with zero guessing”: one way to build layouts, one
              way to apply spacing, one place to edit tokens.
            </p>

            <div
              className="fe-card"
              style={{
                padding: "var(--space-20)",
                display: "grid",
                gap: "var(--layout-gap-2)",
              }}
            >
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <h3 className="pobut_H3">Table of contents</h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-10)",
                    alignItems: "center",
                  }}
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
                      className="fe-link pobut_caption"
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "9999px",
                        border: "1px solid var(--sys-border)",
                        background: "var(--sys-surface)",
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <h3 className="pobut_H3">Layout convention (canonical)</h3>
                  <div className="pobut_caption" style={{ display: "grid", gap: "0.5rem" }}>
                    <div>
                      <strong>✅ Always compose pages like this:</strong>{" "}
                      <code>{`<Page data-app="frontend">`}</code> →{" "}
                      <code>{`<Section id="...">`}</code> → <code>{`<Container>`}</code> →{" "}
                      <code>{`<InnerSection>`}</code>
                    </div>
                    <div>
                      <strong>✅ Use semantic blocks:</strong> each top-level <code>{`<Section>`}</code>{" "}
                      must have an <code>id</code> for anchors + predictable DOM.
                    </div>
                    <div>
                      <strong>✅ Use rhythm variables:</strong> page rhythm via{" "}
                      <code>--fe-page-gap</code>, inner rhythm via <code>--fe-inner-gap</code>.
                    </div>
                    <div>
                      <strong>❌ Avoid hardcoded spacing:</strong> don’t sprinkle <code>px</code>{" "}
                      values in layouts; use tokens like <code>var(--layout-gap-2)</code> and{" "}
                      <code>var(--space-20)</code>.
                    </div>
                    <div>
                      <strong>When to use PageSection:</strong> use <code>{`<PageSection>`}</code>{" "}
                      when your section is <em>always</em> contained (no full-width siblings).
                      Use <code>{`<Section>`}</code> when you need a full-width background/band and a
                      contained inner area inside it.
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <h3 className="pobut_H3">Where do styles go?</h3>
                  <div className="pobut_caption" style={{ display: "grid", gap: "0.5rem" }}>
                    <div>
                      <strong>Important (Next.js rule):</strong> plain global <code>.css</code> files can’t be
                      imported from arbitrary components. If you want per-component CSS next to
                      a component, use a colocated <strong>CSS file</strong>: <code>Component.css</code>.
                    </div>
                    <div>
                      <strong>Design tokens (source of truth):</strong>{" "}
                      <code>src/app/styles/*-tokens.css</code> (palette, semantic, spacing, fonts, etc.)
                    </div>
                    <div>
                      <strong>Shared component styles:</strong>{" "}
                      <code>src/app/styles/frontend.design-system.css</code> (structural + reusable UI
                      patterns like cards, badges, nav, etc.)
                    </div>
                    <div>
                      <strong>Per-component styles (colocated):</strong> <code>src/components/*/Component.css</code>
                      imported by the component (best for styles used by only that component).
                    </div>
                    <div>
                      <strong>Component code:</strong> <code>src/components/*</code> (React primitives like{" "}
                      <code>Page</code>, <code>Container</code>, <code>InnerSection</code>, <code>Button</code>)
                    </div>
                    <div>
                      <strong>Rule of thumb:</strong> if a style is reused across 2+ routes, it must live
                      in the design system styles (not inside a route).
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <h3 className="pobut_H3">CSS Modules example (recommended)</h3>
                  <pre
                    className="pobut_caption"
                    style={{
                      margin: 0,
                      padding: "var(--space-20)",
                      background: "var(--sys-surface-2)",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--sys-border)",
                      maxWidth: "100%",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      lineHeight: 1.6,
                    }}
                  >{`// src/components/MyCard/MyCard.css
.root {
  background: var(--sys-card-bg);
  border: 1px solid var(--sys-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20);
}

// src/components/MyCard/index.tsx
import "./MyCard.css"

export function MyCard({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>
}`}</pre>
                  <div className="pobut_caption" style={{ opacity: 0.85 }}>
                    This keeps styles “in the component folder” while still using the same tokens as the
                    global design system.
                  </div>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Section */}
      <Section id="layout">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Layout</h2>
            <p className="pobut_caption">
              Canonical structure rules that should be used across the whole app. The
              goal: consistent spacing, consistent max-width, and predictable DOM.
            </p>

        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <h3 className="pobut_H3">Rules</h3>
            <div className="pobut_caption">
              <div><strong>1)</strong> Every page starts with <code>{`<Page data-app="frontend">`}</code> — the page is the shell.</div>
              <div><strong>2)</strong> Pages are composed of top-level <code>{`<Section id="...">`}</code> blocks (semantic, supports anchors via <code>id</code>).</div>
              <div><strong>3)</strong> Use explicit <code>{`<Container>`}</code> + <code>{`<InnerSection>`}</code> inside each <code>{`<Section>`}</code>.</div>
              <div><strong>4)</strong> For custom layouts, use CSS vars/tokens directly (e.g. <code>gap: var(--layout-gap-2)</code>, <code>padding: var(--space-20)</code>).</div>
              <div><strong>5)</strong> Avoid ad-hoc hardcoded pixel spacing—use system tokens so spacing stays consistent across routes.</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--layout-gap-2)" }}>
            {/* Visual demo */}
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div className="pobut_body"><strong>Visual: Page → Section → Container → Inner</strong></div>
              <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div className="pobut_caption"><strong>Page</strong> (full width)</div>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-1)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                    <div className="pobut_caption"><strong>Section</strong> (vertical rhythm / background / semantics)</div>
                    <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                      <div className="pobut_caption"><strong>Container</strong> (centered + max-width + padding-inline)</div>
                      <div style={{ marginTop: "var(--space-10)", padding: "var(--space-20)", background: "var(--sys-surface-1)", borderRadius: "var(--radius-lg)" }}>
                        <div className="pobut_caption"><strong>Inner</strong> (any layout)</div>
                        <div className="pobut_caption" style={{ opacity: 0.8 }}>Cards, forms, grids, tables, etc.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code demo */}
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div className="pobut_body"><strong>Code</strong></div>
              <pre
                className="pobut_caption"
                style={{
                  margin: 0,
                  padding: "var(--space-20)",
                  background: "var(--sys-surface-2)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--sys-border)",
                  maxWidth: "100%",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  lineHeight: 1.6,
                }}
              >{`import { Page } from "@/components/Page"
import { Section } from "@/components/Section"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"

export default function ExamplePage() {
  return (
    <Page
      data-app="frontend"
      style={{ paddingTop: "var(--space-20)", paddingBottom: "var(--space-50)" }}
    >
      <Section id="hero">
        {/* Optional: full-width content can live here */}
        <Container>
          <InnerSection>
            <h1 className="pobut_H1">Title</h1>
            <p className="pobut_body">Subtitle</p>
          </InnerSection>
        </Container>
      </Section>

      <Section id="content">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Section</h2>
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
}`}</pre>
              <div className="pobut_caption" style={{ opacity: 0.8 }}>
                Uses: <code>{`<Section>`}</code> (semantic + <code>id</code>) with explicit{" "}
                <code>{`<Container>`}</code> + <code>{`<InnerSection>`}</code> to enforce the canonical DOM, and
                system tokens (CSS vars) for spacing.
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
          <InnerSection>
            <h2 className="pobut_H2">Layout Recipes (Copy/Paste)</h2>
            <p className="pobut_caption">
              These are the only “approved” layout patterns. If a page needs something else,
              we add a new layout primitive (don’t freestyle per-page).
            </p>

            <div
              className="fe-card"
              style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
            >
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <h3 className="pobut_H3">Recipe A: Standard page sections</h3>
                <pre
                  className="pobut_caption"
                  style={{
                    margin: 0,
                    padding: "var(--space-20)",
                    background: "var(--sys-surface-2)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--sys-border)",
                    maxWidth: "100%",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    lineHeight: 1.6,
                  }}
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
                <div className="pobut_caption" style={{ opacity: 0.85 }}>
                  If you need a tighter/looser stack inside InnerSection, override{" "}
                  <code>--fe-inner-gap</code>:{" "}
                  <code>{`style={{ ["--fe-inner-gap" as any]: "var(--layout-gap-1)" }}`}</code>
                </div>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <h3 className="pobut_H3">Recipe B: Full-width band + contained content</h3>
                <pre
                  className="pobut_caption"
                  style={{
                    margin: 0,
                    padding: "var(--space-20)",
                    background: "var(--sys-surface-2)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--sys-border)",
                    maxWidth: "100%",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    lineHeight: 1.6,
                  }}
                >{`<Section id="promo" style={{ background: "var(--sys-surface-accent)" }}>
  {/* full width background/band */}
  <Container>
    <InnerSection>
      {/* constrained content */}
    </InnerSection>
  </Container>
</Section>`}</pre>
              </div>

              <div className="pobut_caption" style={{ opacity: 0.85 }}>
                Sidebar layout primitives were intentionally removed from this project to keep the
                layout system small and predictable. If we need sidebars later, we’ll add a single
                new primitive with a documented recipe here.
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section id="typography">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Typography</h2>
            <p className="pobut_caption">
              Font: Unbounded | Responsive sizes: Mobile → Tablet (48rem) → Desktop
              (64rem)
            </p>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div>
              <div className="pobut_H1">Heading 1 — Unbounded Bold</div>
              <p className="pobut_caption" style={{ marginTop: "0.5rem" }}>
                Mobile: 1.25rem (20px) | Tablet: 2rem (32px) | Desktop: 2.5rem (40px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                <code>className="pobut_H1"</code> | Edit: <code>src/app/styles/Fonts/typography.css</code>
              </p>
            </div>
            
            <div>
              <div className="pobut_H2">Heading 2 — Unbounded Regular</div>
              <p className="pobut_caption" style={{ marginTop: "0.5rem" }}>
                Mobile: 1rem (16px) | Tablet: 1.5rem (24px) | Desktop: 2rem (32px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                <code>className="pobut_H2"</code> | Edit: <code>src/app/styles/Fonts/typography.css</code>
              </p>
            </div>
            
            <div>
              <div className="pobut_H3">Heading 3 — Unbounded Bold</div>
              <p className="pobut_caption" style={{ marginTop: "0.5rem" }}>
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                <code>className="pobut_H3"</code> | Edit: <code>src/app/styles/Fonts/typography.css</code>
              </p>
            </div>
            
            <div>
          <div className="pobut_body">Body — Unbounded Regular</div>
              <p className="pobut_caption" style={{ marginTop: "0.5rem" }}>
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                <code>className="pobut_body"</code> | Edit: <code>src/app/styles/Fonts/typography.css</code>
              </p>
            </div>
            
            <div>
              <div className="pobut_caption">Caption — Unbounded Regular (Muted Color)</div>
              <p className="pobut_caption" style={{ marginTop: "0.5rem" }}>
                Mobile: 0.4375rem (7px) | Tablet: 0.5625rem (9px) | Desktop: 0.625rem (10px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3% | Color: Muted (65% opacity)
                <br />
                <code>className="pobut_caption"</code> | Edit: <code>src/app/styles/Fonts/typography.css</code>
              </p>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Colors Section */}
      <Section id="colors">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Colors</h2>
            <p className="pobut_caption">Brand colors, semantic tokens, and text colors</p>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Brand Colors</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>All raw brand colors from Figma. These are the source of truth for your brand palette.</p>
            
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div>
                <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Blue (Primary Brand Color)</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-blue)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Blue:</strong> #00004c<br />
                      <code>var(--color-blue)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-blue-hover)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Blue Hover:</strong> #3b3bf9<br />
                      <code>var(--color-blue-hover)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-blue-click)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Blue Click:</strong> #00001f<br />
                      <code>var(--color-blue-click)</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Green (Accent Brand Color)</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Green:</strong> #72cb1a<br />
                      <code>var(--color-green)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green-hover)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Green Hover:</strong> #beff7e<br />
                      <code>var(--color-green-hover)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-green-click)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Green Click:</strong> #408000<br />
                      <code>var(--color-green-click)</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Neutral Colors</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-white)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>White:</strong> #ffffff<br />
                      <code>var(--color-white)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-black)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Black:</strong> #000000<br />
                      <code>var(--color-black)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-neutral-border)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Neutral Border:</strong> #e5e7eb<br />
                      <code>var(--color-neutral-border)</code>
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-default-background)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Default Background:</strong> #ffffff<br />
                      <code>var(--color-default-background)</code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Status Colors</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                  <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div style={{ height: "4rem", background: "var(--color-error)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Error:</strong> #ff0000<br />
                      <code>var(--color-error)</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <strong>Note:</strong> These are raw palette tokens. They should NOT be used directly in components.
              <br />
              Use semantic tokens instead (e.g., <code>--sys-accent</code> instead of <code>--color-green</code>).
              <br />
              Edit: <code>src/app/styles/palette-tokens.css</code>
            </p>
          </div>

          <div style={{ display: "grid", gap: "var(--layout-gap-3, var(--layout-gap-2))" }}>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Semantic Colors</h3>
            <p className="pobut_caption">All semantic tokens reference palette tokens. Edit: <code>src/app/styles/semantic-tokens.css</code></p>
            
            {/* Interactive Colors (Blue) */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Interactive (Blue - Links, Clickable Text)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Interactive:</strong> Blue<br />
                    <code>var(--sys-interactive)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive-hover)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Interactive Hover:</strong><br />
                    <code>var(--sys-interactive-hover)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-interactive-active)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Interactive Active:</strong><br />
                    <code>var(--sys-interactive-active)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors (Green) */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Accent (Green - Primary Actions, Buttons)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent (Primary):</strong> Bright Green<br />
                    <code>var(--sys-accent)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-hover)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Hover:</strong><br />
                    <code>var(--sys-accent-hover)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-active)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Active:</strong><br />
                    <code>var(--sys-accent-active)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Secondary:</strong> Light Pastel<br />
                    <code>var(--sys-accent-secondary)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent-tertiary)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Tertiary:</strong> Dark Olive<br />
                    <code>var(--sys-accent-tertiary)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Surfaces */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Surfaces (Backgrounds)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface:</strong> White<br />
                    <code>var(--sys-surface)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-2)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface 2:</strong> Alternative<br />
                    <code>var(--sys-surface-2)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-accent)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface Accent:</strong> Green BG<br />
                    <code>var(--sys-surface-accent)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface Interactive:</strong> Blue BG<br />
                    <code>var(--sys-surface-interactive)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Text Colors</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-inverse)", display: "flex", alignItems: "center", justifyContent: "center" }} className="pobut_body">
                    Text
                  </div>
                  <div className="pobut_caption">
                    <strong>Text:</strong> Blue<br />
                    <code>var(--sys-text)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text-muted)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <div className="pobut_caption">
                    <strong>Text Muted:</strong> 65% opacity<br />
                    <code>var(--sys-text-muted)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-text-subtle)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <div className="pobut_caption">
                    <strong>Text Subtle:</strong> 40% opacity<br />
                    <code>var(--sys-text-subtle)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-on-accent)", display: "flex", alignItems: "center", justifyContent: "center" }} className="pobut_body">
                    On Accent
                  </div>
                  <div className="pobut_caption">
                    <strong>Text On Accent:</strong> White<br />
                    <code>var(--sys-text-on-accent)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Borders */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Borders</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border:</strong> Neutral Gray<br />
                    <code>var(--sys-border)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border Strong:</strong> Green<br />
                    <code>var(--sys-border-strong)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border Interactive:</strong> Blue<br />
                    <code>var(--sys-border-interactive)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-subtle)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border Subtle:</strong> 60% opacity<br />
                    <code>var(--sys-border-subtle)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>States (Error, Warning, Success)</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--layout-gap-2)" }}>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-danger)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Danger:</strong> Red<br />
                    <code>var(--sys-danger)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-warning)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Warning:</strong> Orange<br />
                    <code>var(--sys-warning)</code>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div style={{ height: "3rem", background: "var(--sys-success)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Success:</strong> Green<br />
                    <code>var(--sys-success)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Component-Specific */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Component-Specific Tokens</h4>
              <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Buttons:</strong></div>
                  <div className="pobut_caption" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div><code>--sys-btn-primary-bg</code> → Primary Button background</div>
                    <div><code>--sys-btn-secondary-bg</code> → Secondary Button background</div>
                    <div><code>--sys-btn-tertiary-bg</code> → Tertiary Button background</div>
                    <div><code>--sys-btn-outline-border</code> → Outline Button border</div>
                    <div><code>--sys-btn-interactive-border</code> → Interactive Button border</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Inputs:</strong></div>
                  <div className="pobut_caption" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div><code>--sys-input-border</code> → Input border</div>
                    <div><code>--sys-input-border-hover</code> → Input border hover</div>
                    <div><code>--sys-input-border-focus</code> → Input border focus</div>
                    <div><code>--sys-input-bg</code> → Input background</div>
                    <div><code>--sys-input-fg</code> → Input text color</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Cards:</strong></div>
                  <div className="pobut_caption" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div><code>--sys-card-bg</code> → Card background</div>
                    <div><code>--sys-card-border</code> → Card border</div>
                    <div><code>--sys-card-bg-hover</code> → Card hover background</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Navigation:</strong></div>
                  <div className="pobut_caption" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                    <div><code>--sys-nav-bg</code> → Navigation background</div>
                    <div><code>--sys-nav-link</code> → Navigation link color</div>
                    <div><code>--sys-nav-link-hover</code> → Navigation link hover</div>
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
          <InnerSection>
            <h2 className="pobut_H2">Spacing</h2>
            <p className="pobut_caption">
              Layout margins and gaps are responsive: Mobile → Tablet (48rem) → Desktop
              (64rem)
            </p>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          {/* Figma Spacing Reference */}
          <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-20)" }}>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Figma Design Spacing Reference</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div className="pobut_body"><strong>Desktop:</strong> Margin 150px | Spacing 20px/50px</div>
              <div className="pobut_body"><strong>Tablet:</strong> Margin 50px | Spacing 10px/20px/30px</div>
              <div className="pobut_body"><strong>Mobile:</strong> Margin 10px | Spacing 10px/20px</div>
              <p className="pobut_caption" style={{ marginTop: "var(--space-10)" }}>
                <strong>What this means:</strong>
                <br />
                • <strong>Margin</strong> = Layout margin token (available for custom use, not used by Page component)
                <br />
                • <strong>Spacing</strong> = Vertical gaps between elements (sections, cards, etc.)
              </p>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Component Spacing Scale</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>Raw spacing values for component-level padding/margins</p>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-10)", height: "var(--space-10)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-10</code>: 0.625rem (10px)</div>
                  <div className="pobut_caption">Use: <code>padding: var(--space-10)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-20)", height: "var(--space-20)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-20</code>: 1.25rem (20px)</div>
                  <div className="pobut_caption">Use: <code>padding: var(--space-20)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-30)", height: "var(--space-30)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-30</code>: 1.875rem (30px) - Tablet only</div>
                  <div className="pobut_caption">Use: <code>padding: var(--space-30)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-50)", height: "var(--space-50)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-50</code>: 3.125rem (50px) - Desktop only</div>
                  <div className="pobut_caption">Use: <code>padding: var(--space-50)</code></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Layout Spacing (From Figma)</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>These values match your Figma design specifications</p>
            
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-margin</code>: Layout margin token (available for custom use)</div>
                <div className="pobut_caption" style={{ paddingLeft: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div>📱 <strong>Mobile:</strong> 0.625rem (10px)</div>
                  <div>📱 <strong>Tablet:</strong> 3.125rem (50px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 9.375rem (150px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Note:</strong> Page component no longer uses this padding. Use Container component for width constraints.
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-1</code>: Small vertical spacing</div>
                <div className="pobut_caption" style={{ paddingLeft: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div>📱 <strong>Mobile:</strong> 0.625rem (10px)</div>
                  <div>📱 <strong>Tablet:</strong> 0.625rem (10px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 1.25rem (20px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-1)</code> (flex/grid) or set <code>--fe-inner-gap</code> for InnerSection rhythm
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-2</code>: Medium vertical spacing</div>
                <div className="pobut_caption" style={{ paddingLeft: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div>📱 <strong>Mobile:</strong> 1.25rem (20px)</div>
                  <div>📱 <strong>Tablet:</strong> 1.25rem (20px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 3.125rem (50px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-2)</code> (flex/grid) or use the default InnerSection rhythm
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-3</code>: Large vertical spacing (Tablet+)</div>
                <div className="pobut_caption" style={{ paddingLeft: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
                  <div>📱 <strong>Mobile:</strong> Not available (falls back to gap-2)</div>
                  <div>📱 <strong>Tablet:</strong> 1.875rem (30px)</div>
                  <div>🖥️ <strong>Desktop:</strong> Falls back to gap-2 (50px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-3)</code> (flex/grid) or adjust <code>--fe-page-gap</code> for page-level spacing
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Visual Example: How These Are Used</h4>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}>1. <strong>Page Container</strong> (uses <code>--layout-margin</code>):</div>
                <div style={{ padding: "var(--space-10)", background: "var(--sys-surface)", border: "2px dashed var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }}>
                  <div className="pobut_caption" style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-block", padding: "var(--space-10) var(--space-20)", background: "var(--sys-accent)", color: "var(--sys-text-inverse)", borderRadius: "var(--radius-lg)" }}>
                      Page Content Area
                    </div>
                    <div className="pobut_caption" style={{ marginTop: "var(--space-10)" }}>
                      ← <code>--layout-margin</code> (10px/50px/150px) → 
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}>2. <strong>Vertical Stacking</strong> (uses <code>--layout-gap-*</code>):</div>
                <div style={{ padding: "var(--space-10)", background: "var(--sys-surface)", border: "2px dashed var(--sys-border-strong)", borderRadius: "var(--radius-lg)", display: "grid", gap: "var(--layout-gap-2)" }}>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }} className="pobut_caption">Section 1</div>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }} className="pobut_caption">Section 2</div>
                  <div style={{ padding: "var(--space-20)", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)", textAlign: "center" }} className="pobut_caption">Section 3</div>
                  <div className="pobut_caption" style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
                    Gap between sections = <code>--layout-gap-2</code> (20px/20px/50px)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Current Usage in Your App</h4>
            <div className="pobut_caption" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div><strong>✅ Currently Used:</strong></div>
              <div>• <code>fe-page</code> - Legacy utility class (deprecated, use Page component)</div>
              <div style={{ marginTop: "var(--space-10)" }}><strong>⚠️ Not Yet Used:</strong></div>
              <div>• Most other pages don't use <code>fe-page</code> class yet</div>
              <div>• Pages like <code>/shop</code>, <code>/products/[slug]</code> should add <code>className="fe-page"</code> to their containers</div>
            </div>
          </div>

          <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
            Edit: <code>src/app/styles/Spacing/spacing-tokens.css</code>
          </p>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section id="buttons">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Buttons</h2>
            <p className="pobut_caption">
              All Buttons use rounded pill shape (border-radius: 9999px). All use semantic
              tokens from <code>semantic-tokens.css</code>
            </p>
        
        <div
          className="fe-card"
          style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}
        >
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Add to Cart Buttons (Додати в кошик)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="add-to-cart-outline">Додати в кошик</Button>
                  <Button variant="add-to-cart-outline" disabled>Додати в кошик</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="add-to-cart-outline"</code> or <code>className="fe-btn fe-btn--add-to-cart-outline"</code>
                  <br />
                  Background: Transparent | Border: Bright Green | Text: Bright Green
                  <br />
                  Hover: Lighter green | Active: Darker green
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="add-to-cart-filled">Додати в кошик</Button>
                  <Button variant="add-to-cart-filled" disabled>Додати в кошик</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="add-to-cart-filled"</code> or <code>className="fe-btn fe-btn--add-to-cart-filled"</code>
                  <br />
                  Background: Dark Green (#408000) | Text: White
                  <br />
                  Hover: Bright green | Active: Dark green
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Buy Buttons (Купити)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-primary">Купити</Button>
                  <Button variant="buy-primary" disabled>Купити</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="buy-primary"</code> or <code>className="fe-btn fe-btn--buy-primary"</code>
                  <br />
                  Background: Bright Lime Green (#72cb1a) | Text: White
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-secondary">Купити</Button>
                  <Button variant="buy-secondary" disabled>Купити</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="buy-secondary"</code> or <code>className="fe-btn fe-btn--buy-secondary"</code>
                  <br />
                  Background: Light Pastel Green (#beff7e) | Text: Blue (changes to white on hover)
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="buy-tertiary">Купити</Button>
                  <Button variant="buy-tertiary" disabled>Купити</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="buy-tertiary"</code> or <code>className="fe-btn fe-btn--buy-tertiary"</code>
                  <br />
                  Background: Dark Olive Green (#408000) | Text: White
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>More Button (Більше)</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
              <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                <Button variant="more" icon={<span>▼</span>} iconPosition="right">
                  Більше
                </Button>
                <Button variant="more" disabled icon={<span>▼</span>} iconPosition="right">
                  Більше
                </Button>
              </div>
              <p className="pobut_caption">
                <code>variant="more"</code> or <code>className="fe-btn fe-btn--more"</code>
                <br />
                Background: Dark Gray | Border: Bright Green | Text: Bright Green
                <br />
                Includes chevron icon (can be added via icon prop)
              </p>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Catalog Button (Каталог)</h3>
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
                <p className="pobut_caption">
                  <code>variant="catalog"</code> or <code>className="fe-btn fe-btn--catalog"</code>
                  <br />
                  Default: Dark Gray BG, Thin Green Border | Hover: Thicker Border | Active: Filled Green BG, White Text
                  <br />
                  Includes grid icon (can be added via icon prop)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Legacy Variants</h3>
            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="primary" disabled>Primary Disabled</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="primary"</code> or <code>className="fe-btn fe-btn--primary"</code>
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="outline" disabled>Outline Disabled</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="outline"</code> or <code>className="fe-btn fe-btn--outline"</code>
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="danger" disabled>Danger Disabled</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="danger"</code> or <code>className="fe-btn fe-btn--danger"</code>
                </p>
              </div>

              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="flex flex-wrap" style={{ gap: "var(--layout-gap-2)" }}>
                  <Button variant="qty">Quantity Button</Button>
                  <Button variant="qty" disabled>Quantity Disabled</Button>
                </div>
                <p className="pobut_caption">
                  <code>variant="qty"</code> or <code>className="fe-btn fe-btn--qty"</code>
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <p className="pobut_caption">
              <strong>Usage:</strong> Import and use the Button component:
              <br />
              <code style={{ fontSize: "0.9em" }}>{`import { Button } from '@/components/Button'`}</code>
              <br />
              <code style={{ fontSize: "0.9em" }}>{`<Button variant="add-to-cart-outline">Додати в кошик</Button>`}</code>
              <br />
              <br />
              <strong>Edit:</strong> <code>src/app/styles/Buttons/Button.css</code> & <code>src/app/styles/Buttons/Button-tokens.css</code>
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Links Section */}
      <Section id="links">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Links</h2>
            <p className="pobut_caption">Interactive link styles with hover and active states</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div>
              <a className="fe-link pobut_body" href="#">Regular Link</a>
            </div>
            <p className="pobut_caption">
              <code>className="fe-link"</code>
              <br />
              Color: Blue | Hover: Blue Hover | Active: Blue Click
              <br />
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 72-79)
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Inputs Section */}
      <Section id="inputs">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Inputs</h2>
            <p className="pobut_caption">Search input with icon support</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
        <div className="fe-search" style={{ maxWidth: "42rem" }}>
          <span className="fe-search__icon">🔍</span>
          <input className="fe-input" placeholder="Шукати продукт або бренд" />
            </div>
            <p className="pobut_caption">
              <code>className="fe-search"</code> wrapper with <code>className="fe-search__icon"</code> and <code>className="fe-input"</code>
              <br />
              Height: 2.5rem | Border-radius: 9999px (pill) | Padding: 2.75rem left (for icon) + 1rem right
              <br />
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 112-140)
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section id="cards">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Cards & Surfaces</h2>
            <p className="pobut_caption">Card components with different variants</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--layout-gap-2)" }}>
          <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
            <div className="pobut_H3">Regular Card</div>
            <p className="pobut_body">Background: White | Border: Neutral | Shadow: Small</p>
            <p className="pobut_caption">
              <code>className="fe-card"</code>
              <br />
              Border-radius: 0.75rem | Border: 1px solid
              <br />
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 84-90)
            </p>
          </div>

          <div className="fe-card fe-card--soft" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-1)" }}>
            <div className="pobut_H3">Soft Card</div>
            <p className="pobut_body">Background: Surface-2 | Border: Neutral</p>
            <p className="pobut_caption">
              <code>className="fe-card fe-card--soft"</code>
              <br />
              Background: var(--sys-surface-2)
              <br />
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 92-95)
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Badges Section */}
      <Section id="badges">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Badges</h2>
            <p className="pobut_caption">Inline badge component for labels and tags</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div>
              <span className="fe-badge pobut_caption">Badge Example</span>
            </div>
            <p className="pobut_caption">
              <code>className="fe-badge"</code>
              <br />
              Display: inline-flex | Padding: 0.25rem 0.5rem | Border-radius: 9999px
              <br />
              Background: 10% accent color | Border: Strong border | Color: Accent
              <br />
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 97-106)
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Product Card Section */}
      <Section id="product-card">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Product Card</h2>
            <p className="pobut_caption">Complete product card component example</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
        <div className="fe-product" style={{ maxWidth: "22rem" }}>
            <div style={{ height: "10rem", background: "var(--sys-surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="pobut_caption">Product Image</span>
            </div>
          <div className="fe-product__body" style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div className="pobut_caption fe-availability">● в наявності</div>
              <div className="pobut_body">Пакет паперовий / 220*280*120 мм / коричневий / 100 шт</div>
              <div className="pobut_H3 fe-price">255 грн</div>
              <Button variant="add-to-cart-outline">Додати в кошик</Button>
            </div>
          </div>
          <p className="pobut_caption">
            <code>className="fe-product"</code> with <code>className="fe-product__body"</code>
            <br />
            Border-radius: 0.75rem | Border: 1px solid strong border | Overflow: hidden
            <br />
            Price uses <code>className="fe-price"</code> (green, bold)
            <br />
            Availability uses <code>className="fe-availability"</code> (green)
            <br />
            Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 181-200)
          </p>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Navigation Section */}
      <Section id="navigation">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Navigation</h2>
            <p className="pobut_caption">Header and navigation bar components</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
            <div>
              <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Header</h3>
              <div className="fe-header" style={{ padding: "var(--space-20)", borderRadius: "var(--radius-lg)" }}>
                <div className="fe-topbar">
                  <div className="pobut_H2">Logo</div>
                  <div style={{ background: "var(--sys-surface-2)", padding: "0.5rem", borderRadius: "0.25rem" }} className="pobut_caption">Search Bar Area</div>
                  <div className="pobut_caption">User Icons</div>
                </div>
              </div>
              <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
                <code>className="fe-header"</code> with <code>className="fe-topbar"</code>
                <br />
                Background: Surface | Border-bottom: 1px solid border
                <br />
                Topbar: Grid layout (auto 1fr auto) | Gap: layout-gap-2
                <br />
                Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 145-157)
              </p>
            </div>

            <div>
              <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Navigation Bar</h3>
              <div className="fe-nav" style={{ padding: "var(--space-20)", borderRadius: "var(--radius-lg)" }}>
                <div className="fe-nav__row">
                  <a className="fe-nav__link pobut_body" href="#">Оптовим клієнтам</a>
                  <a className="fe-nav__link pobut_body" href="#">Каталог</a>
                  <a className="fe-nav__link pobut_body" href="#">Акції</a>
                  <a className="fe-nav__link pobut_body" href="#">Відгуки</a>
                </div>
              </div>
              <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
                <code>className="fe-nav"</code> with <code>className="fe-nav__row"</code> and <code>className="fe-nav__link"</code>
                <br />
                Background: Accent (green) | Color: Text inverse (white)
                <br />
                Links: Opacity 0.95 → 1 on hover
                <br />
                Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 159-176)
              </p>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Helpers Section */}
      <Section id="layout-helpers">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Layout Helpers</h2>
            <p className="pobut_caption">Use system spacing tokens (CSS vars) for custom layouts</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div>
              <div className="pobut_body"><code>fe-page</code></div>
              <p className="pobut_caption">
                Legacy utility class. Use <code>Page</code> component instead.
              </p>
            </div>
            <div>
              <div className="pobut_body"><code>--layout-gap-1</code>, <code>--layout-gap-2</code>, <code>--layout-gap-3</code></div>
              <p className="pobut_caption">
                Use these tokens for <code>gap</code> in flex/grid layouts, or override rhythm via <code>--fe-page-gap</code> / <code>--fe-inner-gap</code>.
                <br />
                Example: <code>{`style={{ gap: "var(--layout-gap-2)" }}`}</code>
              </p>
            </div>
            <div>
              <div className="pobut_body"><code>--space-10</code>, <code>--space-20</code>, <code>--space-30</code>, <code>--space-50</code></div>
              <p className="pobut_caption">
                Use these tokens for padding/margins.
                <br />
                Example: <code>{`style={{ padding: "var(--space-20)" }}`}</code>
              </p>
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
              Tokens live in: <code>src/app/styles/Spacing/spacing-tokens.css</code>
            </p>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Components Section */}
      <Section id="layout-components">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Layout Components</h2>
            <p className="pobut_caption">Structural components for consistent page layouts</p>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          {/* Page Component */}
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Page Component</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>
              Simple page wrapper with no padding. Use Container component explicitly inside when you need width constraints.
            </p>

            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              {/* Page with Container */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Page with Container</strong></div>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Page>
                    <Container>
                      <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
                        <div className="pobut_body">Page Content</div>
                        <p className="pobut_caption">Container wraps content (max-width: 1440px)</p>
                      </div>
                    </Container>
                  </Page>
                </div>
                <p className="pobut_caption">
                  <code>{`<Page>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<Container>...</Container>`}</code>
                  <br />
                  Container must be used explicitly inside Page
                </p>
              </div>

              {/* Page with Full-Width Section */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Page with Full-Width Section</strong></div>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Page>
                    <div className="fe-card" style={{ padding: "var(--space-20)", background: "var(--sys-surface-accent)", display: "grid", gap: "var(--layout-gap-2)" }}>
                      <div className="pobut_body" style={{ color: "var(--sys-text-on-accent)" }}>Full-Width Section</div>
                      <p className="pobut_caption" style={{ color: "var(--sys-text-on-accent)" }}>This section spans full page width</p>
                    </div>
                    <Container>
                      <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
                        <div className="pobut_body">Contained Section</div>
                        <p className="pobut_caption">This section is constrained by Container</p>
                      </div>
                    </Container>
                  </Page>
                </div>
                <p className="pobut_caption">
                  <code>{`<Page>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<div>Full-width content</div>`}</code>
                  <br />
                  <code style={{ paddingLeft: "1rem" }}>{`<Container>...</Container>`}</code>
                  <br />
                  Mix full-width and contained sections as needed
                </p>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <p className="pobut_caption">
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
              </p>
            </div>
          </div>

          {/* Container Component */}
          <div style={{ marginTop: "var(--space-20)" }}>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Container Component</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>
              Centered container with max-width constraints. Use for content that should be constrained in width.
            </p>

            <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
              {/* Default Container */}
              <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Default Container</strong></div>
                <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
                  <Container>
                    <div className="fe-card" style={{ padding: "var(--space-20)" }}>
                      <div className="pobut_body">Max-width: 1440px (90rem)</div>
                      <p className="pobut_caption">Centered content with default max-width</p>
                    </div>
                  </Container>
                </div>
                <p className="pobut_caption">
                  <code>{`<Container>`}</code> - Max-width: 1440px
                </p>
              </div>
            </div>

            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <p className="pobut_caption">
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
              </p>
            </div>
          </div>

          {/* Creating a New Page Example */}
          <div style={{ marginTop: "var(--space-20)" }}>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Creating a New Page</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>
              Simply create a new page file and return <code>{`<Page>`}</code> with your content. Use Container explicitly when needed.
            </p>
            <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--sys-border)" }}>
              <Page>
                <Container>
                  <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
                    <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
                      <h3 className="pobut_H3">Example Page</h3>
                      <p className="pobut_body">Page wrapper with explicit Container.</p>
                      <p className="pobut_caption">Container handles width constraints, Page is just a wrapper.</p>
                    </div>
                  </div>
                </Container>
              </Page>
            </div>
            <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <p className="pobut_caption">
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
        <h1 className="pobut_H1">My Page</h1>
        <p className="pobut_body">Content goes here</p>
      </Container>
    </Page>
  )
}`}
                </code>
              </p>
            </div>
          </div>
        </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Quick Reference Section */}
      <Section id="quick-reference">
        <Container>
          <InnerSection>
            <h2 className="pobut_H2">Quick Reference: Where to Edit</h2>
        
        <div className="fe-card" style={{ padding: "var(--space-20)", display: "grid", gap: "var(--layout-gap-2)" }}>
          <div style={{ display: "grid", gap: "var(--layout-gap-1)" }}>
            <div>
              <div className="pobut_H3">Typography</div>
              <p className="pobut_body">
                <code>src/app/styles/Fonts/typography.css</code> - Font sizes, weights, line heights
                <br />
                <code>src/app/styles/Fonts/font-tokens.css</code> - Font families, weights, tracking
              </p>
            </div>
            <div>
              <div className="pobut_H3">Colors</div>
              <p className="pobut_body">
                <code>src/app/styles/palette-tokens.css</code> - Brand colors (blue, green)
                <br />
                <code>src/app/styles/semantic-tokens.css</code> - Semantic colors (text, surfaces, borders)
              </p>
            </div>
            <div>
              <div className="pobut_H3">Spacing</div>
              <p className="pobut_body">
                <code>src/app/styles/Spacing/spacing-tokens.css</code> - All spacing values
                <br />
                Use CSS vars in components (e.g. <code>gap</code>, <code>padding</code>, <code>margin</code>) rather than utility classes.
              </p>
            </div>
            <div>
              <div className="pobut_H3">Components</div>
              <p className="pobut_body">
                <code>src/app/styles/frontend.design-system.css</code> - Cards, badges, links, inputs, nav, products (shared UI patterns)
                <br />
                <code>src/components/Page/index.tsx</code> + <code>src/components/Page/Page.css</code> - Page layout component
                <br />
                <code>src/components/Container/index.tsx</code> + <code>src/components/Container/Container.css</code> - Container component
                <br />
                <code>src/components/Section/index.tsx</code> + <code>src/components/Section/Section.css</code> - Section (semantic wrapper)
                <br />
                <code>src/components/InnerSection/index.tsx</code> + <code>src/components/InnerSection/InnerSection.css</code> - InnerSection (default rhythm)
                <br />
                <code>src/components/Button/index.tsx</code> - Button component
                <br />
                <code>src/components/Button/Button.css</code> - Button styles
                <br />
                <code>src/app/styles/Buttons/button-tokens.css</code> - Button tokens
              </p>
            </div>
            <div>
              <div className="pobut_H3">Base Styles</div>
              <p className="pobut_body">
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
