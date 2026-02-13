import React from 'react'
import { cn } from '@/utilities/cn'

type Props = React.ComponentProps<'svg'> & {
  size?: number
}

export const NovaPoshtaLogoIcon: React.FC<Props> = ({ className, size, width, height, ...rest }) => {
  const sizedProps =
    typeof size === 'number' && Number.isFinite(size) ? { width: size, height: size } : {}

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      aria-label="Нова Пошта"
      role="img"
      width={width}
      height={height}
      {...sizedProps}
      {...rest}
      className={cn('h-8 w-8', className)}
    >
      <rect x="4" y="4" width="32" height="32" rx="10" fill="#E30613" />
      <path
        d="M20 9.5 14 15.5 16.1 17.6 18.3 15.4V24.6L16.1 22.4 14 24.5 20 30.5 26 24.5 23.9 22.4 21.7 24.6V15.4L23.9 17.6 26 15.5 20 9.5Z"
        fill="white"
      />
    </svg>
  )
}

