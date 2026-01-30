'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { QuotesIcon } from '@/components/icons/QuotesIcon'
import { StarIcon } from '@/components/icons/StarIcon'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

type Testimonial = {
  id: string
  text: string
  author: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    text: 'Відправили через 3 години після замовлення!!! Зранку вже забрав замовлення!!. Дякую за швидкість',
    author: 'Karen M.',
    rating: 4.5,
  },
  {
    id: 't-2',
    text: 'Відправили через 3 години після замовлення!!! Зранку вже забрав замовлення!!. Дякую за швидкість',
    author: 'Karen M.',
    rating: 4,
  },
  {
    id: 't-3',
    text: 'Відправили через 3 години після замовлення!!! Зранку вже забрав замовлення!!. Дякую за швидкість',
    author: 'Karen M.',
    rating: 4,
  },
  {
    id: 't-4',
    text: 'Все прийшло ідеально запаковано. Якість супер, менеджер швидко відповів на всі питання.',
    author: 'Olha V.',
    rating: 5,
  },
  {
    id: 't-5',
    text: 'Замовляю вже вдруге — все чітко по термінах. Зручно, швидко, без зайвих дзвінків.',
    author: 'Andrii S.',
    rating: 5,
  },
  {
    id: 't-6',
    text: 'Дуже приємні ціни та великий вибір на складі. Доставка швидка, рекомендую.',
    author: 'Iryna K.',
    rating: 4,
  },
]

function RatingStars({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, rating))

  return (
    <div className="flex items-center gap-1 text-[#72CB1A]" aria-label={`Рейтинг ${safeRating} з 5`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const raw = safeRating - idx
        const stepped = Math.max(0, Math.min(1, Math.round(raw * 2) / 2)) // 0, 0.5, 1

        return (
          <StarIcon
            key={idx}
            fillRatio={stepped}
            className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
          />
        )
      })}
    </div>
  )
}

function CommentCard({ text, author, rating }: Omit<Testimonial, 'id'>) {
  return (
    <article className="min-w-0">
      <div
        className={[
          'h-full',
          'rounded-xl border border-sys-accent bg-sys-surface',
          'shadow-[0_14px_28px_rgba(31,59,115,0.14)]',
          'p-space-20 md:p-space-30',
        ].join(' ')}
      >
        <div className="h-full flex flex-col gap-space-20 md:gap-space-30">
          <p
            className={[
              'm-0 text-sys-text',
              'text-[13px] leading-[1.35]',
              'sm:text-[14px]',
              'md:text-[15px] md:leading-[1.45]',
            ].join(' ')}
          >
            {text}
          </p>

          <div className="mt-auto">
            <RatingStars rating={rating} />
          </div>
        </div>
      </div>

      <p
        className={[
          'm-0 mt-space-10',
          'pl-[20px]',
          'text-[#72CB1A] font-semibold',
          'text-[12px] md:text-[13px]',
        ].join(' ')}
      >
        {author}
      </p>
    </article>
  )
}

export function Testimonials() {
  const [expanded, setExpanded] = useState(false)
  const canToggle = testimonials.length > 3

  return (
    <Section id="testimonials" aria-labelledby="home-testimonials-title">
      <Container>
        <InnerSection className="grid gap-layout-gap-2">
          <div className="min-w-0 relative">
            <div className="flex flex-col sm:flex-row items-start gap-layout-gap-2">
              <QuotesIcon className="text-[#B9E58C] absolute left-0 top-0 h-auto w-[120px] tablet:relative tablet:w-[290px] desktop:w-[400px] z-0" />

              <div className="min-w-0 pt-[70px] pl-[20px] tablet:pl-0 tablet:pt-[10px] z-1 tablet:self-end">
                <h2 id="home-testimonials-title" className="m-0 max-w-[34ch] text-sys-text">
                  <span className="block pobut-H1">Читай відгуки,</span>
                  <span className="block pobut-H1">будь впевненим в тому</span>
                  <span className="block pobut-H1">де замовляєш</span>
                </h2>

                <div className="mt-space-10 flex items-center gap-2">
                  <StarIcon className="text-[#72CB1A] w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                  <span className="font-semibold text-sys-text text-[18px] leading-none md:text-[22px]">
                    4,2 / 5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-none m-0 p-0 grid gap-layout-gap-2 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => {
              const hiddenWhenCollapsed =
                idx >= 3 ? 'hidden' : idx === 2 ? 'hidden lg:block' : ''

              return (
                <li
                  key={t.id}
                  className={['min-w-0', expanded ? '' : hiddenWhenCollapsed].join(' ')}
                >
                  <CommentCard text={t.text} author={t.author} rating={t.rating} />
                </li>
              )
            })}
          </ul>

          {canToggle ? (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="md"
                iconPosition="right"
                icon={
                  <ChevronDownIcon
                    className={[
                      'w-4 h-4 transition-transform duration-200',
                      expanded ? 'rotate-180' : 'rotate-0',
                    ].join(' ')}
                  />
                }
                className="w-full max-w-[260px] justify-center"
                type="button"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? 'Менше' : 'Більше'}
              </Button>
            </div>
          ) : null}

        </InnerSection>
      </Container>
    </Section>
  )
}

