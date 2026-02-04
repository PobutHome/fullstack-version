import clsx from 'clsx'
import React from 'react'

export function ArrowLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('w-6 h-6 shrink-0', props.className)}
      aria-hidden={props['aria-hidden'] ?? true}
    >
      <path
        d="M3.62451 15H26.1245"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1245 22.5L3.62451 15L11.1245 7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

