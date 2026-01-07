"use server"
export default async function DesignSystemPage() {
  return (
    <div data-app="frontend" className="fe-page fe-stack-3" style={{ paddingTop: "var(--space-20)", paddingBottom: "var(--space-50)" }}>
      {/* Hero Section */}
      <section className="fe-stack-2">
        <h1 className="pobut_H1">Design System</h1>
        <p className="pobut_body">Complete reference guide for all design tokens, components, and utilities used in the frontend application.</p>
        <div className="fe-stack-1">
          <p className="pobut_caption">All styles are scoped to <code className="pobut_caption" style={{ background: "var(--sys-surface-2)", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>data-app="frontend"</code></p>
          <p className="pobut_caption">Customize values in: <code className="pobut_caption" style={{ background: "var(--sys-surface-2)", padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}>src/app/styles/</code></p>
        </div>
      </section>

      {/* Typography Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Typography</h2>
        <p className="pobut_caption">Font: Unbounded | Responsive sizes: Mobile → Tablet (48rem) → Desktop (64rem)</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
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
      </section>

      {/* Colors Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Colors</h2>
        <p className="pobut_caption">Brand colors, semantic tokens, and text colors</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Brand Colors</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>All raw brand colors from Figma. These are the source of truth for your brand palette.</p>
            
            <div className="fe-stack-2">
              <div>
                <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Blue (Primary Brand Color)</h4>
                <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-blue)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Blue:</strong> #00004c<br />
                      <code>var(--color-blue)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-blue-hover)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Blue Hover:</strong> #3b3bf9<br />
                      <code>var(--color-blue-hover)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
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
                <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-green)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Green:</strong> #72cb1a<br />
                      <code>var(--color-green)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-green-hover)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Green Hover:</strong> #beff7e<br />
                      <code>var(--color-green-hover)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
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
                <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-white)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>White:</strong> #ffffff<br />
                      <code>var(--color-white)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-black)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Black:</strong> #000000<br />
                      <code>var(--color-black)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
                    <div style={{ height: "4rem", background: "var(--color-neutral-border)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                    <div className="pobut_caption">
                      <strong>Neutral Border:</strong> #e5e7eb<br />
                      <code>var(--color-neutral-border)</code>
                    </div>
                  </div>
                  <div className="fe-stack-1">
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
                <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <div className="fe-stack-1">
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

          <div className="fe-stack-3">
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Semantic Colors</h3>
            <p className="pobut_caption">All semantic tokens reference palette tokens. Edit: <code>src/app/styles/semantic-tokens.css</code></p>
            
            {/* Interactive Colors (Blue) */}
            <div>
              <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)", marginTop: "var(--space-20)" }}>Interactive (Blue - Links, Clickable Text)</h4>
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Interactive:</strong> Blue<br />
                    <code>var(--sys-interactive)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-interactive-hover)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Interactive Hover:</strong><br />
                    <code>var(--sys-interactive-hover)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent (Primary):</strong> Bright Green<br />
                    <code>var(--sys-accent)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-accent-hover)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Hover:</strong><br />
                    <code>var(--sys-accent-hover)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-accent-active)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Active:</strong><br />
                    <code>var(--sys-accent-active)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-accent-secondary)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Accent Secondary:</strong> Light Pastel<br />
                    <code>var(--sys-accent-secondary)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface:</strong> White<br />
                    <code>var(--sys-surface)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface-2)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface 2:</strong> Alternative<br />
                    <code>var(--sys-surface-2)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface-accent)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Surface Accent:</strong> Green BG<br />
                    <code>var(--sys-surface-accent)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-text)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-inverse)", display: "flex", alignItems: "center", justifyContent: "center" }} className="pobut_body">
                    Text
                  </div>
                  <div className="pobut_caption">
                    <strong>Text:</strong> Blue<br />
                    <code>var(--sys-text)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-text-muted)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <div className="pobut_caption">
                    <strong>Text Muted:</strong> 65% opacity<br />
                    <code>var(--sys-text-muted)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-text-subtle)", borderRadius: "var(--radius-lg)", border: "1px solid var(--sys-border)" }} />
                  <div className="pobut_caption">
                    <strong>Text Subtle:</strong> 40% opacity<br />
                    <code>var(--sys-text-subtle)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border:</strong> Neutral Gray<br />
                    <code>var(--sys-border)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border Strong:</strong> Green<br />
                    <code>var(--sys-border-strong)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-surface)", border: "2px solid var(--sys-border-interactive)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Border Interactive:</strong> Blue<br />
                    <code>var(--sys-border-interactive)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-danger)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Danger:</strong> Red<br />
                    <code>var(--sys-danger)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
                  <div style={{ height: "3rem", background: "var(--sys-warning)", borderRadius: "var(--radius-lg)" }} />
                  <div className="pobut_caption">
                    <strong>Warning:</strong> Orange<br />
                    <code>var(--sys-warning)</code>
                  </div>
                </div>
                <div className="fe-stack-1">
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
              <div className="fe-stack-2">
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Buttons:</strong></div>
                  <div className="pobut_caption fe-stack-1">
                    <div><code>--sys-btn-primary-bg</code> → Primary button background</div>
                    <div><code>--sys-btn-secondary-bg</code> → Secondary button background</div>
                    <div><code>--sys-btn-tertiary-bg</code> → Tertiary button background</div>
                    <div><code>--sys-btn-outline-border</code> → Outline button border</div>
                    <div><code>--sys-btn-interactive-border</code> → Interactive button border</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Inputs:</strong></div>
                  <div className="pobut_caption fe-stack-1">
                    <div><code>--sys-input-border</code> → Input border</div>
                    <div><code>--sys-input-border-hover</code> → Input border hover</div>
                    <div><code>--sys-input-border-focus</code> → Input border focus</div>
                    <div><code>--sys-input-bg</code> → Input background</div>
                    <div><code>--sys-input-fg</code> → Input text color</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Cards:</strong></div>
                  <div className="pobut_caption fe-stack-1">
                    <div><code>--sys-card-bg</code> → Card background</div>
                    <div><code>--sys-card-border</code> → Card border</div>
                    <div><code>--sys-card-bg-hover</code> → Card hover background</div>
                  </div>
                </div>
                <div>
                  <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><strong>Navigation:</strong></div>
                  <div className="pobut_caption fe-stack-1">
                    <div><code>--sys-nav-bg</code> → Navigation background</div>
                    <div><code>--sys-nav-link</code> → Navigation link color</div>
                    <div><code>--sys-nav-link-hover</code> → Navigation link hover</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Spacing</h2>
        <p className="pobut_caption">Layout margins and gaps are responsive: Mobile → Tablet (48rem) → Desktop (64rem)</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          {/* Figma Spacing Reference */}
          <div style={{ padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-20)" }}>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Figma Design Spacing Reference</h3>
            <div className="fe-stack-1">
              <div className="pobut_body"><strong>Desktop:</strong> Margin 150px | Spacing 20px/50px</div>
              <div className="pobut_body"><strong>Tablet:</strong> Margin 50px | Spacing 10px/20px/30px</div>
              <div className="pobut_body"><strong>Mobile:</strong> Margin 10px | Spacing 10px/20px</div>
              <p className="pobut_caption" style={{ marginTop: "var(--space-10)" }}>
                <strong>What this means:</strong>
                <br />
                • <strong>Margin</strong> = Horizontal padding on page containers (left/right sides)
                <br />
                • <strong>Spacing</strong> = Vertical gaps between elements (sections, cards, etc.)
              </p>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Component Spacing Scale</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>Raw spacing values for component-level padding/margins</p>
            <div className="fe-stack-1">
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-10)", height: "var(--space-10)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-10</code>: 0.625rem (10px)</div>
                  <div className="pobut_caption">Use: <code>className="fe-p-10"</code> or inline style with <code>padding: var(--space-10)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-20)", height: "var(--space-20)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-20</code>: 1.25rem (20px)</div>
                  <div className="pobut_caption">Use: <code>className="fe-p-20"</code> or inline style with <code>padding: var(--space-20)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-30)", height: "var(--space-30)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-30</code>: 1.875rem (30px) - Tablet only</div>
                  <div className="pobut_caption">Use: <code>className="fe-p-30"</code> or inline style with <code>padding: var(--space-30)</code></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-20)" }}>
                <div style={{ width: "var(--space-50)", height: "var(--space-50)", background: "var(--sys-accent)", borderRadius: "0.25rem" }} />
                <div>
                  <div className="pobut_body"><code>--space-50</code>: 3.125rem (50px) - Desktop only</div>
                  <div className="pobut_caption">Use: <code>className="fe-p-50"</code> or inline style with <code>padding: var(--space-50)</code></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Layout Spacing (From Figma)</h3>
            <p className="pobut_caption" style={{ marginBottom: "var(--space-20)" }}>These values match your Figma design specifications</p>
            
            <div className="fe-stack-2">
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-margin</code>: Page horizontal padding</div>
                <div className="pobut_caption fe-stack-1" style={{ paddingLeft: "var(--space-20)" }}>
                  <div>📱 <strong>Mobile:</strong> 0.625rem (10px)</div>
                  <div>📱 <strong>Tablet:</strong> 3.125rem (50px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 9.375rem (150px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> Add <code>className="fe-page"</code> to your page container div
                    <br />
                    <code style={{ fontSize: "0.8em" }}>&lt;div data-app="frontend" className="fe-page"&gt;...&lt;/div&gt;</code>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-1</code>: Small vertical spacing</div>
                <div className="pobut_caption fe-stack-1" style={{ paddingLeft: "var(--space-20)" }}>
                  <div>📱 <strong>Mobile:</strong> 0.625rem (10px)</div>
                  <div>📱 <strong>Tablet:</strong> 0.625rem (10px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 1.25rem (20px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> <code>className="fe-stack-1"</code> for vertical lists, or <code>className="fe-gap-1"</code> for flex/grid gaps
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-2</code>: Medium vertical spacing</div>
                <div className="pobut_caption fe-stack-1" style={{ paddingLeft: "var(--space-20)" }}>
                  <div>📱 <strong>Mobile:</strong> 1.25rem (20px)</div>
                  <div>📱 <strong>Tablet:</strong> 1.25rem (20px)</div>
                  <div>🖥️ <strong>Desktop:</strong> 3.125rem (50px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> <code>className="fe-stack-2"</code> for section spacing, or <code>className="fe-gap-2"</code> for flex/grid gaps
                  </div>
                </div>
              </div>
              
              <div>
                <div className="pobut_body" style={{ marginBottom: "var(--space-10)" }}><code>--layout-gap-3</code>: Large vertical spacing (Tablet+)</div>
                <div className="pobut_caption fe-stack-1" style={{ paddingLeft: "var(--space-20)" }}>
                  <div>📱 <strong>Mobile:</strong> Not available (falls back to gap-2)</div>
                  <div>📱 <strong>Tablet:</strong> 1.875rem (30px)</div>
                  <div>🖥️ <strong>Desktop:</strong> Falls back to gap-2 (50px)</div>
                  <div style={{ marginTop: "var(--space-10)" }}>
                    <strong>Where to use:</strong> <code>className="fe-stack-3"</code> for large section spacing, or <code>className="fe-gap-3"</code> for flex/grid gaps
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
            <h4 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Visual Example: How These Are Used</h4>
            <div className="fe-stack-2">
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
                <div className="fe-stack-2" style={{ padding: "var(--space-10)", background: "var(--sys-surface)", border: "2px dashed var(--sys-border-strong)", borderRadius: "var(--radius-lg)" }}>
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
            <div className="pobut_caption fe-stack-1">
              <div><strong>✅ Currently Used:</strong></div>
              <div>• <code>fe-page</code> - Used in design-system page (adds horizontal padding)</div>
              <div>• <code>fe-stack-*</code> - Used in design-system page (adds vertical spacing between children)</div>
              <div>• <code>fe-gap-*</code> - Used in design-system page (adds gap in flex/grid layouts)</div>
              <div style={{ marginTop: "var(--space-10)" }}><strong>⚠️ Not Yet Used:</strong></div>
              <div>• Most other pages don't use <code>fe-page</code> class yet</div>
              <div>• Pages like <code>/shop</code>, <code>/products/[slug]</code> should add <code>className="fe-page"</code> to their containers</div>
            </div>
          </div>

          <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
            Edit: <code>src/app/styles/Spacing/spacing-tokens.css</code>
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Buttons</h2>
        <p className="pobut_caption">All buttons use rounded pill shape (border-radius: 9999px). All use semantic tokens from <code>semantic-tokens.css</code></p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Button Variants</h3>
            <div className="fe-stack-2">
              <div className="fe-stack-1">
                <div className="flex flex-wrap fe-gap-2">
                  <button className="fe-btn fe-btn--primary">Primary Button</button>
                  <button className="fe-btn fe-btn--primary" disabled>Primary Disabled</button>
                </div>
                <p className="pobut_caption">
                  <code>className="fe-btn fe-btn--primary"</code>
                  <br />
                  Uses: <code>--sys-btn-primary-bg</code> (bright green) | Text: White
                  <br />
                  Hover: <code>--sys-btn-primary-bg-hover</code> | Active: <code>--sys-btn-primary-bg-active</code>
                  <br />
                  Edit: <code>src/components/Button/button.css</code> & <code>src/app/styles/Buttons/button-tokens.css</code>
                </p>
              </div>

              <div className="fe-stack-1">
                <div className="flex flex-wrap fe-gap-2">
                  <button className="fe-btn fe-btn--outline">Outline Button</button>
                  <button className="fe-btn fe-btn--outline" disabled>Outline Disabled</button>
                </div>
                <p className="pobut_caption">
                  <code>className="fe-btn fe-btn--outline"</code>
                  <br />
                  Uses: <code>--sys-btn-outline-border</code> (green) | Background: Transparent | Text: Green
                  <br />
                  Hover: <code>--sys-btn-outline-border-hover</code> | Active: <code>--sys-btn-outline-border-active</code>
                  <br />
                  Edit: <code>src/components/Button/button.css</code> & <code>src/app/styles/Buttons/button-tokens.css</code>
                </p>
              </div>

              <div className="fe-stack-1">
                <div className="flex flex-wrap fe-gap-2">
                  <button className="fe-btn fe-btn--danger">Danger Button</button>
                  <button className="fe-btn fe-btn--danger" disabled>Danger Disabled</button>
                </div>
                <p className="pobut_caption">
                  <code>className="fe-btn fe-btn--danger"</code>
                  <br />
                  Uses: <code>--sys-danger</code> (red) | Text: White
                  <br />
                  Hover: <code>--sys-danger-hover</code> | Active: <code>--sys-danger-active</code>
                  <br />
                  Edit: <code>src/components/Button/button.css</code> & <code>src/app/styles/Buttons/button-tokens.css</code>
                </p>
              </div>

              <div className="fe-stack-1">
        <div className="flex flex-wrap fe-gap-2">
                  <button className="fe-btn fe-btn--qty">Quantity Button</button>
                  <button className="fe-btn fe-btn--qty" disabled>Quantity Disabled</button>
                </div>
                <p className="pobut_caption">
                  <code>className="fe-btn fe-btn--qty"</code>
                  <br />
                  Uses: <code>--sys-btn-interactive-border</code> (blue) | Background: Transparent | Text: Blue
                  <br />
                  Hover: <code>--sys-btn-interactive-border-hover</code> | Active: <code>--sys-btn-interactive-border-active</code>
                  <br />
                  Edit: <code>src/components/Button/button.css</code>
                </p>
              </div>
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)", padding: "var(--space-20)", background: "var(--sys-surface-2)", borderRadius: "var(--radius-lg)" }}>
              <strong>Note:</strong> Additional button variants (secondary, tertiary) are available via semantic tokens but need CSS classes added:
              <br />
              <code>--sys-btn-secondary-bg</code> (light pastel green) | <code>--sys-btn-tertiary-bg</code> (dark olive green)
            </p>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Links</h2>
        <p className="pobut_caption">Interactive link styles with hover and active states</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
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
      </section>

      {/* Inputs Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Inputs</h2>
        <p className="pobut_caption">Search input with icon support</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
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
      </section>

      {/* Cards Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Cards & Surfaces</h2>
        <p className="pobut_caption">Card components with different variants</p>
        
        <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          <div className="fe-card fe-stack-1" style={{ padding: "var(--space-20)" }}>
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

          <div className="fe-card fe-card--soft fe-stack-1" style={{ padding: "var(--space-20)" }}>
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
      </section>

      {/* Badges Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Badges</h2>
        <p className="pobut_caption">Inline badge component for labels and tags</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
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
      </section>

      {/* Product Card Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Product Card</h2>
        <p className="pobut_caption">Complete product card component example</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
        <div className="fe-product" style={{ maxWidth: "22rem" }}>
            <div style={{ height: "10rem", background: "var(--sys-surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="pobut_caption">Product Image</span>
            </div>
          <div className="fe-product__body fe-stack-1">
            <div className="pobut_caption fe-availability">● в наявності</div>
              <div className="pobut_body">Пакет паперовий / 220*280*120 мм / коричневий / 100 шт</div>
              <div className="pobut_H3 fe-price">255 грн</div>
            <button className="fe-btn fe-btn--outline">Додати в кошик</button>
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
      </section>

      {/* Navigation Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Navigation</h2>
        <p className="pobut_caption">Header and navigation bar components</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-2">
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
      </section>

      {/* Layout Helpers Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Layout Helpers</h2>
        <p className="pobut_caption">Utility classes for spacing and layout</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
            <div>
              <div className="pobut_body"><code>fe-page</code></div>
              <p className="pobut_caption">
                Adds horizontal padding (left/right) using <code>--layout-margin</code>
                <br />
                Responsive: Mobile 10px → Tablet 50px → Desktop 150px
              </p>
            </div>
            <div>
              <div className="pobut_body"><code>fe-stack-1</code>, <code>fe-stack-2</code>, <code>fe-stack-3</code></div>
              <p className="pobut_caption">
                Adds vertical spacing between direct children using <code>--layout-gap-1/2/3</code>
                <br />
                Use for vertical lists of content
              </p>
            </div>
            <div>
              <div className="pobut_body"><code>fe-gap-1</code>, <code>fe-gap-2</code>, <code>fe-gap-3</code></div>
              <p className="pobut_caption">
                Sets gap property for flex/grid containers using <code>--layout-gap-1/2/3</code>
                <br />
                Use with <code>flex</code> or <code>grid</code> layouts
              </p>
            </div>
            <div>
              <div className="pobut_body"><code>fe-p-10</code>, <code>fe-p-20</code>, <code>fe-p-30</code>, <code>fe-p-50</code></div>
              <p className="pobut_caption">
                Direct padding using component spacing scale (<code>--space-10/20/30/50</code>)
              </p>
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
              Edit: <code>src/app/styles/frontend.design-system.css</code> (lines 54-67) & <code>tailwind.config.mjs</code> (lines 250-285)
            </p>
          </div>
        </div>
      </section>

      {/* Quick Reference Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Quick Reference: Where to Edit</h2>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div className="fe-stack-1">
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
                <code>src/app/styles/Spacing/spacing.css</code> - Spacing utility classes
              </p>
            </div>
            <div>
              <div className="pobut_H3">Components</div>
              <p className="pobut_body">
                <code>src/app/styles/frontend.design-system.css</code> - Cards, badges, links, inputs, nav, products
                <br />
                <code>src/components/Button/button.css</code> - Button styles
                <br />
                <code>src/app/styles/Buttons/button-tokens.css</code> - Button tokens
              </p>
            </div>
            <div>
              <div className="pobut_H3">Base Styles</div>
              <p className="pobut_body">
                <code>src/app/(app)/globals.css</code> - Base HTML element styles (h1-h6, p, a, button, etc.)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
