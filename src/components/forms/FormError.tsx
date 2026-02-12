import clsx from 'clsx'

type Props = {
  message?: string
  as?: 'p' | 'span'
  className?: string
}

export const FormError: React.FC<Props> = ({ message, as, className }) => {
  const Element = as || 'p'

  if (!message) {
    return null
  }

  return (
    <Element
      className={clsx(
        'mt-1 text-[11px] leading-tight text-sys-danger',
        className,
      )}
    >
      {message}
    </Element>
  )
}
