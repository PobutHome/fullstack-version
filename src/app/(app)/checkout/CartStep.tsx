import React from 'react'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'

export interface CartStepProps {
  cart:
    | {
        items?:
          | Array<{
              product?: unknown
              variant?: unknown
              quantity?: number | null
            }>
          | null
        subtotal?: number | null
      }
    | null
    | undefined
  onNext: () => void
}

export const CartStep: React.FC<CartStepProps> = ({ cart, onNext }) => {
  if (!cart || !cart.items || !cart.items.length) return null

  return (
    <section className="grid gap-space-20">
      <header className="grid gap-space-05 max-w-3xl">
        <h2 className="m-0 pobut-H3 text-sys-text">Товари в замовленні</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Перевірте склад кошика, кількість та підсумкову суму перед переходом до заповнення даних
          одержувача.
        </p>
      </header>

      <div className="grid gap-space-20">
        <section className="grid gap-space-15">
          {cart.items?.map((rawItem, index) => {
            if (!rawItem || typeof rawItem !== 'object') return null

            const item = rawItem as {
              product?: {
                meta?: { image?: unknown }
                title?: string
                gallery?: { image?: unknown; variantOption?: unknown }[] | null
                priceInUAH?: number | null
              } | null
              quantity?: number | null
              variant?: {
                priceInUAH?: number | null
                options?: Array<{ id?: string; label?: string } | string> | null
              } | null
            }

            if (item.product && typeof item.product === 'object') {
              const {
                product,
                product: { meta, title, gallery },
                quantity,
                variant,
              } = item

              if (!quantity) return null

              let image = gallery?.[0]?.image || meta?.image
              let price = product?.priceInUAH

              const isVariant = Boolean(variant) && typeof variant === 'object'

              if (isVariant) {
                price = variant?.priceInUAH ?? price

                const imageVariant = product.gallery?.find((galleryItem) => {
                  if (!galleryItem.variantOption) return false
                  const variantOptionID =
                    typeof galleryItem.variantOption === 'object'
                      ? (galleryItem.variantOption as { id?: string }).id
                      : galleryItem.variantOption

                  const hasMatch = variant?.options?.some((option) => {
                    if (typeof option === 'object') return option.id === variantOptionID
                    return option === variantOptionID
                  })

                  return hasMatch
                })

                if (imageVariant && typeof imageVariant.image !== 'string') {
                  image = imageVariant.image
                }
              }

              return (
                <div className="flex items-start gap-space-10" key={index}>
                  <div className="flex items-stretch justify-stretch h-20 w-20 p-space-10 rounded-radius-lg border border-sys-border bg-sys-surface-2">
                    <div className="relative w-full h-full">
                      {image && typeof image !== 'string' && (
                        <Media
                          className=""
                          fill
                          imgClassName="rounded-radius-lg object-contain"
                          resource={image}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex grow justify-between items-center gap-space-10">
                    <div className="flex flex-col gap-[2px] min-w-0">
                      <p className="m-0 text-sm font-medium text-sys-text line-clamp-2">{title}</p>
                      {variant && typeof variant === 'object' && (
                        <p className="m-0 text-[11px] font-mono text-sys-text-muted tracking-[0.12em] uppercase">
                          {variant.options
                            ?.map((option) => {
                              if (typeof option === 'object') return option.label
                              return null
                            })
                            .join(', ')}
                        </p>
                      )}
                      <small className="m-0 text-[11px] text-sys-text-muted">
                        Кількість: {quantity}
                      </small>
                    </div>

                    {typeof price === 'number' && (
                      <Price
                        amount={price}
                        className="text-sm font-semibold text-sys-text whitespace-nowrap"
                      />
                    )}
                  </div>
                </div>
              )
            }
            return null
          })}
        </section>

        <section className="border-t border-sys-border pt-space-15 flex justify-between items-center gap-space-10">
          <div className="grid gap-[2px]">
            <small className="m-0 text-[11px] uppercase tracking-[0.18em] text-sys-text-muted">
              Всього за товари
            </small>
            <p className="m-0 text-xs text-sys-text-muted">
              Увага: вартість доставки <span className="font-semibold">не входить</span> у вартість
              товарів і буде розрахована окремо за тарифами поштової служби.
            </p>
          </div>
          <Price className="text-2xl font-semibold text-sys-text" amount={cart.subtotal || 0} />
        </section>
      </div>

      <footer className="pt-space-15 flex justify-end">
        <Button
          type="button"
          size="lg"
          className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
          onClick={onNext}
        >
          До даних одержувача
        </Button>
      </footer>
    </section>
  )
}


