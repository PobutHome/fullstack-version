import clsx from 'clsx'
import React, { useId } from 'react'

type Props = React.ComponentProps<'svg'> & {
  /**
   * Fill ratio from 0..1 (supports halves like 0.5).
   * If omitted, defaults to 1 (filled).
   */
  fillRatio?: number
  /** Backwards compatible alias; prefer `fill`. */
  filled?: boolean
}

export function StarIcon({ fillRatio, filled, ...props }: Props) {
  const id = useId()
  const clipId = `star-clip-${id}`

  const fillRatioRaw = typeof fillRatio === 'number' ? fillRatio : filled === false ? 0 : 1
  const ratio = Math.max(0, Math.min(1, fillRatioRaw))

  return (
    <svg
      viewBox="0 0 52 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('shrink-0', props.className)}
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {ratio > 0 ? (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={52 * ratio} height="49" />
            </clipPath>
          </defs>

          <path
            d="M25.6787 0L31.7406 18.6565H51.3572L35.487 30.1869L41.5489 48.8435L25.6787 37.3131L9.80851 48.8435L15.8704 30.1869L0.000185013 18.6565H19.6168L25.6787 0Z"
            fill="currentColor"
            clipPath={`url(#${clipId})`}
          />
        </>
      ) : null}

      {ratio < 1 ? (
        <path
          d="M25.6787 0L31.7406 18.6565H51.3572L35.487 30.1869L41.5489 48.8435L25.6787 37.3131L9.80851 48.8435L15.8704 30.1869L0.000185013 18.6565H19.6168L25.6787 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  )
}

