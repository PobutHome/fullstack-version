'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormData = {
  email: string
  firstName: User['firstName']
  lastName: User['lastName']
  patronymic: User['patronymic']
  phone: User['phone']
  password: string
  passwordConfirm: string
}

type Props = {
  /** Server-provided user so the form is prefilled on first paint */
  initialUser?: User
}

export const AccountForm: React.FC<Props> = ({ initialUser }) => {
  const { setUser, user: contextUser } = useAuth()
  const user = contextUser ?? initialUser
  const [changePassword, setChangePassword] = useState(false)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const name = [data.firstName, data.lastName].filter(Boolean).join(' ').trim()
        const response = await fetch(`/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          body: JSON.stringify({ ...data, name }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          toast.success('Successfully updated account.')
          setChangePassword(false)
          reset({
            firstName: json.doc.firstName,
            lastName: json.doc.lastName,
            patronymic: json.doc.patronymic,
            phone: json.doc.phone,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          toast.error('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    // If server already told us who the user is, keep context in sync (avoids blank state until /me resolves).
    if (contextUser === undefined && initialUser) {
      setUser(initialUser)
    }

    if (contextUser === null && !initialUser) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
        phone: user.phone,
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [contextUser, initialUser, setUser, user, router, reset, changePassword])

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p className="">
              {'Change your account details below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {' to change your password.'}
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="email" className="mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide an email.' })}
                type="email"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="firstName" className="mb-2">
                Ім&apos;я
              </Label>
              <Input
                id="firstName"
                {...register('firstName', { required: "Будь ласка, вкажіть ім'я." })}
                type="text"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.firstName && <FormError message={errors.firstName.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="lastName" className="mb-2">
                Прізвище
              </Label>
              <Input
                id="lastName"
                {...register('lastName', { required: 'Будь ласка, вкажіть прізвище.' })}
                type="text"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.lastName && <FormError message={errors.lastName.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="patronymic" className="mb-2">
                По батькові
              </Label>
              <Input
                id="patronymic"
                {...register('patronymic', { required: 'Будь ласка, вкажіть по батькові.' })}
                type="text"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.patronymic && <FormError message={errors.patronymic.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="phone" className="mb-2">
                Телефон
              </Label>
              <Input
                id="phone"
                {...register('phone', { required: 'Будь ласка, вкажіть телефон.' })}
                type="tel"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.phone && <FormError message={errors.phone.message} />}
            </FormItem>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {'Change your password below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="password" className="mb-2">
                New password
              </Label>
              <Input
                id="password"
                {...register('password', { required: 'Please provide a new password.' })}
                type="password"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.password && <FormError message={errors.password.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="passwordConfirm" className="mb-2">
                Confirm password
              </Label>
              <Input
                id="passwordConfirm"
                {...register('passwordConfirm', {
                  required: 'Please confirm your new password.',
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
                type="password"
                className="h-12 rounded-radius-full border-sys-input-border bg-sys-input-bg text-sys-input-fg px-6 focus-visible:border-sys-input-border-focus focus-visible:ring-sys-focus-ring"
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
            </FormItem>
          </div>
        </Fragment>
      )}
      <Button
        disabled={isLoading || isSubmitting || !isDirty}
        type="submit"
        variant="default"
        className="rounded-radius-full bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
      >
        {isLoading || isSubmitting
          ? 'Processing'
          : changePassword
            ? 'Change Password'
            : 'Update Account'}
      </Button>
    </form>
  )
}
