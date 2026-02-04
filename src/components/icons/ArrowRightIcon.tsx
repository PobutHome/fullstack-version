import clsx from 'clsx'
import React from 'react'

export function ArrowRightIcon(props: React.ComponentProps<'svg'>) {
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
        d="M26.25 15H3.75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 7.5L26.25 15L18.75 22.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

