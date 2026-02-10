import type { ReactNode } from 'react'

export default function CatalogLayout({ children }: { children: ReactNode }) {
  // Keep catalog layout minimal: the catalog page itself handles its responsive sidebar.
  return children
}
