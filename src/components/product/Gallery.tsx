'use client'

import type { Product } from '@/payload-types'

import { GridTileImage } from '@/components/Grid/tile'
import { Media } from '@/components/Media'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { DefaultDocumentIDType } from 'payload'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    const values = searchParams.values().toArray()

    if (values && api) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) return false

        let variantID: DefaultDocumentIDType

        if (typeof item.variantOption === 'object') {
          variantID = item.variantOption.id
        } else variantID = item.variantOption

        return Boolean(values.find((value) => value === String(variantID)))
      })
      if (index !== -1) {
        setCurrent(index)
        api.scrollTo(index, true)
      }
    }
  }, [searchParams, api, gallery])

  return (
    <div>
      <Carousel
        setApi={setApi}
        className="w-full touch-pan-y"
        opts={{ align: 'start', loop: false }}
      >
        <CarouselContent className="ml-0">
          {gallery.map((item, i) => {
            if (typeof item.image !== 'object') return null

            return (
              <CarouselItem className="basis-full pl-0" key={`${item.image.id}-${i}`}>
                <div className="relative w-full overflow-hidden mb-8">
                  <Media
                    resource={item.image}
                    className="w-full"
                    imgClassName="w-full rounded-lg"
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-3 overflow-x-auto">
        {gallery.map((item, i) => {
          if (typeof item.image !== 'object') return null

          return (
            <button
              key={`${item.image.id}-thumb-${i}`}
              type="button"
              className="shrink-0 basis-1/5"
              onClick={() => api?.scrollTo(i, true)}
              aria-label={`Go to image ${i + 1}`}
            >
              <GridTileImage active={i === current} media={item.image} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
