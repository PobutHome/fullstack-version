"use server"

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { InnerSection } from "@/components/InnerSection"
import { Page } from "@/components/Page"
import { Section } from "@/components/Section"

function DsCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`fe-card p-space-20 grid gap-layout-gap-2 ${className}`.trim()}>{children}</div>
}

function DsCodeBlock({ children }: { children: string }) {
  return (
    <pre className="m-0 p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border max-w-full overflow-x-auto whitespace-pre-wrap break-words overflow-wrap-anywhere leading-relaxed">
      <small>{children}</small>
    </pre>
  )
}

export default async function DesignSystemPage() {
  return (
    <Page data-app="frontend" className="pt-space-20 pb-space-50">
      {/* Hero Section */}
      <Section id="hero">
        <Container>
          <InnerSection>
            <h1>Design System</h1>
            <p>
              Complete reference guide for all design tokens, components, and utilities
              used in the frontend application.
            </p>
            <div className="grid gap-layout-gap-1 mt-layout-gap-1">
              <small>
                All styles are scoped to{" "}
                <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
                  data-app="frontend"
                </code>
              </small>
              <small>
                Customize values in:{" "}
                <code className="bg-sys-surface-2 px-1 py-0.5 rounded-radius-sm">
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
              <div className="grid gap-layout-gap-1">
                <h3>Table of contents</h3>
                <div className="flex flex-wrap gap-space-10 items-center">
                  {[
                    ["Conventions", "conventions"],
                    ["How to Write Styles with Tailwind", "tailwind-styling-guide"],
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
                    ["Tailwind Utilities", "tailwind-utilities"],
                    ["Quick reference", "quick-reference"],
                  ].map(([label, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="fe-link px-1 py-0.5 rounded-radius-full border border-sys-border bg-sys-surface"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid gap-layout-gap-2">
                <div className="grid gap-layout-gap-1">
                  <h3>Layout convention (canonical)</h3>
                  <div className="grid gap-2">
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

                <div className="grid gap-layout-gap-1">
                  <h3>Where do styles go? (Tailwind-First Approach)</h3>
                  <div className="grid gap-2">
                    <small>
                      <strong>🎯 Primary Method - Tailwind CSS:</strong> Write styles directly in components using
                      Tailwind utility classes. All design tokens are available as classes (e.g., <code>p-space-20</code>,
                      <code>bg-sys-surface</code>, <code>pobut-body</code>). See{" "}
                      <a href="#tailwind-styling-guide" className="fe-link">"How to Write Styles with Tailwind"</a> for details.
                    </small>
                    <small>
                      <strong>Design tokens (source of truth):</strong>{" "}
                      <code>src/app/styles/*-tokens.css</code> (palette, semantic, spacing, fonts, etc.)
                      <br />
                      All tokens are available as Tailwind classes via <code>tailwind.config.mjs</code>.
                    </small>
                    <small>
                      <strong>Reusable UI patterns:</strong> Global CSS classes in{" "}
                      <code>src/app/styles/&lt;Group&gt;/*.css</code> (links/cards/badges/nav/header/etc).
                      These use <code>fe-*</code> prefixes (e.g., <code>fe-card</code>, <code>fe-link</code>).
                      Imported once by <code>src/app/(app)/globals.css</code>.
                    </small>
                    <small>
                      <strong>Per-component CSS (only when needed):</strong> <code>src/components/*/Component.css</code>
                      Use only for complex animations, pseudo-elements, or styles that can't be done with Tailwind.
                      Always use design tokens (CSS variables) in your CSS.
                    </small>
                    <small>
                      <strong>Component code:</strong> <code>src/components/*</code> (React primitives like{" "}
                      <code>Page</code>, <code>Container</code>, <code>InnerSection</code>, <code>Button</code>)
                      <br />
                      All components use Tailwind classes directly.
                    </small>
                    <small>
                      <strong>Rule of thumb:</strong> Start with Tailwind. Only create CSS files if you need something
                      that can't be expressed with utility classes. If a style is reused across 2+ routes, it should
                      be a reusable component or a global <code>fe-*</code> class.
                    </small>
                  </div>
                </div>

                <div className="grid gap-layout-gap-1">
                  <h3>Tailwind CSS First (Recommended)</h3>
                  <DsCodeBlock>{`// ✅ PREFERRED: Use Tailwind utility classes directly
// src/components/MyCard/index.tsx
export function MyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="fe-card p-space-20 bg-sys-surface border border-sys-border rounded-radius-lg">
      {children}
    </div>
  )
}

// All design tokens are available as Tailwind classes:
// - Spacing: p-space-20, gap-layout-gap-2, mt-space-10
// - Colors: bg-sys-surface, text-sys-text, border-sys-border
// - Typography: pobut-H1, pobut-body, pobut-caption
// - Border radius: rounded-radius-lg, rounded-radius-full
// - Shadows: shadow-shadow-md
// - Transitions: transition-all duration-transition-base`}</DsCodeBlock>
                  <div className="opacity-85">
                    <small>
                      <strong>Why Tailwind first?</strong> Faster development, better consistency, easier maintenance.
                      All design tokens are available as utility classes. Only use CSS files for complex animations or
                      styles that can't be expressed with utilities.
                    </small>
                  </div>
                </div>

                <div className="grid gap-layout-gap-1">
                  <h3>CSS Modules (when needed)</h3>
                  <DsCodeBlock>{`// Use CSS Modules only for complex styles that can't be done with Tailwind
// src/components/MyCard/MyCard.css
.root {
  background: var(--sys-card-bg);
  border: 1px solid var(--sys-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20);
  
  /* Complex animation or pseudo-element styles */
  &::before {
    content: '';
    /* ... */
  }
}

// src/components/MyCard/index.tsx
import "./MyCard.css"

export function MyCard({ children }: { children: React.ReactNode }) {
  return <div className="root">{children}</div>
}`}</DsCodeBlock>
                  <div className="opacity-85">
                    <small>
                      Use CSS Modules only when you need complex animations, pseudo-elements, or styles that
                      can't be expressed with Tailwind utilities. Always use design tokens (CSS variables) in your CSS.
                    </small>
                  </div>
                </div>
              </div>
            </DsCard>
          </InnerSection>
        </Container>
      </Section>

      {/* How to Write Styles with Tailwind CSS */}
      <Section id="tailwind-styling-guide">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>How to Write Styles with Tailwind CSS</h2>
            <small className="mb-layout-gap-2 block">
              Complete guide to writing clean, maintainable styles using Tailwind CSS utility classes. Learn the patterns
              used throughout the codebase and best practices for combining classes.
            </small>

            <div className="fe-card p-space-20 grid gap-layout-gap-2">
              {/* Core Principles */}
              <div>
                <h3 className="mb-space-20">Core Principles</h3>
                <div className="grid gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">1. Use Design Token Classes</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>
                        <strong>✅ DO:</strong> Always use design token classes (e.g., <code>p-space-20</code>, <code>bg-sys-surface</code>)
                        instead of arbitrary values.
                      </small>
                      <DsCodeBlock>{`// ✅ Correct - uses design tokens
<div className="p-space-20 bg-sys-surface text-sys-text rounded-radius-lg">
  Content
</div>

// ❌ Wrong - arbitrary values
<div className="p-5 bg-white text-black rounded-lg">
  Content
</div>`}</DsCodeBlock>
                    </div>
                  </div>

                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">2. Combine Classes Logically</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>
                        Group related classes together: layout → spacing → colors → typography → effects
                      </small>
                      <DsCodeBlock>{`// ✅ Good organization
<div className="
  grid gap-layout-gap-2
  p-space-20
  bg-sys-surface border border-sys-border
  rounded-radius-lg
  pobut-body text-sys-text
  shadow-shadow-sm
">
  Content
</div>

// Or on one line (also fine):
<div className="grid gap-layout-gap-2 p-space-20 bg-sys-surface border border-sys-border rounded-radius-lg pobut-body text-sys-text shadow-shadow-sm">
  Content
</div>`}</DsCodeBlock>
                    </div>
                  </div>

                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">3. Use the `cn` Utility for Conditional Classes</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>
                        Import <code>cn</code> from <code>@/utilities/cn</code> to merge classes safely and handle conditionals.
                      </small>
                      <DsCodeBlock>{`import { cn } from "@/utilities/cn"

export function Button({ variant, className, ...props }) {
  const baseClasses = "pobut-body inline-flex items-center justify-center"
  const variantClasses = {
    primary: "bg-sys-accent text-sys-text-on-accent",
    outline: "bg-transparent border border-sys-border text-sys-text"
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        className // Allows parent to override
      )}
      {...props}
    >
      Click me
    </button>
  )
}

// cn() automatically:
// - Merges conflicting classes (last one wins)
// - Handles undefined/null values
// - Combines arrays and objects`}</DsCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Patterns */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Component Patterns</h3>
                <div className="grid gap-layout-gap-2">
                  <div>
                    <h4 className="mb-space-10">Pattern 1: Simple Component</h4>
                    <DsCodeBlock>{`// Simple component with static classes
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={\`fe-card p-space-20 bg-sys-surface border border-sys-border rounded-radius-lg \${className}\`.trim()}>
      {children}
    </div>
  )
}

// Usage
<Card>Content</Card>
<Card className="bg-sys-surface-2">Custom background</Card>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Pattern 2: Component with Variants</h4>
                    <DsCodeBlock>{`// Component with variant-based styling (like Button)
export function Badge({ variant = "default", children }: { variant?: "default" | "success" | "warning"; children: React.ReactNode }) {
  const baseClasses = "inline-flex items-center px-space-10 py-space-10 rounded-radius-full pobut-caption"
  
  const variantClasses = {
    default: "bg-sys-surface-2 text-sys-text border border-sys-border",
    success: "bg-sys-success text-sys-text-inverse",
    warning: "bg-sys-warning text-sys-text"
  }
  
  return (
    <span className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </span>
  )
}

// Usage
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Pattern 3: Component with Conditional Classes</h4>
                    <DsCodeBlock>{`import { cn } from "@/utilities/cn"

export function Alert({ 
  type = "info", 
  dismissible,
  children 
}: { 
  type?: "info" | "success" | "warning" | "error"
  dismissible?: boolean
  children: React.ReactNode 
}) {
  const baseClasses = "p-space-20 rounded-radius-lg border"
  
  const typeClasses = {
    info: "bg-sys-surface-interactive text-sys-text-on-interactive border-sys-border-interactive",
    success: "bg-sys-success/10 text-sys-text border-sys-success",
    warning: "bg-sys-warning/10 text-sys-text border-sys-warning",
    error: "bg-sys-danger/10 text-sys-text border-sys-danger"
  }
  
  return (
    <div className={cn(baseClasses, typeClasses[type])}>
      {children}
      {dismissible && (
        <button className="ml-auto">×</button>
      )}
    </div>
  )
}`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Pattern 4: Layout Component (Real Example from Codebase)</h4>
                    <DsCodeBlock>{`// From src/components/Container/index.tsx
export function Container({ className = "", children, style, ...props }) {
  // Using Tailwind classes with design tokens
  const combinedClassName = \`w-full max-w-[100rem] mx-auto px-[clamp(1.25rem,4vw,5rem)] \${className}\`.trim()
  
  return (
    <div className={combinedClassName} style={style} {...props}>
      {children}
    </div>
  )
}

// From src/components/Button/index.tsx
export function Button({ variant = "primary", size = "lg", className = "", ...props }) {
  // Base classes - all using Tailwind
  const baseClasses = "pobut-body inline-flex items-center justify-center gap-2 outline-none cursor-pointer rounded-radius-full transition-all duration-200"
  
  // Size classes
  const sizeClasses = {
    sm: "py-btn-py px-6 text-sm",
    md: "py-btn-py px-8 text-base",
    lg: "py-btn-py px-btn-px text-base"
  }
  
  // Variant classes
  const variantClasses = {
    primary: "bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover",
    outline: "bg-transparent text-sys-btn-outline-fg border border-sys-btn-outline-border"
  }
  
  return (
    <button 
      className={\`\${baseClasses} \${sizeClasses[size]} \${variantClasses[variant]} \${className}\`.trim()}
      {...props}
    >
      {props.children}
    </button>
  )
}`}</DsCodeBlock>
                  </div>
                </div>
              </div>

              {/* When to Use Inline Styles */}
              <div>
                <h3 className="mb-space-20 mt-space-20">When to Use Inline Styles vs Tailwind</h3>
                <div className="grid gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">✅ Use Tailwind Classes For:</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>• Spacing (padding, margin, gap)</small>
                      <small>• Colors (background, text, border)</small>
                      <small>• Typography (font size, weight, line height)</small>
                      <small>• Layout (display, flex, grid, positioning)</small>
                      <small>• Borders and border radius</small>
                      <small>• Shadows and effects</small>
                      <small>• Responsive breakpoints</small>
                      <small>• Hover, focus, and other states</small>
                    </div>
                  </div>

                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">⚠️ Use Inline Styles For:</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>• Dynamic values (computed from props/state)</small>
                      <small>• CSS custom properties that change at runtime</small>
                      <small>• Complex calculations (clamp, calc with variables)</small>
                      <DsCodeBlock>{`// ✅ Good use of inline styles
<div style={{ 
  width: \`\${width}px\`,
  '--custom-gap': \`\${gap}px\`
}}>
  Content
</div>

// ✅ Good use of inline styles with CSS variables
<div style={{ 
  padding: 'var(--space-20)',
  gap: 'var(--layout-gap-2)',
  display: 'grid'
}}>
  {/* When you need to override CSS variables dynamically */}
</div>

// ❌ Bad - should use Tailwind
<div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
  Content
</div>

// ✅ Better
<div className="p-space-20 bg-sys-surface">
  Content
</div>`}</DsCodeBlock>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Design */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Responsive Design Patterns</h3>
                <div className="grid gap-layout-gap-2">
                  <div>
                    <h4 className="mb-space-10">Using Responsive Layout Gaps</h4>
                    <DsCodeBlock>{`// ✅ BEST: Use responsive layout gap classes (automatically adapts)
<div className="grid gap-layout-gap-2">
  {/* Mobile: 20px, Tablet: 20px, Desktop: 50px */}
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ Also works with margin
<div className="mt-layout-gap-2">
  {/* Responsive margin */}
</div>

// ❌ Avoid: Manual responsive classes for spacing
<div className="gap-5 md:gap-8 lg:gap-12">
  {/* Use layout-gap-* instead */}
</div>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Using Responsive Typography</h4>
                    <DsCodeBlock>{`// ✅ BEST: Use pobut-* classes (automatically responsive)
<h1 className="pobut-H1">Heading</h1>
{/* Mobile: 20px, Tablet: 32px, Desktop: 40px */}

<p className="pobut-body">Body text</p>
{/* Mobile: 11px, Tablet: 16px, Desktop: 20px */}

// ❌ Avoid: Manual responsive typography
<h1 className="text-xl md:text-2xl lg:text-4xl">
  {/* Use pobut-H1 instead */}
</h1>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Custom Responsive Patterns</h4>
                    <DsCodeBlock>{`// For custom responsive needs, use Tailwind breakpoints
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-layout-gap-2
">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Breakpoints available:
// sm: 40rem (640px)
// md: 48rem (768px)
// lg: 64rem (1024px)
// xl: 80rem (1280px)
// 2xl: 86rem (1376px)`}</DsCodeBlock>
                  </div>
                </div>
              </div>

              {/* Common Patterns */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Common Patterns & Examples</h3>
                <div className="grid gap-layout-gap-2">
                  <div>
                    <h4 className="mb-space-10">Card Pattern</h4>
                    <DsCodeBlock>{`// Standard card with Tailwind
<div className="fe-card p-space-20 bg-sys-surface border border-sys-border rounded-radius-lg shadow-shadow-sm">
  <h3 className="pobut-H3 mb-space-10">Card Title</h3>
  <p className="pobut-body text-sys-text-muted">Card content</p>
</div>

// Card with hover effect
<div className="fe-card p-space-20 bg-sys-surface border border-sys-border rounded-radius-lg transition-all duration-transition-base hover:bg-sys-surface-2 hover:shadow-shadow-md">
  Hover me
</div>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Button Pattern</h4>
                    <DsCodeBlock>{`// Button with all states
<button className="
  pobut-body
  px-btn-px py-btn-py
  bg-sys-accent text-sys-text-on-accent
  rounded-radius-full
  transition-all duration-transition-base
  hover:bg-sys-accent-hover
  active:bg-sys-accent-active
  focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click me
</button>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Grid Layout Pattern</h4>
                    <DsCodeBlock>{`// Responsive grid with proper spacing
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-layout-gap-2">
  {items.map(item => (
    <div key={item.id} className="fe-card p-space-20">
      {item.content}
    </div>
  ))}
</div>

// Flex layout with gap
<div className="flex flex-wrap gap-layout-gap-1 items-center">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Form Input Pattern</h4>
                    <DsCodeBlock>{`// Input with proper styling
<input
  type="text"
  className="
    w-full
    p-space-10
    bg-sys-input-bg text-sys-input-fg
    border border-sys-input-border
    rounded-radius-lg
    pobut-body
    transition-all duration-transition-base
    focus:border-sys-input-border-focus focus:outline-none
    placeholder:text-sys-text-muted
  "
  placeholder="Enter text..."
/>

// Input with icon (using flex)
<div className="relative flex items-center">
  <span className="absolute left-space-10">🔍</span>
  <input className="pl-space-30 pr-space-10 ..." />
</div>`}</DsCodeBlock>
                  </div>
                </div>
              </div>

              {/* Best Practices Summary */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Best Practices Summary</h3>
                <div className="grid gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">✅ DO</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>• Use design token classes (<code>p-space-20</code>, <code>bg-sys-surface</code>)</small>
                      <small>• Use <code>cn()</code> utility for conditional/merged classes</small>
                      <small>• Group related classes logically</small>
                      <small>• Use responsive layout gap classes (<code>gap-layout-gap-2</code>)</small>
                      <small>• Use responsive typography classes (<code>pobut-H1</code>, <code>pobut-body</code>)</small>
                      <small>• Combine <code>fe-*</code> classes with Tailwind utilities</small>
                      <small>• Use inline styles only for dynamic/computed values</small>
                      <small>• Allow className prop for parent overrides</small>
                    </div>
                  </div>

                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h4 className="mb-space-10">❌ DON'T</h4>
                    <div className="grid gap-layout-gap-1">
                      <small>• Don't use arbitrary values (<code>p-5</code>, <code>bg-white</code>)</small>
                      <small>• Don't mix spacing systems (use <code>space-*</code> for padding, <code>layout-gap-*</code> for gaps)</small>
                      <small>• Don't hardcode responsive breakpoints for spacing (use responsive tokens)</small>
                      <small>• Don't use inline styles for static values</small>
                      <small>• Don't create CSS files for simple styles (use Tailwind)</small>
                      <small>• Don't forget to trim className strings</small>
                      <small>• Don't use raw palette colors (use <code>sys-*</code> semantic colors)</small>
                    </div>
                  </div>
                </div>
              </div>

              <small className="mt-space-20 block">
                <strong>Remember:</strong> Tailwind CSS is the primary styling method. Use CSS files only when you need
                complex animations, pseudo-elements, or styles that can't be expressed with utility classes. Always use
                design tokens (CSS variables) in your styles.
              </small>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Layout Section */}
      <Section id="layout">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Layout</h2>
            <small className="mb-layout-gap-2 block">
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
                      <div className="mt-space-10 p-space-20 bg-sys-surface rounded-radius-lg">
                        <small><strong>Inner</strong> (any layout)</small>
                        <div className="opacity-80">
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
              className="p-space-20 grid gap-layout-gap-2"
            >
              {/* inner components (any layout) */}
            </div>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}`}</DsCodeBlock>
              <div className="opacity-80">
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
                <DsCodeBlock>{`import { Page } from "@/components/Page"
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
}`}</DsCodeBlock>
                <div className="opacity-85">
                  <small>
                    If you need a tighter/looser stack inside InnerSection, override{" "}
                    <code>--fe-inner-gap</code>:{" "}
                    <code>{`style={{ ["--fe-inner-gap" as any]: "var(--layout-gap-1)" }}`}</code>
                  </small>
                </div>
              </div>

              <div className="grid gap-layout-gap-1">
                <h3>Recipe B: Full-width band + contained content</h3>
                <DsCodeBlock>{`<Section id="promo" style={{ background: "var(--sys-surface-accent)" }}>
  {/* full width background/band */}
  <Container>
    <InnerSection>
      {/* constrained content */}
    </InnerSection>
  </Container>
</Section>`}</DsCodeBlock>
              </div>

              <div className="opacity-85">
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
              <small className="mt-2 block">
                Mobile: 1.25rem (20px) | Tablet: 2rem (32px) | Desktop: 2.5rem (40px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h1&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <h2>Heading 2 — Unbounded Regular</h2>
              <small className="mt-2 block">
                Mobile: 1rem (16px) | Tablet: 1.5rem (24px) | Desktop: 2rem (32px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h2&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <h3>Heading 3 — Unbounded Bold</h3>
              <small className="mt-2 block">
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 700 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;h3&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <p>Body — Unbounded Regular</p>
              <small className="mt-2 block">
                Mobile: 0.6875rem (11px) | Tablet: 1rem (16px) | Desktop: 1.25rem (20px)
                <br />
                Weight: 400 | Line Height: 100% | Letter Spacing: 3%
                <br />
                Use: <code>&lt;p&gt;</code> tag | Edit: <code>src/app/styles/typography.css</code>
              </small>
            </div>
            
            <div>
              <small>Caption — Unbounded Regular (Muted Color)</small>
              <small className="mt-2 block">
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
    <Section>
    <div>
                <h3 className="mb-space-20 mt-space-20">Color Utilities</h3>
                <small className="mb-space-20 block">
                  All semantic colors use the <code>sys-*</code> prefix. These reference design tokens and should be used instead of raw palette colors.
                </small>

                <div className="grid gap-layout-gap-2">
                  <div>
                    <h4 className="mb-space-10">Background Colors</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg border border-sys-border">
                        <small><code>bg-sys-surface</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>bg-sys-surface-2</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface-accent rounded-radius-lg">
                        <small className="text-sys-text-on-accent"><code>bg-sys-surface-accent</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface-interactive rounded-radius-lg">
                        <small className="text-sys-text-on-interactive"><code>bg-sys-surface-interactive</code></small>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Text Colors</h4>
                    <div className="grid gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg">
                        <p className="text-sys-text"><code>text-sys-text</code></p>
                      </div>
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg">
                        <p className="text-sys-text-muted"><code>text-sys-text-muted</code></p>
                      </div>
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg">
                        <p className="text-sys-text-subtle"><code>text-sys-text-subtle</code></p>
                      </div>
                      <div className="p-space-10 bg-sys-accent rounded-radius-lg">
                        <p className="text-sys-text-on-accent"><code>text-sys-text-on-accent</code></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Border Colors</h4>
                    <div className="grid gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg border-2 border-sys-border">
                        <small><code>border-sys-border</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg border-2 border-sys-border-strong">
                        <small><code>border-sys-border-strong</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg border-2 border-sys-border-interactive">
                        <small><code>border-sys-border-interactive</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-surface rounded-radius-lg border-2 border-sys-border-subtle">
                        <small><code>border-sys-border-subtle</code></small>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Accent & Interactive Colors</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-accent rounded-radius-lg">
                        <small className="text-sys-text-on-accent"><code>bg-sys-accent</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-accent-secondary rounded-radius-lg">
                        <small><code>bg-sys-accent-secondary</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-accent-tertiary rounded-radius-lg">
                        <small className="text-sys-text-on-accent"><code>bg-sys-accent-tertiary</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-interactive rounded-radius-lg">
                        <small className="text-sys-text-on-interactive"><code>bg-sys-interactive</code></small>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-space-10">State Colors</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-danger rounded-radius-lg">
                        <small className="text-sys-text-inverse"><code>bg-sys-danger</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-warning rounded-radius-lg">
                        <small><code>bg-sys-warning</code></small>
                      </div>
                      <div className="p-space-10 bg-sys-success rounded-radius-lg">
                        <small className="text-sys-text-inverse"><code>bg-sys-success</code></small>
                      </div>
                    </div>
                  </div>

                  <DsCodeBlock>{`// Background colors
<div className="bg-sys-surface">Surface</div>
<div className="bg-sys-surface-2">Surface 2</div>
<div className="bg-sys-surface-accent">Accent Surface</div>
<div className="bg-sys-accent">Accent</div>
<div className="bg-sys-interactive">Interactive</div>

// Text colors
<p className="text-sys-text">Default text</p>
<p className="text-sys-text-muted">Muted text</p>
<p className="text-sys-text-subtle">Subtle text</p>
<p className="text-sys-text-on-accent">Text on accent</p>

// Border colors
<div className="border border-sys-border">Default border</div>
<div className="border border-sys-border-strong">Strong border</div>
<div className="border border-sys-border-interactive">Interactive border</div>

// Hover states (automatically available)
<div className="bg-sys-accent hover:bg-sys-accent-hover">Hover example</div>
<div className="border-sys-border hover:border-sys-border-hover">Border hover</div>

// All available sys-* colors:
// sys-surface, sys-surface-2, sys-surface-accent, sys-surface-interactive
// sys-text, sys-text-muted, sys-text-subtle, sys-text-on-accent
// sys-accent, sys-accent-secondary, sys-accent-tertiary
// sys-interactive, sys-border, sys-border-strong, sys-border-interactive
// sys-danger, sys-warning, sys-success`}</DsCodeBlock>
                </div>
              </div>

    </Section>

      {/* Spacing Section */}
      <Section id="spacing">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Spacing System</h2>
            <p className="mb-layout-gap-2">
              Complete guide to using spacing tokens and utilities. All spacing is mobile-first and responsive.
            </p>
            <small className="mb-layout-gap-2 block">
              <strong>Mobile-First Approach:</strong> Base styles are for mobile, then enhanced for Tablet (≥48rem / 768px) and Desktop (≥64rem / 1024px).
            </small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          {/* Figma Spacing Reference */}
          <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg mb-space-20">
            <h3 className="mb-space-20">Figma Design Spacing Reference</h3>
            <div className="grid gap-layout-gap-1">
              <p><strong>Desktop:</strong> Margin 150px | Spacing 20px/50px</p>
              <p><strong>Tablet:</strong> Margin 50px | Spacing 10px/20px/30px</p>
              <p><strong>Mobile:</strong> Margin 10px | Spacing 10px/20px</p>
              <small className="mt-space-10 block">
                <strong>What this means:</strong>
                <br />
                • <strong>Margin</strong> = Layout margin token (available for custom use, not used by Page component)
                <br />
                • <strong>Spacing</strong> = Vertical gaps between elements (sections, cards, etc.)
              </small>
            </div>
          </div>

          <div>
            <h3 className="mb-space-20">Component Spacing Scale</h3>
            <small className="mb-space-20 block">Raw spacing values for component-level padding/margins</small>
            <div className="fe-gap-tight grid">
              <div className="flex items-center gap-space-20">
                <div className="w-space-10 h-space-10 bg-sys-accent rounded" />
                <div>
                  <p><code>--space-10</code>: 0.625rem (10px)</p>
                  <small>Use: <code>padding: var(--space-10)</code> or <code className="text-sys-text-muted">p-space-10</code></small>
                </div>
              </div>
              <div className="flex items-center gap-space-20">
                <div className="w-space-20 h-space-20 bg-sys-accent rounded" />
                <div>
                  <p><code>--space-20</code>: 1.25rem (20px)</p>
                  <small>Use: <code>padding: var(--space-20)</code> or <code className="text-sys-text-muted">p-space-20</code></small>
                </div>
              </div>
              <div className="flex items-center gap-space-20">
                <div className="w-space-30 h-space-30 bg-sys-accent rounded" />
                <div>
                  <p><code>--space-30</code>: 1.875rem (30px) - Tablet only</p>
                  <small>Use: <code>padding: var(--space-30)</code> or <code className="text-sys-text-muted">p-space-30</code></small>
                </div>
              </div>
              <div className="flex items-center gap-space-20">
                <div className="w-space-50 h-space-50 bg-sys-accent rounded" />
                <div>
                  <p><code>--space-50</code>: 3.125rem (50px) - Desktop only</p>
                  <small>Use: <code>padding: var(--space-50)</code> or <code className="text-sys-text-muted">p-space-50</code></small>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-space-20">Layout Spacing (From Figma)</h3>
            <small className="mb-space-20 block">These values match your Figma design specifications</small>
            
            <div className="baseGap grid">
              <div>
                    <p className="mb-space-10"><code>--layout-margin</code>: Layout margin token (available for custom use)</p>
                <div className="fe-gap-tight pl-space-20 grid">
                  <small>📱 <strong>Mobile:</strong> 0.625rem (10px)</small>
                  <small>📱 <strong>Tablet:</strong> 3.125rem (50px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 9.375rem (150px)</small>
                  <small className="mt-space-10 block">
                    <strong>Note:</strong> Page component no longer uses this padding. Use Container component for width constraints.
                  </small>
                </div>
              </div>
              
              <div>
                    <p className="mb-space-10"><code>--layout-gap-1</code>: Small vertical spacing</p>
                <div className="fe-gap-tight pl-space-20 grid">
                  <small>📱 <strong>Mobile:</strong> 0.625rem (10px)</small>
                  <small>📱 <strong>Tablet:</strong> 0.625rem (10px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 1.25rem (20px)</small>
                  <small className="mt-space-10 block">
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-1)</code> or use <code className="text-sys-text-muted">gap-layout-gap-1</code> (flex/grid) or set <code>--fe-inner-gap</code> for InnerSection rhythm
                  </small>
                </div>
              </div>
              
              <div>
                    <p className="mb-space-10"><code>--layout-gap-2</code>: Medium vertical spacing</p>
                <div className="fe-gap-tight pl-space-20 grid">
                  <small>📱 <strong>Mobile:</strong> 1.25rem (20px)</small>
                  <small>📱 <strong>Tablet:</strong> 1.25rem (20px)</small>
                  <small>🖥️ <strong>Desktop:</strong> 3.125rem (50px)</small>
                  <small className="mt-space-10 block">
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-2)</code> or use <code className="text-sys-text-muted">gap-layout-gap-2</code> (flex/grid) or use the default InnerSection rhythm
                  </small>
                </div>
              </div>
              
              <div>
                    <p className="mb-space-10"><code>--layout-gap-3</code>: Large vertical spacing (Tablet+)</p>
                <div className="pl-space-20 grid gap-layout-gap-1">
                  <small>📱 <strong>Mobile:</strong> Not available (falls back to gap-2)</small>
                  <small>📱 <strong>Tablet:</strong> 1.875rem (30px)</small>
                  <small>🖥️ <strong>Desktop:</strong> Falls back to gap-2 (50px)</small>
                  <small className="mt-space-10 block">
                    <strong>Where to use:</strong> set <code>gap: var(--layout-gap-3)</code> or use <code className="text-sys-text-muted">gap-layout-gap-3</code> (flex/grid) or adjust <code>--fe-page-gap</code> for page-level spacing
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
            <h4 className="mb-space-20">Visual Example: How These Are Used</h4>
            <div className="baseGap grid">
              <div>
                    <p className="mb-space-10">1. <strong>Page Container</strong> (uses <code>--layout-margin</code>):</p>
                <div className="p-space-10 bg-sys-surface border-2 border-dashed border-sys-border-strong rounded-radius-lg">
                  <div className="text-center">
                    <div className="inline-block px-space-20 py-space-10 bg-sys-accent text-sys-text-inverse rounded-radius-lg">
                      Page Content Area
                    </div>
                    <small className="mt-space-10 block">
                      ← <code>--layout-margin</code> (10px/50px/150px) → 
                    </small>
                  </div>
                </div>
              </div>
              
              <div>
                    <p className="mb-space-10">2. <strong>Vertical Stacking</strong> (uses <code>--layout-gap-*</code>):</p>
                <div className="p-space-10 bg-sys-surface border-2 border-dashed border-sys-border-strong rounded-radius-lg grid gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-accent-secondary rounded-radius-lg text-center"><small>Section 1</small></div>
                  <div className="p-space-20 bg-sys-accent-secondary rounded-radius-lg text-center"><small>Section 2</small></div>
                  <div className="p-space-20 bg-sys-accent-secondary rounded-radius-lg text-center"><small>Section 3</small></div>
                  <small className="text-center mt-space-10 block">
                    Gap between sections = <code>--layout-gap-2</code> (20px/20px/50px)
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Semantic InnerSection vertical gap helper */}
          <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
            <h4 className="mb-space-20">
              Semantic InnerSection Gap (Y axis)
            </h4>
            <div className="grid gap-layout-gap-2">
              <div className="fe-gap-base grid">
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
              <div className="mt-space-20 p-space-20 bg-sys-surface rounded-radius-lg border border-dashed border-sys-border grid gap-layout-gap-2">
                <p>Example: two InnerSections with semantic gap (via class, no inline spacing)</p>
                <div className="rounded-radius-lg border border-sys-border p-space-20 grid gap-layout-gap-1">
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
          <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
            <h4 className="mb-space-20">How to Use Spacing in Your Components</h4>
            
            <div className="grid gap-layout-gap-2">
              {/* 1. Between Sections */}
              <div>
                <h5 className="mb-space-10">1. Spacing Between Sections</h5>
                <small className="mb-space-10 block">
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
                <h5 className="mb-space-10">2. Component Padding</h5>
                <small className="mb-space-10 block">
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
                <h5 className="mb-space-10">3. Layout Gaps (Flex/Grid)</h5>
                <small className="mb-space-10 block">
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
                <h5 className="mb-space-10">4. Vertical Stacking (Stack Utilities)</h5>
                <small className="mb-space-10 block">
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
                <h5 className="mb-space-10">5. Page Top Padding</h5>
                <small className="mb-space-10 block">
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
                <h5 className="mb-space-10">❌ Common Mistakes to Avoid</h5>
                <div className="grid gap-layout-gap-1">
                  <small><strong>1. Don't use hardcoded pixel values:</strong></small>
                  <small className="pl-space-20">
                    ❌ <code>padding: 20px</code><br />
                    ✅ <code>padding: var(--space-20)</code>
                  </small>
                  
                  <small><strong>2. Don't mix spacing systems:</strong></small>
                  <small className="pl-space-20">
                    ❌ <code>gap: 20px</code> when you should use <code>gap: var(--layout-gap-2)</code><br />
                    ✅ Use <code>--space-*</code> for padding/margin, <code>--layout-gap-*</code> for gaps
                  </small>
                  
                  <small><strong>3. Don't forget responsive spacing:</strong></small>
                  <small className="pl-space-20">
                    ❌ Fixed spacing that doesn't adapt to screen size<br />
                    ✅ Use responsive tokens that change at breakpoints
                  </small>
                  
                  <small><strong>4. Don't add spacing to first InnerSection:</strong></small>
                  <small className="pl-space-20">
                    ❌ <code>&lt;InnerSection className="fe-gap-inner-section-y"&gt;</code> on first section<br />
                    ✅ Only add spacing class to subsequent sections
                  </small>
                </div>
              </div>
            </div>
          </div>

          <small className="mt-space-20 block">
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
            <small className="mb-layout-gap-2 block">
              All Buttons use rounded pill shape (border-radius: 9999px). All use semantic
              tokens from <code>semantic-tokens.css</code>
            </small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div>
            <h3 className="mb-space-20">Add to Cart Buttons (Додати в кошик)</h3>
            <div className="grid gap-layout-gap-2">
              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
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

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
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
            <h3 className="mb-space-20 mt-space-20">Buy Buttons (Купити)</h3>
            <div className="grid gap-layout-gap-2">
              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="buy-primary">Купити</Button>
                  <Button variant="buy-primary" disabled>Купити</Button>
                </div>
                <small>
                  <code>variant="buy-primary"</code> or <code>className="fe-btn fe-btn--buy-primary"</code>
                  <br />
                  Background: Bright Lime Green (#72cb1a) | Text: White
                </small>
              </div>

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="buy-secondary">Купити</Button>
                  <Button variant="buy-secondary" disabled>Купити</Button>
                </div>
                <small>
                  <code>variant="buy-secondary"</code> or <code>className="fe-btn fe-btn--buy-secondary"</code>
                  <br />
                  Background: Light Pastel Green (#beff7e) | Text: Blue (changes to white on hover)
                </small>
              </div>

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
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
            <h3 className="mb-space-20 mt-space-20">More Button (Більше)</h3>
            <div className="grid gap-layout-gap-1">
              <div className="flex flex-wrap gap-layout-gap-2">
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
            <h3 className="mb-space-20 mt-space-20">Catalog Button (Каталог)</h3>
            <div className="grid gap-layout-gap-2">
              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
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
            <h3 className="mb-space-20 mt-space-20">Legacy Variants</h3>
            <div className="grid gap-layout-gap-2">
              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="primary" disabled>Primary Disabled</Button>
                </div>
                <small>
                  <code>variant="primary"</code> or <code>className="fe-btn fe-btn--primary"</code>
                </small>
              </div>

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="outline" disabled>Outline Disabled</Button>
                </div>
                <small>
                  <code>variant="outline"</code> or <code>className="fe-btn fe-btn--outline"</code>
                </small>
              </div>

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="danger" disabled>Danger Disabled</Button>
                </div>
                <small>
                  <code>variant="danger"</code> or <code>className="fe-btn fe-btn--danger"</code>
                </small>
              </div>

              <div className="grid gap-layout-gap-1">
                <div className="flex flex-wrap gap-layout-gap-2">
                  <Button variant="qty">Quantity Button</Button>
                  <Button variant="qty" disabled>Quantity Disabled</Button>
                </div>
                <small>
                  <code>variant="qty"</code> or <code>className="fe-btn fe-btn--qty"</code>
                </small>
              </div>
            </div>
          </div>

          <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
              <small>
              <strong>Usage:</strong> Import and use the Button component:
              <br />
              <code className="text-sm">{`import { Button } from '@/components/Button'`}</code>
              <br />
              <code className="text-sm">{`<Button variant="add-to-cart-outline">Додати в кошик</Button>`}</code>
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
            <small className="mb-layout-gap-2 block">Interactive link styles with hover and active states</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div className="grid gap-layout-gap-1">
            <div>
              <a className="fe-link pobut-body" href="#">Regular Link</a>
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
            <small className="mb-layout-gap-2 block">Search input with icon support</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div className="grid gap-layout-gap-1">
        <div className="fe-search max-w-[42rem]">
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
            <small className="mb-layout-gap-2 block">Card components with different variants</small>
        
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-layout-gap-2">
          <div className="fe-card p-space-20 grid gap-layout-gap-1">
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

          <div className="fe-card fe-card--soft p-space-20 grid gap-layout-gap-1">
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
            <small className="mb-layout-gap-2 block">Inline badge component for labels and tags</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div className="grid gap-layout-gap-1">
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
            <small className="mb-layout-gap-2 block">Complete product card component example</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
        <div className="fe-product max-w-[22rem]">
            <div className="h-40 bg-sys-surface-2 flex items-center justify-center">
              <small>Product Image</small>
            </div>
          <div className="fe-product__body grid gap-layout-gap-1">
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
            <small className="mb-layout-gap-2 block">Header and navigation bar components</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div className="grid gap-layout-gap-2">
            <div>
              <h3 className="mb-space-20">Header</h3>
              <div className="fe-header p-space-20 rounded-radius-lg">
                <div className="fe-topbar">
                  <h2>Logo</h2>
                  <div className="bg-sys-surface-2 p-2 rounded"><small>Search Bar Area</small></div>
                  <small>User Icons</small>
                </div>
              </div>
              <small className="mt-space-20 block">
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
              <h3 className="mb-space-20">Navigation Bar</h3>
              <div className="fe-nav p-space-20 rounded-radius-lg">
                <div className="fe-nav__row">
                  <a className="fe-nav__link pobut-body" href="#">Оптовим клієнтам</a>
                  <a className="fe-nav__link pobut-body" href="#">Каталог</a>
                  <a className="fe-nav__link pobut-body" href="#">Акції</a>
                  <a className="fe-nav__link pobut-body" href="#">Відгуки</a>
                </div>
              </div>
              <small className="mt-space-20 block">
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
            <small className="mb-layout-gap-2 block">Use system spacing tokens (CSS vars) for custom layouts</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          <div className="grid gap-layout-gap-1">
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
            <small className="mt-space-20 block">
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
            <small className="mb-layout-gap-2 block">Structural components for consistent page layouts</small>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2">
          {/* Page Component */}
          <div>
            <h3 className="mb-space-20">Page Component</h3>
            <small className="mb-space-20 block">
              Simple page wrapper with no padding. Use Container component explicitly inside when you need width constraints.
            </small>

            <div className="grid gap-layout-gap-2">
              {/* Page with Container */}
              <div className="grid gap-layout-gap-1">
                    <p className="mb-space-10"><strong>Page with Container</strong></p>
                <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
                  <Page>
                    <Container>
                      <div className="fe-card p-space-20 grid gap-layout-gap-2">
                        <p>Page Content</p>
                        <small>Container wraps content (max-width: 1440px)</small>
                      </div>
                    </Container>
                  </Page>
                </div>
                <small>
                  <code>{`<Page>`}</code>
                  <br />
                  <code className="pl-4">{`<Container>...</Container>`}</code>
                  <br />
                  Container must be used explicitly inside Page
                </small>
              </div>

              {/* Page with Full-Width Section */}
              <div className="grid gap-layout-gap-1">
                    <p className="mb-space-10"><strong>Page with Full-Width Section</strong></p>
                <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
                  <Page>
                    <div className="fe-card p-space-20 bg-sys-surface-accent grid gap-layout-gap-2">
                      <p className="text-sys-text-on-accent">Full-Width Section</p>
                      <small className="text-sys-text-on-accent">This section spans full page width</small>
                    </div>
                    <Container>
                      <div className="fe-card p-space-20 grid gap-layout-gap-2">
                        <p>Contained Section</p>
                        <small>This section is constrained by Container</small>
                      </div>
                    </Container>
                  </Page>
                </div>
                <small>
                  <code>{`<Page>`}</code>
                  <br />
                  <code className="pl-4">{`<div>Full-width content</div>`}</code>
                  <br />
                  <code className="pl-4">{`<Container>...</Container>`}</code>
                  <br />
                  Mix full-width and contained sections as needed
                </small>
              </div>
            </div>

            <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
              <small>
                <strong>Usage:</strong>
                <br />
                <code className="text-sm">{`import { Page } from '@/components/Page'`}</code>
                <br />
                <code className="text-sm">{`import { Container } from '@/components/Container'`}</code>
                <br />
                <code className="text-sm">{`<Page>`}</code>
                <br />
                <code className="text-sm pl-4">{`<Container>...</Container>`}</code>
                <br />
                <code className="text-sm">{`</Page>`}</code>
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
          <div className="mt-space-20">
            <h3 className="mb-space-20">Container Component</h3>
            <small className="mb-space-20 block">
              Centered container with max-width constraints. Use for content that should be constrained in width.
            </small>

            <div className="grid gap-layout-gap-2">
              {/* Default Container */}
              <div className="grid gap-layout-gap-1">
                    <p className="mb-space-10"><strong>Default Container</strong></p>
                <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
                  <Container>
                    <div className="fe-card p-space-20">
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

            <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
              <small>
                <strong>Usage:</strong>
                <br />
                <code className="text-sm">{`import { Container } from '@/components/Container'`}</code>
                <br />
                <code className="text-sm">{`<Container>...</Container>`}</code>
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
          <div className="mt-space-20">
            <h3 className="mb-space-20">Creating a New Page</h3>
            <small className="mb-space-20 block">
              Simply create a new page file and return <code>{`<Page>`}</code> with your content. Use Container explicitly when needed.
            </small>
            <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-dashed border-sys-border">
              <Page>
                <Container>
                  <div className="grid gap-layout-gap-2">
                    <div className="fe-card p-space-20 grid gap-layout-gap-2">
                      <h3>Example Page</h3>
                      <p>Page wrapper with explicit Container.</p>
                      <small>Container handles width constraints, Page is just a wrapper.</small>
                    </div>
                  </div>
                </Container>
              </Page>
            </div>
            <div className="mt-space-20 p-space-20 bg-sys-surface-2 rounded-radius-lg">
              <small>
                <strong>Example Page File:</strong>
                <br />
                <code className="text-sm block mt-space-10">
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

      {/* Tailwind Utility Classes Section */}
      <Section id="tailwind-utilities">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2>Tailwind Utility Classes</h2>
            <small className="mb-layout-gap-2 block">
              Complete guide to using all Tailwind utility classes in your application. All classes use design tokens and are responsive where applicable.
            </small>

            <div className="fe-card p-space-20 grid gap-layout-gap-2">
              {/* Spacing Utilities */}
              <div>
                <h3 className="mb-space-20">Spacing Utilities</h3>
                <small className="mb-space-20 block">
                  Use these classes for padding, margin, and gap. Layout gap classes are <strong>responsive</strong> and automatically adapt at breakpoints.
                </small>

                <div className="grid gap-layout-gap-2">
                  <div>
                    <h4 className="mb-space-10">Component Spacing (Static)</h4>
                    <div className="grid gap-layout-gap-1">
                      <div className="p-space-10 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>p-space-10</code> - Padding 10px (all screens)</small>
                      </div>
                      <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>p-space-20</code> - Padding 20px (all screens)</small>
                      </div>
                      <div className="p-space-30 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>p-space-30</code> - Padding 30px (tablet+ only)</small>
                      </div>
                      <div className="p-space-50 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>p-space-50</code> - Padding 50px (desktop only)</small>
                      </div>
                    </div>
                    <DsCodeBlock>{`// Padding examples
<div className="p-space-10">Padding 10px</div>
<div className="p-space-20">Padding 20px</div>
<div className="px-space-20 py-space-10">Horizontal 20px, Vertical 10px</div>
<div className="mt-space-20 mb-space-10">Margin top 20px, bottom 10px</div>

// Available classes:
// p-space-10, p-space-20, p-space-30, p-space-50
// px-space-*, py-space-*, pt-space-*, pb-space-*, pl-space-*, pr-space-*
// m-space-*, mx-space-*, my-space-*, mt-space-*, mb-space-*, ml-space-*, mr-space-*`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Layout Gaps (Responsive)</h4>
                    <div className="grid gap-layout-gap-1">
                      <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>gap-layout-gap-1</code> - Responsive: 10px / 10px / 20px</small>
                      </div>
                      <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>gap-layout-gap-2</code> - Responsive: 20px / 20px / 50px</small>
                      </div>
                      <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                        <small><code>gap-layout-gap-3</code> - Responsive: fallback / 30px / fallback</small>
                      </div>
                    </div>
                    <DsCodeBlock>{`// Gap examples (responsive - automatically adapts at breakpoints!)
<div className="grid gap-layout-gap-1">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className="flex gap-layout-gap-2">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Available classes:
// gap-layout-gap-1 (10px / 10px / 20px)
// gap-layout-gap-2 (20px / 20px / 50px)
// gap-layout-gap-3 (fallback / 30px / fallback)

// Also works with margin:
// mt-layout-gap-2, mb-layout-gap-2, etc.`}</DsCodeBlock>
                  </div>

                  <div>
                    <h4 className="mb-space-10">Semantic Spacing Scale</h4>
                    <DsCodeBlock>{`// Semantic spacing tokens (for advanced use)
<div className="p-spacing-xs">Extra Small</div>
<div className="p-spacing-sm">Small</div>
<div className="p-spacing-md">Medium</div>
<div className="p-spacing-lg">Large</div>
<div className="p-spacing-xl">Extra Large</div>

// Available: spacing-3xs, spacing-2xs, spacing-xs, spacing-sm, 
// spacing-md, spacing-lg, spacing-xl, spacing-2xl, spacing-3xl, 
// spacing-4xl, spacing-5xl, spacing-6xl`}</DsCodeBlock>
                  </div>
                </div>
              </div>

              
              {/* Typography Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Typography Utilities</h3>
                <small className="mb-space-20 block">
                  Typography classes use the <code>pobut-*</code> prefix. These are <strong>responsive</strong> and automatically adapt at breakpoints.
                </small>

                <div className="grid gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h1 className="pobut-H1">Heading 1 (pobut-H1)</h1>
                    <small>Responsive: Mobile 20px → Tablet 32px → Desktop 40px</small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h2 className="pobut-H2">Heading 2 (pobut-H2)</h2>
                    <small>Responsive: Mobile 16px → Tablet 24px → Desktop 32px</small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <h3 className="pobut-H3">Heading 3 (pobut-H3)</h3>
                    <small>Responsive: Mobile 11px → Tablet 16px → Desktop 20px</small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <p className="pobut-body">Body text (pobut-body)</p>
                    <small>Responsive: Mobile 11px → Tablet 16px → Desktop 20px</small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small className="pobut-caption">Caption text (pobut-caption)</small>
                    <small className="block mt-space-10">Responsive: Mobile 7px → Tablet 9px → Desktop 10px</small>
                  </div>
                </div>

                <DsCodeBlock>{`// Typography classes (responsive - automatically adapts at breakpoints!)
<h1 className="pobut-H1">Heading 1</h1>
<h2 className="pobut-H2">Heading 2</h2>
<h3 className="pobut-H3">Heading 3</h3>
<p className="pobut-body">Body text</p>
<small className="pobut-caption">Caption text</small>

// Available classes:
// .pobut-H1 - Heading 1 (20px / 32px / 40px)
// .pobut-H2 - Heading 2 (16px / 24px / 32px)
// .pobut-H3 - Heading 3 (11px / 16px / 20px)
// .pobut-body - Body text (11px / 16px / 20px)
// .pobut-caption - Caption text (7px / 9px / 10px)

// All classes include:
// - Font family (Unbounded)
// - Font weight
// - Line height
// - Letter spacing
// - Responsive font sizes`}</DsCodeBlock>
              </div>

              {/* Border Radius Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Border Radius Utilities</h3>
                <small className="mb-space-20 block">
                  Border radius classes use design tokens for consistent rounded corners.
                </small>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-accent rounded-radius-sm">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-sm</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-accent rounded-radius-md">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-md</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-accent rounded-radius-lg">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-lg</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-accent rounded-radius-xl">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-xl</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-accent rounded-radius-2xl">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-2xl</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-accent rounded-radius-full">
                    <small className="text-sys-text-on-accent"><code>rounded-radius-full</code> (pill)</small>
                  </div>
                </div>

                <DsCodeBlock>{`// Border radius classes
<div className="rounded-radius-sm">Small radius</div>
<div className="rounded-radius-md">Medium radius</div>
<div className="rounded-radius-lg">Large radius</div>
<div className="rounded-radius-xl">Extra large radius</div>
<div className="rounded-radius-2xl">2XL radius</div>
<div className="rounded-radius-full">Full radius (pill)</div>

// Also available: rounded-t-*, rounded-b-*, rounded-l-*, rounded-r-*
// Example: rounded-t-radius-lg (top corners only)

// Standard Tailwind classes also work:
// rounded-lg, rounded-md, rounded-sm (uses --radius variable)`}</DsCodeBlock>
              </div>

              {/* Shadow Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Shadow Utilities</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-2">
                  <div className="p-space-20 bg-sys-surface rounded-radius-lg shadow-shadow-sm border border-sys-border">
                    <small><code>shadow-shadow-sm</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-surface rounded-radius-lg shadow-shadow-md border border-sys-border">
                    <small><code>shadow-shadow-md</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-surface rounded-radius-lg shadow-shadow-lg border border-sys-border">
                    <small><code>shadow-shadow-lg</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-surface rounded-radius-lg shadow-shadow-xl border border-sys-border">
                    <small><code>shadow-shadow-xl</code></small>
                  </div>
                </div>

                <DsCodeBlock>{`// Shadow classes
<div className="shadow-shadow-sm">Small shadow</div>
<div className="shadow-shadow-md">Medium shadow</div>
<div className="shadow-shadow-lg">Large shadow</div>
<div className="shadow-shadow-xl">Extra large shadow</div>
<div className="shadow-shadow-none">No shadow</div>`}</DsCodeBlock>
              </div>

              {/* Z-Index Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Z-Index Utilities</h3>
                <DsCodeBlock>{`// Z-index classes (for layering)
<div className="z-z-base">Base layer</div>
<div className="z-z-dropdown">Dropdown</div>
<div className="z-z-sticky">Sticky element</div>
<div className="z-z-fixed">Fixed element</div>
<div className="z-z-modal-backdrop">Modal backdrop</div>
<div className="z-z-modal">Modal</div>
<div className="z-z-popover">Popover</div>
<div className="z-z-tooltip">Tooltip</div>

// Available classes:
// z-z-base, z-z-dropdown, z-z-sticky, z-z-fixed
// z-z-modal-backdrop, z-z-modal, z-z-popover, z-z-tooltip`}</DsCodeBlock>
              </div>

              {/* Transition Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Transition Utilities</h3>
                <DsCodeBlock>{`// Transition duration classes
<div className="transition-all duration-transition-fast">Fast transition</div>
<div className="transition-all duration-transition-base">Base transition</div>
<div className="transition-all duration-transition-slow">Slow transition</div>

// Available classes:
// duration-transition-fast, duration-transition-base, duration-transition-slow

// Common usage:
<button className="bg-sys-accent hover:bg-sys-accent-hover transition-all duration-transition-base">
  Hover me
</button>`}</DsCodeBlock>
              </div>

              {/* Button Color Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Button Color Utilities</h3>
                <small className="mb-space-20 block">
                  Button-specific color tokens for custom button implementations.
                </small>

                <div className="grid gap-layout-gap-2">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-1">
                    <div className="p-space-10 bg-btn-primary-bg rounded-radius-lg">
                      <small className="text-btn-primary-fg"><code>bg-btn-primary-bg</code></small>
                    </div>
                    <div className="p-space-10 bg-btn-secondary-bg rounded-radius-lg">
                      <small className="text-btn-secondary-fg"><code>bg-btn-secondary-bg</code></small>
                    </div>
                    <div className="p-space-10 bg-btn-tertiary-bg rounded-radius-lg">
                      <small className="text-btn-tertiary-fg"><code>bg-btn-tertiary-bg</code></small>
                    </div>
                  </div>
                </div>

                <DsCodeBlock>{`// Button background colors
<button className="bg-btn-primary-bg text-btn-primary-fg">
  Primary Button
</button>
<button className="bg-btn-secondary-bg text-btn-secondary-fg">
  Secondary Button
</button>

// Hover states
<button className="bg-btn-primary-bg hover:bg-btn-primary-bg-hover">
  Hover me
</button>

// System button tokens (sys-btn-*)
<button className="bg-sys-btn-primary-bg text-sys-btn-primary-fg">
  System Primary
</button>

// Available classes:
// bg-btn-primary-bg, bg-btn-secondary-bg, bg-btn-tertiary-bg
// bg-btn-outline-bg, bg-btn-interactive-bg, bg-btn-danger-bg
// bg-sys-btn-primary-bg, bg-sys-btn-secondary-bg
// All have -hover and -active variants`}</DsCodeBlock>
              </div>

              {/* Card & Chip Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Card & Chip Utilities</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-layout-gap-2">
                  <div className="p-space-20 bg-card-bg border border-card-border rounded-radius-lg">
                    <small><code>bg-card-bg border-card-border</code></small>
                  </div>
                  <div className="p-space-20 bg-sys-card-bg border border-sys-card-border rounded-radius-lg">
                    <small><code>bg-sys-card-bg border-sys-card-border</code></small>
                  </div>
                  <div className="p-space-10 bg-chip-bg border border-chip-border rounded-radius-lg">
                    <small className="text-chip-fg"><code>bg-chip-bg text-chip-fg</code></small>
                  </div>
                </div>

                <DsCodeBlock>{`// Card colors
<div className="bg-card-bg border border-card-border">
  Card content
</div>

// Chip/Badge colors
<span className="bg-chip-bg text-chip-fg border border-chip-border">
  Badge
</span>

// System variants
<div className="bg-sys-card-bg border border-sys-card-border">
  System card
</span>`}</DsCodeBlock>
              </div>

              {/* Input Utilities */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Input Utilities</h3>
                <div className="grid gap-layout-gap-1">
                  <input 
                    type="text" 
                    placeholder="Input example"
                    className="p-space-10 bg-sys-input-bg text-sys-input-fg border border-sys-input-border rounded-radius-lg focus:border-sys-input-border-focus outline-none"
                  />
                </div>

                <DsCodeBlock>{`// Input styling
<input 
  className="bg-sys-input-bg text-sys-input-fg border border-sys-input-border 
             focus:border-sys-input-border-focus"
/>

// Available classes:
// bg-sys-input-bg, text-sys-input-fg
// border-sys-input-border
// border-sys-input-border-hover (hover state)
// border-sys-input-border-focus (focus state)`}</DsCodeBlock>
              </div>

              {/* Complete Example */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Complete Example</h3>
                <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                  <div className="grid gap-layout-gap-2">
                    <h2 className="pobut-H2 text-sys-text">Card Title</h2>
                    <p className="pobut-body text-sys-text-muted">
                      This card demonstrates multiple Tailwind utility classes working together.
                    </p>
                    <div className="flex gap-layout-gap-1 flex-wrap">
                      <button className="px-space-20 py-space-10 bg-sys-accent text-sys-text-on-accent rounded-radius-full pobut-body hover:bg-sys-accent-hover transition-all duration-transition-base">
                        Primary Action
                      </button>
                      <button className="px-space-20 py-space-10 bg-sys-surface border border-sys-border text-sys-text rounded-radius-full pobut-body hover:bg-sys-surface-2 transition-all duration-transition-base">
                        Secondary Action
                      </button>
                    </div>
                  </div>
                </div>

                <DsCodeBlock>{`// Complete example using multiple utilities
<div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
  <div style={{ display: "grid", gap: "var(--layout-gap-2)" }}>
    <h2 className="pobut-H2 text-sys-text">Card Title</h2>
    <p className="pobut-body text-sys-text-muted">
      Card description
    </p>
    <div style={{ display: "flex", gap: "var(--layout-gap-1)" }}>
      <button className="px-space-20 py-space-10 
                          bg-sys-accent text-sys-text-on-accent 
                          rounded-radius-full pobut-body 
                          hover:bg-sys-accent-hover 
                          transition-all duration-transition-base">
        Primary Action
      </button>
    </div>
  </div>
</div>

// This example uses:
// - Spacing: p-space-20, gap-layout-gap-2, px-space-20, py-space-10
// - Colors: bg-sys-surface-2, border-sys-border, text-sys-text
// - Typography: pobut-H2, pobut-body
// - Border radius: rounded-radius-lg, rounded-radius-full
// - Transitions: transition-all, duration-transition-base
// - Hover states: hover:bg-sys-accent-hover`}</DsCodeBlock>
              </div>

              {/* Best Practices */}
              <div>
                <h3 className="mb-space-20 mt-space-20">Best Practices</h3>
                <div className="grid gap-layout-gap-1">
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small>
                      <strong>✅ DO:</strong> Use semantic color classes (<code>bg-sys-surface</code>, <code>text-sys-text</code>) instead of raw palette colors
                    </small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small>
                      <strong>✅ DO:</strong> Use responsive spacing classes (<code>gap-layout-gap-2</code>) for automatic breakpoint adaptation
                    </small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small>
                      <strong>✅ DO:</strong> Use typography classes (<code>pobut-H1</code>, <code>pobut-body</code>) for consistent text styling
                    </small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small>
                      <strong>❌ DON'T:</strong> Use hardcoded values like <code>bg-[#ffffff]</code> or <code>p-[20px]</code> - use design tokens instead
                    </small>
                  </div>
                  <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                    <small>
                      <strong>❌ DON'T:</strong> Mix spacing systems - use <code>space-*</code> for padding/margin, <code>layout-gap-*</code> for gaps
                    </small>
                  </div>
                </div>
              </div>

              {/* Quick Reference: All Tailwind Color Classes */}
              <div>
                <h4 className="mb-space-20 mt-space-20">Quick Reference: All Tailwind Color Classes</h4>
                <div className="p-space-20 bg-sys-surface-2 rounded-radius-lg border border-sys-border">
                  <div className="grid gap-layout-gap-2">
                    <div>
                      <p className="mb-space-10"><strong>Background Colors:</strong></p>
                      <div className="grid gap-layout-gap-1">
                        <small><code>bg-sys-surface</code>, <code>bg-sys-surface-2</code>, <code>bg-sys-surface-accent</code>, <code>bg-sys-surface-interactive</code></small>
                        <small><code>bg-sys-accent</code>, <code>bg-sys-accent-secondary</code>, <code>bg-sys-accent-tertiary</code></small>
                        <small><code>bg-sys-interactive</code>, <code>bg-sys-danger</code>, <code>bg-sys-warning</code>, <code>bg-sys-success</code></small>
                        <small><code>bg-color-blue</code>, <code>bg-color-green</code>, <code>bg-color-white</code>, <code>bg-color-black</code></small>
                      </div>
                    </div>
                    <div>
                      <p className="mb-space-10"><strong>Text Colors:</strong></p>
                      <div className="grid gap-layout-gap-1">
                        <small><code>text-sys-text</code>, <code>text-sys-text-muted</code>, <code>text-sys-text-subtle</code></small>
                        <small><code>text-sys-text-on-accent</code>, <code>text-sys-text-on-interactive</code>, <code>text-sys-text-inverse</code></small>
                      </div>
                    </div>
                    <div>
                      <p className="mb-space-10"><strong>Border Colors:</strong></p>
                      <div className="grid gap-layout-gap-1">
                        <small><code>border-sys-border</code>, <code>border-sys-border-strong</code>, <code>border-sys-border-interactive</code>, <code>border-sys-border-subtle</code></small>
                      </div>
                    </div>
                    <div>
                      <p className="mb-space-10"><strong>Hover/Active States:</strong></p>
                      <div className="grid gap-layout-gap-1">
                        <small><code>hover:bg-sys-accent-hover</code>, <code>active:bg-sys-accent-active</code></small>
                        <small><code>hover:text-sys-text-hover</code>, <code>hover:border-sys-border-hover</code></small>
                        <small>All colors have <code>-hover</code> and <code>-active</code> variants available</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <small className="mt-space-20 block">
                <strong>Edit Tailwind config:</strong> <code>tailwind.config.mjs</code><br />
                <strong>All tokens are defined in:</strong> <code>src/app/styles/*-tokens.css</code>
              </small>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Quick Reference Section */}
      <Section id="quick-reference">
        <Container>
          <InnerSection className="fe-gap-inner-section-y">
            <h2 >Quick Reference: Where to Edit</h2>
        
        <div className="fe-card p-space-20 grid gap-layout-gap-2 mt-layout-gap-1">
          <div className="grid gap-layout-gap-1">
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
