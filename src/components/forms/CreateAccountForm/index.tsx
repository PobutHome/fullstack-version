'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type FormData = {
  firstName: string
  lastName: string
  patronymic: string
  phone: string
  email: string
  marketingOptIn: boolean
  personalDataConsent: boolean
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const googleHref = `/api/auth/google${allParams}`

  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const name = [data.firstName, data.lastName].filter(Boolean).join(' ').trim()
      const response = await fetch('/api/users', {
        body: JSON.stringify({ ...data, name }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <Message className="my-0" error={error} />

      <div className="flex flex-col gap-space-20">
        <FormItem>
          <Label htmlFor="firstName" className="font-semibold">
            Ім&apos;я<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('firstName', { required: "Ім'я обов'язкове." })}
          />
          {errors.firstName && <FormError message={errors.firstName.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="lastName" className="font-semibold">
            Прізвище<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('lastName', { required: 'Прізвище обов\'язкове.' })}
          />
          {errors.lastName && <FormError message={errors.lastName.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="patronymic" className="font-semibold">
            По батькові<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="patronymic"
            type="text"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('patronymic', { required: "По батькові обов'язкове." })}
          />
          {errors.patronymic && <FormError message={errors.patronymic.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="phone" className="font-semibold">
            Телефон<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('phone', { required: 'Телефон обов\'язковий.' })}
          />
          {errors.phone && <FormError message={errors.phone.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="email" className="font-semibold">
            E-mail<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="email"
            {...register('email', { required: 'Email is required.' })}
            type="email"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="marketingOptIn"
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="marketingOptIn"
                className="mt-1 data-[state=checked]:bg-sys-accent data-[state=checked]:border-sys-accent"
                checked={Boolean(field.value)}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
              />
            )}
          />
          <Label htmlFor="marketingOptIn" className="text-sm leading-snug">
            Отримувати повідомлення про новинки, знижки, акції
          </Label>
        </div>

        <FormItem>
          <Label htmlFor="password" className="font-semibold">
            Пароль<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="password"
            {...register('password', { required: 'Password is required.' })}
            type="password"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="passwordConfirm" className="font-semibold">
            Повторіть пароль<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="passwordConfirm"
            {...register('passwordConfirm', {
              required: 'Please confirm your password.',
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
            type="password"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
        </FormItem>

        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="personalDataConsent"
            defaultValue={false}
            rules={{
              validate: (v) => Boolean(v) || 'Потрібна згода на обробку персональних даних.',
            }}
            render={({ field }) => (
              <Checkbox
                id="personalDataConsent"
                className="mt-1 data-[state=checked]:bg-sys-accent data-[state=checked]:border-sys-accent"
                checked={Boolean(field.value)}
                onCheckedChange={(v) => field.onChange(Boolean(v))}
              />
            )}
          />
          <Label htmlFor="personalDataConsent" className="text-sm leading-snug">
            Я згоден на обробку персональних даних
          </Label>
        </div>
        {errors.personalDataConsent?.message && <FormError message={errors.personalDataConsent.message} />}
      </div>

      <Button
        disabled={loading}
        type="submit"
        variant="default"
        className="mt-space-20 w-full rounded-radius-full bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
      >
        {loading ? 'Processing' : 'Зареєструватись'}
      </Button>

      <div className="flex items-center gap-4 my-space-20">
        <div className="h-px bg-border flex-1" />
        <span className="text-xs text-sys-text-muted">або увійдіть за допомогою</span>
        <div className="h-px bg-border flex-1" />
      </div>

      <div className="grid gap-space-10">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full rounded-radius-full border-sys-border-interactive text-sys-text hover:bg-sys-surface-2"
        >
          <Link href={googleHref}>Увійти за допомого Google</Link>
        </Button>
      </div>

      <div className="mt-space-20 text-center">
        <span className="text-sys-text">Вже маєш акаунт? </span>
        <Link className="text-sys-accent hover:underline" href={`/login${allParams}`}>
          Увійти
        </Link>
      </div>
    </form>
  )
}
