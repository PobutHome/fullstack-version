import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'more'
  | 'catalog'
  | 'qty'
  | 'productCardButton'
  | 'productCardIcon'
  | 'categoryItem'
  | 'accordionToggle'
  | 'pagination'
  | 'paginationActive'

type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  width?: string | number
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  textClassName?: string
}

export function Button({
  asChild = false,
  variant = 'primary',
  size = 'lg',
  fullWidth,
  width,
  icon,
  iconPosition = 'left',
  textClassName,
  className = '',
  children,
  style,
  ...props
}: Props) {
  const Comp = asChild ? Slot : 'button'

  // Base classes - using Tailwind directly
  const baseClasses = [
    textClassName || 'pobut-body',
    'inline-flex items-center justify-center gap-2 outline-none cursor-pointer no-underline select-none whitespace-nowrap transition-all duration-200 rounded-radius-full focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' ')

  // Size classes with responsive padding
  // Note: btn-px is responsive (changes at 48rem breakpoint automatically)
  const sizeClasses = {
    sm: 'py-btn-py px-6 text-sm',
    md: 'py-btn-py px-8 text-base',
    lg: 'py-btn-py px-btn-px text-base', // px uses responsive btn-px variable
  }

  // Variant classes - all using Tailwind sys- classes
  const variantClasses = {
    // Primary: medium lime green with white text (main CTA)
    primary:
      'bg-sys-accent text-sys-text-inverse border-none hover:bg-sys-accent-hover active:bg-sys-accent-active',
    // Secondary: light pastel lime green with white text
    secondary:
      'bg-sys-accent-secondary text-sys-text-inverse border-none hover:bg-sys-accent hover:text-sys-text-inverse active:bg-sys-accent-active active:text-sys-text-inverse',
    // Outline: transparent background with bright lime green text and thin border (pill shape)
    outline:
      'bg-sys-btn-outline-bg text-sys-btn-outline-fg border border-sys-btn-outline-border hover:bg-sys-btn-outline-bg-hover hover:text-sys-btn-outline-fg-hover hover:border-sys-btn-outline-border-hover active:bg-sys-btn-outline-bg-active active:text-sys-btn-outline-fg-active active:border-sys-btn-outline-border-active',
    // Danger: destructive action button
    danger:
      'bg-sys-danger text-sys-text-on-danger border-none hover:bg-sys-danger-hover active:bg-sys-danger-active',
    // More button: dark background with bright green text and border
    more: 'bg-black text-sys-accent border border-sys-accent hover:text-sys-accent-hover hover:border-sys-accent-hover active:text-sys-accent-active active:border-sys-accent-active',
    // Catalog button: dark background with shadow effects
    catalog:
      'bg-black text-sys-accent border border-sys-accent shadow-[0_0_0_0_var(--sys-accent)] hover:text-sys-accent-hover hover:border-sys-accent-hover hover:shadow-[0_0_0_1px_var(--sys-accent-hover)] active:bg-sys-accent active:text-sys-text-inverse active:border-sys-accent active:shadow-[0_0_0_0_var(--sys-accent)]',
    // Quantity selector button
    qty: 'bg-transparent text-sys-btn-interactive border border-sys-btn-interactive hover:text-sys-btn-interactive-hover hover:border-sys-btn-interactive-hover active:text-sys-btn-interactive-active active:border-sys-btn-interactive-active',
    // Product card CTA button
    productCardButton:
      'bg-transparent text-sys-accent border border-sys-accent hover:bg-sys-accent hover:text-sys-text-on-accent active:bg-sys-accent-active active:text-sys-text-on-accent',
    // Product card icon-only button
    productCardIcon:
      'bg-sys-accent text-sys-text-on-accent border border-sys-accent hover:bg-sys-accent-hover hover:border-sys-accent-hover active:bg-sys-accent-active active:border-sys-accent-active',
    // Category list item
    categoryItem:
      'bg-transparent text-sys-text border border-transparent hover:bg-sys-surface-2 active:bg-sys-surface-2',
    // Accordion toggle
    accordionToggle:
      'bg-sys-accent text-sys-text-on-accent border border-sys-accent hover:bg-sys-accent-hover active:bg-sys-accent-active',
    // Pagination buttons
    pagination:
      'bg-sys-surface text-sys-text border border-sys-border hover:bg-sys-surface-2 active:bg-sys-surface-2',
    paginationActive:
      'bg-sys-accent text-sys-text-on-accent border border-sys-accent hover:bg-sys-accent-hover active:bg-sys-accent-active',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  // Icon rendering
  const iconElement = icon ? (
    <span className="inline-flex items-center text-inherit">{icon}</span>
  ) : null

  // Combine styles
  const combinedStyle = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
  }

  const content = asChild ? (
    children
  ) : (
    <>
      {icon && iconPosition === 'left' && iconElement}
      {children}
      {icon && iconPosition === 'right' && iconElement}
    </>
  )

  return (
    <Comp
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`.trim()}
      style={combinedStyle}
      {...props}
    >
      {content}
    </Comp>
  )
}
