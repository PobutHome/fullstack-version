'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const googleHref = `/api/auth/google${allParams}`

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current)
        else router.push('/account')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <Message className="my-0" error={error} />
      <div className="flex flex-col gap-space-20">
        <FormItem>
          <Label htmlFor="email" className="font-semibold">
            E-mail<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('email', { required: 'Email is required.' })}
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="password" className="font-semibold">
            Пароль<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
            {...register('password', { required: 'Please provide a password.' })}
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>

        <div className="text-sm text-sys-text-muted">
          <Link className="hover:underline" href={`/recover-password${allParams}`}>
            Забули пароль?
          </Link>
        </div>
      </div>

      <Button
        className="mt-space-20 w-full rounded-radius-full bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
        disabled={isLoading}
        size="lg"
        type="submit"
        variant="default"
      >
        {isLoading ? 'Processing' : 'Увійти'}
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
        <span className="text-sys-text">Не маєш акаунту? </span>
        <Link className="text-sys-accent hover:underline" href={`/create-account${allParams}`}>
          Зареєструйся
        </Link>
      </div>
    </form>
  )
}
