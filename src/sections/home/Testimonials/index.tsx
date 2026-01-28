import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { QuotesIcon } from '@/components/icons/QuotesIcon'
import { StarIcon } from '@/components/icons/StarIcon'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import { ChevronDownIcon } from 'lucide-react'

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
    rating: 4,
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
]

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.max(0, Math.min(5, Math.floor(rating)))

  return (
    <div className="flex items-center gap-1 text-[#72CB1A]" aria-label={`Рейтинг ${rating} з 5`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <StarIcon
          key={idx}
          filled={idx < fullStars}
          className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
        />
      ))}
    </div>
  )
}

function CommentCard({ text, author, rating }: Omit<Testimonial, 'id'>) {
  return (
    <article className="min-w-0">
      <div
        className={[
          'relative h-full',
          'rounded-xl border border-sys-accent bg-sys-surface',
          'p-space-20 md:p-space-30',
        ].join(' ')}
      >
        {/* speech bubble tail (border + fill) */}
        <span
          aria-hidden="true"
          className="absolute -left-[15px] bottom-[22px] w-0 h-0 border-y-12 border-y-transparent border-r-15 border-r-sys-accent"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[13px] bottom-[22px] w-0 h-0 border-y-11 border-y-transparent border-r-14 border-r-sys-surface"
        />

        <div className="h-full flex flex-col gap-space-20 md:gap-space-30">
          <p
            className={[
              'm-0 text-sys-accent',
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
          'pl-[18px]',
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
  return (
    <Section id="testimonials" aria-labelledby="home-testimonials-title">
      <Container>
        <InnerSection>
          <div className="grid gap-layout-gap-2">
            <header className="min-w-0">
              <div className="flex items-start gap-layout-gap-2">
                <QuotesIcon className="text-[#B9E58C] w-[86px] h-auto sm:w-[120px] md:w-[160px] lg:w-[200px]" />

                <div className="min-w-0 pt-[6px] md:pt-[10px]">
                  <h2 id="home-testimonials-title" className="m-0 text-sys-accent max-w-[34ch]">
                    <span className="block">Читай відгуки,</span>
                    <span className="block">будь впевненим в тому</span>
                    <span className="block">де замовляєш</span>
                  </h2>

                  <div className="mt-space-10 flex items-center gap-2">
                    <StarIcon className="text-[#72CB1A] w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                    <span className="font-semibold text-sys-accent text-[18px] leading-none md:text-[22px]">
                      4,2 / 5
                    </span>
                  </div>
                </div>
              </div>
            </header>

            <ul className="list-none m-0 p-0 grid gap-layout-gap-2 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.id} className="min-w-0">
                  <CommentCard text={t.text} author={t.author} rating={t.rating} />
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="md"
                iconPosition="right"
                icon={<ChevronDownIcon className="w-4 h-4" />}
                className="w-full max-w-[260px] justify-center"
                type="button"
              >
                Більше
              </Button>
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}

