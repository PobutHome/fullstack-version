import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/cn'

const inputVariants = cva(
  [
    // Base (neutral / shadcn default)
    'border-input bg-background file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none',
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        primaryFrontend: [
          'bg-sys-input-bg text-sys-input-fg border-sys-accent hover:border-sys-accent-hover',
          'placeholder:text-sys-text-muted selection:bg-sys-accent selection:text-sys-text-on-accent',
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

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ variant }),
        className,
      )}
      {...props}
    />
  )
}

export { Input, inputVariants }
