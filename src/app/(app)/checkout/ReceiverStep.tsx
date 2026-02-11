import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import type { ReceiverForm } from './checkoutTypes'

interface ReceiverStepProps {
  user: { email?: string | null } | null | undefined
  receiverForm: ReceiverForm
  onContinueToDelivery: () => void
  receiverStepComplete: boolean
}

export const ReceiverStep: React.FC<ReceiverStepProps> = ({
  user,
  receiverForm,
  onContinueToDelivery,
  receiverStepComplete,
}) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = receiverForm

  return (
    <section className="grid gap-space-20 max-w-3xl">
      <header className="grid gap-space-05">
        <h2 className="m-0 pobut-H3 text-sys-text">Дані одержувача</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Оформіть замовлення як зареєстрований користувач або як гість.
        </p>
      </header>

      <div className="grid gap-space-20">
        {!user && (
          <section className="rounded-radius-primary border border-sys-border-interactive bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-10">
            <div className="grid gap-space-05">
              <p className="m-0 pobut-body text-sys-text font-semibold">
                Маєте акаунт? Увійдіть для швидшого оформлення.
              </p>
              <p className="m-0 pobut-body text-sys-text-muted">
                Ваші збережені адреси та дані будуть підставлені автоматично.
              </p>
            </div>
            <div className="flex flex-col gap-space-10 tablet:flex-row tablet:items-center tablet:justify-start">
              <Button asChild variant="outline" size="sm" className="rounded-radius-full">
                <Link href="/login">Увійти</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-radius-full text-sys-accent"
              >
                <Link href="/create-account">Створити акаунт</Link>
              </Button>
            </div>
          </section>
        )}

        {user ? (
          <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
            <p className="m-0 pobut-body text-sys-text">
              Ви оформлюєте замовлення як <span className="font-semibold">{user.email}</span>.
            </p>
            <p className="m-0 text-xs text-sys-text-muted">
              Не ви?{' '}
              <Link className="underline" href="/logout">
                Вийти з акаунту
              </Link>
              .
            </p>
          </section>
        ) : (
          <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 px-space-15 py-space-20 grid gap-space-15">
            <p className="m-0 pobut-body text-sys-text">
              Або продовжуйте як гість – заповніть контактні дані для підтвердження та статусу
              замовлення.
            </p>

            <form
              className="grid gap-space-12 max-w-sm"
              noValidate
              onSubmit={handleSubmit(() => undefined)}
            >
              <FormItem className="mb-0">
                <Label
                  htmlFor="checkout-email"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Email<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  id="checkout-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email', {
                    required: 'Вкажіть email.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Вкажіть коректний email.',
                    },
                  })}
                />
                {errors.email?.message && (
                  <FormError
                    as="span"
                    className="mt-1 text-[11px] text-sys-danger"
                    message={errors.email.message}
                  />
                )}
              </FormItem>

              <FormItem className="mb-0">
                <Label
                  htmlFor="checkout-receiverFirstName"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Ім&apos;я одержувача<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  id="checkout-receiverFirstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Ім'я"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  aria-invalid={Boolean(errors.receiverFirstName)}
                  {...register('receiverFirstName', {
                    required: "Ім'я одержувача обов'язкове.",
                  })}
                />
                {errors.receiverFirstName?.message && (
                  <FormError
                    as="span"
                    className="mt-1 text-[11px] text-sys-danger"
                    message={errors.receiverFirstName.message}
                  />
                )}
              </FormItem>

              <FormItem className="mb-0">
                <Label
                  htmlFor="checkout-receiverLastName"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Прізвище одержувача<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  id="checkout-receiverLastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Прізвище"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  aria-invalid={Boolean(errors.receiverLastName)}
                  {...register('receiverLastName', {
                    required: "Прізвище одержувача обов'язкове.",
                  })}
                />
                {errors.receiverLastName?.message && (
                  <FormError
                    as="span"
                    className="mt-1 text-[11px] text-sys-danger"
                    message={errors.receiverLastName.message}
                  />
                )}
              </FormItem>

              <FormItem className="mb-0">
                <Label
                  htmlFor="checkout-receiverPhone"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Телефон одержувача<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  disabled={isSubmitting}
                  id="checkout-receiverPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+380 XX XXX XX XX"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  aria-invalid={Boolean(errors.receiverPhone)}
                  {...register('receiverPhone', {
                    required: "Телефон одержувача обов'язковий.",
                    pattern: {
                      value: /^[\d\s+()-]{10,}$/,
                      message: 'Вкажіть коректний номер телефону.',
                    },
                  })}
                />
                {errors.receiverPhone?.message && (
                  <FormError
                    as="span"
                    className="mt-1 text-[11px] text-sys-danger"
                    message={errors.receiverPhone.message}
                  />
                )}
              </FormItem>

              <div className="pt-space-05">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                >
                  {isSubmitting ? 'Перевірка…' : 'Продовжити як гість'}
                </Button>
              </div>
            </form>
          </section>
        )}
      </div>

      <footer className="pt-space-15 flex items-center justify-between gap-space-10">
        <p className="m-0 text-xs text-sys-text-muted">
          Ви зможете зберегти адресу доставки на наступних кроках.
        </p>
        <Button
          type="button"
          size="lg"
          className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
          disabled={!receiverStepComplete}
          onClick={onContinueToDelivery}
        >
          До доставки
        </Button>
      </footer>
    </section>
  )
}


