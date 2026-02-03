'use client'

import { PillNavLink } from '@/components/PillNavLink'
import { cn } from '@/utilities/cn'
import Link from 'next/link'

type Props = {
  className?: string
}

export const AccountNav: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('grid gap-space-20', className)}>
      <nav className="flex flex-wrap gap-space-10 md:flex-col">
        <PillNavLink href="/account"><h3>Контактна інформація</h3></PillNavLink>
        <PillNavLink href="/account/addresses"><h3>Адресна книга</h3></PillNavLink>
        <PillNavLink
          href="/orders"
          isActive={(pathname) => pathname === '/orders' || pathname.startsWith('/orders/')}
        >
          <h3>Історія замовлень</h3>
        </PillNavLink>
      </nav>

      <div className="grid gap-space-10">
        <Link className="text-sys-danger hover:underline w-fit" href="/logout">
          Вийти
        </Link>
      </div>
    </div>
  )
}
