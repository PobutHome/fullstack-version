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
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export function Button({
  variant = "primary",
  size = "lg",
  fullWidth,
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...props
}: Props) {
  const base = "fe-btn"
  
  // Map variant to CSS class
  const variantClass = 
    variant === "primary" ? "fe-btn--primary"
    : variant === "outline" ? "fe-btn--outline"
    : variant === "danger" ? "fe-btn--danger"
    : variant === "add-to-cart-outline" ? "fe-btn--add-to-cart-outline"
    : variant === "add-to-cart-filled" ? "fe-btn--add-to-cart-filled"
    : variant === "buy-primary" ? "fe-btn--buy-primary"
    : variant === "buy-secondary" ? "fe-btn--buy-secondary"
    : variant === "buy-tertiary" ? "fe-btn--buy-tertiary"
    : variant === "more" ? "fe-btn--more"
    : variant === "catalog" ? "fe-btn--catalog"
    : "fe-btn--qty"

  // Size classes (optional - can be handled via CSS variables)
  const sizeClass = 
    size === "sm" ? "fe-btn--sm"
    : size === "md" ? "fe-btn--md"
    : "fe-btn--lg"

  const widthClass = fullWidth ? "fe-btn--full-width" : ""

  // Icon rendering
  const iconElement = icon ? (
    <span className="fe-btn__icon" style={{ display: "inline-flex", alignItems: "center" }}>
      {icon}
    </span>
  ) : null

  const content = (
    <>
      {icon && iconPosition === "left" && iconElement}
      {children}
      {icon && iconPosition === "right" && iconElement}
    </>
  )

  return (
    <button 
      className={`${base} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()} 
      {...props}
    >
      {content}
    </button>
  )
}
