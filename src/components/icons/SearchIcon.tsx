import clsx from 'clsx'
import React from 'react'

type Props = React.ComponentProps<'svg'> & {
  size?: number
}

export function SearchIcon({ size, width, height, className, ...props }: Props) {
  const sizedProps =
    typeof size === 'number' && Number.isFinite(size) ? { width: size, height: size } : {}

  return (
    <svg
      width={width ?? 30}
      height={height ?? 30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...sizedProps}
      {...props}
      className={clsx(className)}
    >
      <path
        d="M13 21C17.4183 21 21 17.4183 21 13C21 8.58174 17.4183 5 13 5C8.58174 5 5 8.58174 5 13C5 17.4183 8.58174 21 13 21Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M19 19L26 26"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
