import clsx from 'clsx'
import React from 'react'

export function QuotesIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 392 349"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('shrink-0', props.className)}
      aria-hidden={props['aria-hidden'] ?? true}
    >
      <path
        d="M0 217.061C0 152.747 8.99517 106.402 26.9855 78.0285C44.9758 48.7087 77.6425 22.6992 124.986 0L178.957 80.8659C143.923 100.728 123.565 117.279 117.884 130.52C113.15 142.816 110.783 154.165 110.783 164.569H177.536V349H0V217.061ZM213.043 217.061C213.043 152.747 221.565 106.402 238.609 78.0285C256.599 48.7087 289.739 22.6992 338.029 0L392 80.8659C356.966 100.728 336.609 117.279 330.928 130.52C325.246 142.816 322.406 154.165 322.406 164.569H390.58V349H213.043V217.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

