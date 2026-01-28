import clsx from 'clsx'
import React from 'react'

type Props = React.ComponentProps<'svg'> & {
  size?: number
}

export function ChevronDownIcon({ size, width, height, className, ...props }: Props) {
  const sizedProps =
    typeof size === 'number' && Number.isFinite(size) ? { width: size, height: size } : {}

  return (
    <svg
      width={width ?? 17}
      height={height ?? 9}
      viewBox="0 0 17 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...sizedProps}
      {...props}
      className={clsx(className)}
    >
      <path
        d="M14.516 0.269493C14.8894 -0.0899079 15.4802 -0.0897706 15.8534 0.269807C16.247 0.64905 16.2469 1.27937 15.8532 1.6585L9.00221 8.25489C8.88088 8.37241 8.7366 8.46568 8.57767 8.52932C8.41875 8.59297 8.24832 8.62573 8.07619 8.62573C7.90405 8.62573 7.73362 8.59297 7.5747 8.52932C7.41577 8.46568 7.27149 8.37241 7.15016 8.25489L0.295555 1.65843C-0.0982806 1.27943 -0.0983082 0.649066 0.295495 0.270027C0.668535 -0.0890254 1.25865 -0.0890521 1.63172 0.269966L6.96467 5.40202C7.35447 5.77713 7.54937 5.96469 7.77248 6.03528C7.96883 6.09741 8.17958 6.0974 8.37592 6.03526C8.59902 5.96464 8.79391 5.77706 9.18367 5.40191L14.516 0.269493Z"
        fill="currentColor"
      />
    </svg>
  )
}
