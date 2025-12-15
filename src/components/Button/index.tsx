import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "outline" | "danger"
type Size = "md" | "lg"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

export function Button({
  variant = "primary",
  size = "lg",
  fullWidth,
  className = "",
  ...props
}: Props) {
  const base = "fe-btn"
  const v =
    variant === "primary"
      ? "fe-btn--primary"
      : variant === "outline"
      ? "fe-btn--outline"
      : "fe-btn--danger"

  // you can later connect size to tokens too
  const s = size === "md" ? "h-[2.75rem] px-[1.75rem]" : "h-[3.25rem] px-[2.25rem]"
  const w = fullWidth ? "w-full" : ""

  return <button className={`${base} ${v} ${s} ${w} ${className}`} {...props} />
}
