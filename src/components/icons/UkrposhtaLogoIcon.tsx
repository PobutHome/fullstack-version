import React from 'react'
import { cn } from '@/utilities/cn'

type Props = React.ComponentProps<'svg'> & {
  size?: number
}

export const UkrposhtaLogoIcon: React.FC<Props> = ({ className, size, width, height, ...rest }) => {
  const sizedProps =
    typeof size === 'number' && Number.isFinite(size) ? { width: size, height: size } : {}

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      aria-label="Укрпошта"
      role="img"
      width={width}
      height={height}
      {...sizedProps}
      {...rest}
      className={cn('h-8 w-8', className)}
    >
      <rect x="4" y="4" width="32" height="32" rx="10" fill="#FFD500" />
      <path
        d="M20 10.5C16.962 10.5 14.5 12.962 14.5 16C14.5 19.038 16.962 21.5 20 21.5C23.038 21.5 25.5 19.038 25.5 16C25.5 12.962 23.038 10.5 20 10.5ZM20 23.1C17.514 23.1 15.318 21.883 14 20.017C14.029 22.893 15.34 25.314 17.145 27.269C18.372 28.608 19.53 29.43 20 29.7C20.47 29.43 21.628 28.608 22.855 27.269C24.66 25.314 25.971 22.893 26 20.017C24.682 21.883 22.486 23.1 20 23.1Z"
        fill="#0064B1"
      />
    </svg>
  )
}

