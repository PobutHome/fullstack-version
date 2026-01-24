import type { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = 
  | "primary" 
  | "outline" 
  | "danger"
  | "add-to-cart-outline"
  | "add-to-cart-filled"
  | "buy-primary"
  | "buy-secondary"
  | "buy-tertiary"
  | "more"
  | "catalog"
  | "qty"

type Size = "sm" | "md" | "lg"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  width?: string | number
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export function Button({
  variant = "primary",
  size = "lg",
  fullWidth,
  width,
  icon,
  iconPosition = "left",
  className = "",
  children,
  style,
  ...props
}: Props) {
  // Base classes - using Tailwind directly
  const baseClasses = "pobut-body inline-flex items-center justify-center gap-2 outline-none cursor-pointer no-underline select-none whitespace-nowrap transition-all duration-200 rounded-radius-full focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
  
  // Size classes with responsive padding
  // Note: btn-px is responsive (changes at 48rem breakpoint automatically)
  const sizeClasses = {
    sm: "py-btn-py px-6 text-sm",
    md: "py-btn-py px-8 text-base",
    lg: "py-btn-py px-btn-px text-base", // px uses responsive btn-px variable
  }

  // Variant classes - all using Tailwind
  const variantClasses = {
    primary: "bg-sys-btn-primary-bg text-sys-btn-primary-fg border-none hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active",
    outline: "bg-transparent text-sys-btn-outline-fg border border-sys-btn-outline-border hover:bg-sys-accent-hover/10 active:bg-sys-accent-active/15 hover:text-sys-btn-outline-fg active:text-sys-btn-outline-fg-active active:border-sys-btn-outline-border-active",
    danger: "bg-sys-danger text-sys-text-inverse border-none hover:bg-sys-danger-hover active:bg-sys-danger-active",
    "add-to-cart-outline": "bg-transparent text-sys-accent border border-sys-accent hover:bg-sys-accent-hover/10 hover:border-sys-accent active:bg-sys-accent-active/15 active:text-sys-accent-active active:border-sys-accent-active",
    "add-to-cart-filled": "bg-sys-accent-active text-sys-text-inverse border-none hover:bg-sys-accent active:bg-sys-accent-active",
    "buy-primary": "bg-sys-accent text-sys-text-inverse border-none hover:bg-sys-accent-hover active:bg-sys-accent-active",
    "buy-secondary": "bg-sys-accent-secondary text-sys-text border-none hover:bg-sys-accent hover:text-sys-text-inverse active:bg-sys-accent-active active:text-sys-text-inverse",
    "buy-tertiary": "bg-sys-accent-tertiary text-sys-text-inverse border-none hover:bg-sys-accent active:bg-sys-accent-hover",
    more: "bg-color-black text-sys-accent border border-sys-accent hover:text-sys-accent-hover hover:border-sys-accent-hover active:text-sys-accent-active active:border-sys-accent-active",
    catalog: "bg-color-black text-sys-accent border border-sys-accent shadow-[0_0_0_0_var(--sys-accent)] hover:text-sys-accent-hover hover:border-sys-accent-hover hover:shadow-[0_0_0_1px_var(--sys-accent-hover)] active:bg-sys-accent active:text-sys-text-inverse active:border-sys-accent active:shadow-[0_0_0_0_var(--sys-accent)]",
    qty: "bg-transparent text-sys-btn-interactive-fg border border-sys-btn-interactive-border hover:text-sys-btn-interactive-fg-hover hover:border-sys-btn-interactive-border-hover active:text-sys-btn-interactive-fg-active active:border-sys-btn-interactive-border-active",
  }

  const widthClass = fullWidth ? "w-full" : ""

  // Icon rendering
  const iconElement = icon ? (
    <span className="inline-flex items-center text-[inherit]">
      {icon}
    </span>
  ) : null

  // Combine styles
  const combinedStyle = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
  }

  const content = (
    <>
      {icon && iconPosition === "left" && iconElement}
      {children}
      {icon && iconPosition === "right" && iconElement}
    </>
  )

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`.trim()} 
      style={combinedStyle}
      {...props}
    >
      {content}
    </button>
  )
}
