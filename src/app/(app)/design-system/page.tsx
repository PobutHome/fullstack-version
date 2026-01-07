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
            <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
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
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
              Edit: <code>src/app/styles/palette-tokens.css</code>
            </p>
          </div>

          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Semantic Colors</h3>
            <div className="fe-gap-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <div className="fe-stack-1">
                <div style={{ height: "4rem", background: "var(--sys-accent)", borderRadius: "var(--radius-lg)" }} />
                <div className="pobut_caption">
                  <strong>Accent:</strong> Green<br />
                  <code>var(--sys-accent)</code>
                </div>
              </div>
              <div className="fe-stack-1">
                <div style={{ height: "4rem", background: "var(--sys-text)", borderRadius: "var(--radius-lg)", color: "var(--sys-text-inverse)", display: "flex", alignItems: "center", justifyContent: "center" }} className="pobut_body">
                  Text
                </div>
                <div className="pobut_caption">
                  <strong>Text:</strong> Blue<br />
                  <code>var(--sys-text)</code>
                </div>
              </div>
              <div className="fe-stack-1">
                <div style={{ height: "4rem", background: "var(--sys-surface)", border: "1px solid var(--sys-border)", borderRadius: "var(--radius-lg)" }} />
                <div className="pobut_caption">
                  <strong>Surface:</strong> White<br />
                  <code>var(--sys-surface)</code>
                </div>
              </div>
              <div className="fe-stack-1">
                <div style={{ height: "4rem", background: "var(--sys-danger)", borderRadius: "var(--radius-lg)" }} />
                <div className="pobut_caption">
                  <strong>Danger:</strong> Red<br />
                  <code>var(--sys-danger)</code>
                </div>
              </div>
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
              Edit: <code>src/app/styles/semantic-tokens.css</code>
            </p>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Spacing</h2>
        <p className="pobut_caption">Layout margins and gaps are responsive: Mobile → Tablet (48rem) → Desktop (64rem)</p>
        
        <div className="fe-card fe-stack-2" style={{ padding: "var(--space-20)" }}>
          <div>
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Component Spacing Scale</h3>
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
            <h3 className="pobut_H3" style={{ marginBottom: "var(--space-20)" }}>Layout Spacing</h3>
            <div className="fe-stack-1">
              <div>
                <div className="pobut_body"><code>--layout-margin</code>: Page horizontal padding</div>
                <div className="pobut_caption">
                  Mobile: 0.625rem (10px) | Tablet: 3.125rem (50px) | Desktop: 9.375rem (150px)
                  <br />
                  Use: <code>className="fe-page"</code>
                </div>
              </div>
              <div>
                <div className="pobut_body"><code>--layout-gap-1</code>: Small vertical spacing</div>
                <div className="pobut_caption">
                  Mobile: 0.625rem (10px) | Tablet: 0.625rem (10px) | Desktop: 1.25rem (20px)
                  <br />
                  Use: <code>className="fe-stack-1"</code> or <code>className="fe-gap-1"</code>
                </div>
              </div>
              <div>
                <div className="pobut_body"><code>--layout-gap-2</code>: Medium vertical spacing</div>
                <div className="pobut_caption">
                  Mobile: 1.25rem (20px) | Tablet: 1.25rem (20px) | Desktop: 3.125rem (50px)
                  <br />
                  Use: <code>className="fe-stack-2"</code> or <code>className="fe-gap-2"</code>
                </div>
              </div>
              <div>
                <div className="pobut_body"><code>--layout-gap-3</code>: Large vertical spacing (Tablet+)</div>
                <div className="pobut_caption">
                  Tablet: 1.875rem (30px) | Desktop: falls back to gap-2
                  <br />
                  Use: <code>className="fe-stack-3"</code> or <code>className="fe-gap-3"</code>
                </div>
              </div>
            </div>
            <p className="pobut_caption" style={{ marginTop: "var(--space-20)" }}>
              Edit: <code>src/app/styles/Spacing/spacing-tokens.css</code>
            </p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="fe-stack-2">
        <h2 className="pobut_H2">Buttons</h2>
        <p className="pobut_caption">All buttons use rounded pill shape (border-radius: 9999px)</p>
        
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
                  Height: 3.25rem | Padding: 2.25rem | Background: Green | Text: White
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
                  Background: Transparent | Border: Green | Text: Green
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
                  Background: Red | Text: White
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
                  Background: Transparent | Border: Blue | Text: Blue (for +/- controls)
                  <br />
                  Edit: <code>src/components/Button/button.css</code>
                </p>
              </div>
            </div>
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
