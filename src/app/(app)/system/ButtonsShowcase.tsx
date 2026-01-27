"use client"

import { Button } from "@/components/Button"

const buttonVariants = [
  { variant: "primary" as const, label: "Primary", description: "Main CTA button (medium lime green)" },
  { variant: "secondary" as const, label: "Secondary", description: "Secondary button (light pastel green)" },
  { variant: "outline" as const, label: "Outline", description: "Outlined button with accent color" },
  { variant: "danger" as const, label: "Danger", description: "Destructive action button" },
  { variant: "more" as const, label: "More", description: "More/dropdown button (dark background, green text/border)" },
  { variant: "catalog" as const, label: "Catalog", description: "Catalog button with shadow (dark background, green text/border)" },
  { variant: "qty" as const, label: "Quantity", description: "Quantity selector button (interactive outline)" },
]

const buttonSizes = ["sm", "md", "lg"] as const

export function ButtonsShowcase() {
  return (
    <div className="grid gap-layout-gap-2">
      {/* All Variants */}
      <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
        <div className="grid gap-space-10">
          <div>
            <h3 className="text-sys-text">Button Variants</h3>
            <p className="text-sys-text-muted pobut-body">
              All available button variants with default size (lg)
            </p>
          </div>
          <div className="flex flex-wrap gap-space-10">
            {buttonVariants.map(({ variant, label, description }) => (
              <div key={variant} className="flex flex-col gap-space-10">
                <Button variant={variant}>
                  {label}
                </Button>
                <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                  <small className="font-mono text-sys-text-muted pobut-body">
                    {`variant="${variant}"`}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
        <div className="grid gap-space-10">
          <div>
            <h3 className="text-sys-text">Button Sizes</h3>
            <p className="text-sys-text-muted pobut-body">
              All available button sizes with primary variant
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-space-10">
            {buttonSizes.map((size) => (
              <div key={size} className="flex flex-col gap-space-10">
                <Button variant="primary" size={size}>
                  Size {size.toUpperCase()}
                </Button>
                <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                  <small className="font-mono text-sys-text-muted pobut-body">
                    {`size="${size}"`}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* States */}
      <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
        <div className="grid gap-space-10">
          <div>
            <h3 className="text-sys-text">Button States</h3>
            <p className="text-sys-text-muted pobut-body">
              Default, hover, active, and disabled states
            </p>
          </div>
          <div className="flex flex-wrap gap-space-10">
            <div className="flex flex-col gap-space-10">
              <Button variant="primary">Default</Button>
              <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                <small className="font-mono text-sys-text-muted pobut-body">
                  Default state
                </small>
              </div>
            </div>
            <div className="flex flex-col gap-space-10">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
                <small className="font-mono text-sys-text-muted pobut-body">
                  disabled
                </small>
              </div>
            </div>
          </div>
          <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
            <small className="font-mono text-sys-text-muted pobut-body">
              Hover and active states are shown on interaction
            </small>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="border border-sys-border rounded-radius-lg p-space-20 bg-sys-surface">
        <div className="grid gap-space-10">
          <div>
            <h3 className="text-sys-text">Usage Examples</h3>
            <p className="text-sys-text-muted pobut-body">
              Common button usage patterns
            </p>
          </div>
          <div className="grid gap-space-10">
            <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
              <small className="font-mono text-sys-text-muted pobut-body">
                {`<Button variant="primary">Click me</Button>`}
              </small>
            </div>
            <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
              <small className="font-mono text-sys-text-muted pobut-body">
                {`<Button variant="outline" size="md">Cancel</Button>`}
              </small>
            </div>
            <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
              <small className="font-mono text-sys-text-muted pobut-body">
                {`<Button variant="outline" fullWidth>Add to Cart</Button>`}
              </small>
            </div>
            <div className="bg-sys-surface-2 p-space-10 rounded-radius-md">
              <small className="font-mono text-sys-text-muted pobut-body">
                {`<Button variant="primary" icon={<Icon />} iconPosition="right">Buy Now</Button>`}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

