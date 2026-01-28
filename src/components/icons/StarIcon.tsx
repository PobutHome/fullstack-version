import clsx from 'clsx'
import React from 'react'

type Props = React.ComponentProps<'svg'> & {
  filled?: boolean
}

export function StarIcon({ filled = true, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 52 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('shrink-0', props.className)}
      aria-hidden={props['aria-hidden'] ?? true}
    >
      <path
        d="M25.6787 0L31.7406 18.6565H51.3572L35.487 30.1869L41.5489 48.8435L25.6787 37.3131L9.80851 48.8435L15.8704 30.1869L0.000185013 18.6565H19.6168L25.6787 0Z"
        fill={filled ? 'currentColor' : 'transparent'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={filled ? 0 : 2.75}
        strokeLinejoin="round"
      />
    </svg>
  )
}

