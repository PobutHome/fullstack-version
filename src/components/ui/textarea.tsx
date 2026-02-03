import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/cn'

const textareaVariants = cva(
  [
    // Base (neutral / shadcn default)
    'border-input placeholder:text-muted-foreground',
    'focus-visible:border-ring focus-visible:ring-ring/50',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
    'focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        primaryFrontend: [
          'bg-sys-input-bg text-sys-input-fg border-sys-accent hover:border-sys-accent-hover',
          'placeholder:text-sys-text-muted',
          // Add focus styles on mouse focus too (avoid browser default glow)
          'focus:border-sys-accent-hover focus:ring-[3px] focus:ring-[color:color-mix(in_srgb,var(--sys-accent)_25%,transparent)] focus:outline-none',
          'focus-visible:border-sys-accent-hover focus-visible:ring-[3px] focus-visible:ring-[color:color-mix(in_srgb,var(--sys-accent)_25%,transparent)] focus-visible:outline-none',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        textareaVariants({ variant }),
        className,
      )}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
