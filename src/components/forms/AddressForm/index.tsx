'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { Address, Config } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { titles } from './constants'
import { Button } from '@/components/ui/button'
import { deepMergeSimple } from 'payload/shared'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { toast } from 'sonner'

type AddressFormValues = {
  title?: string | null
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
}

type Props = {
  addressID?: Config['db']['defaultIDType']
  initialData?: Omit<Address, 'country' | 'id' | 'updatedAt' | 'createdAt'> & { country?: string }
  callback?: (data: Partial<Address>) => void
  /**
   * If true, the form will not submit to the API.
   */
  skipSubmission?: boolean
}

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callback,
  skipSubmission,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<AddressFormValues>({
    defaultValues: {
      ...initialData,
      // Delivery only within Ukraine for now
      country: initialData?.country || 'UA',
    },
  })

  const { createAddress, updateAddress } = useAddresses()
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure country is always set even if UI is hidden.
    setValue('country', initialData?.country || 'UA', { shouldValidate: true })
  }, [initialData?.country, setValue])

  const onSubmit = useCallback(
    async (data: AddressFormValues) => {
      setSubmitError(null)
      const newData = deepMergeSimple(initialData || {}, data)

      try {
        if (!skipSubmission) {
          if (addressID) {
            await updateAddress(addressID, newData)
          } else {
            await createAddress(newData)
          }
        }

        toast.success('Адресу успішно збережено.')

        // Close modal only after successful save
        callback?.(newData)
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : 'Не вдалося зберегти адресу. Перевірте поля та спробуйте ще раз.'
        setSubmitError(message)
      }
    },
    [initialData, skipSubmission, callback, addressID, updateAddress, createAddress],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Message error={submitError} />
      <div className="grid gap-space-20 mb-space-20">
        <div className="grid gap-space-20 tablet:grid-cols-3">
          <FormItem className="tablet:col-span-1">
            <Label htmlFor="title" className="text-sys-text font-semibold font-unbounded">
              Стать
            </Label>

            <Controller
              control={control}
              name="title"
              defaultValue={initialData?.title || ''}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setValue('title', value, { shouldValidate: true })
                  }}
                >
                  <SelectTrigger
                    id="title"
                    variant="primaryFrontend"
                    className="mb-0 h-12 w-full rounded-radius-full px-6"
                  >
                    <SelectValue placeholder="Стать" />
                  </SelectTrigger>
                  <SelectContent variant="primaryFrontend">
                    {titles.map((title) => (
                      <SelectItem key={title} value={title} variant="primaryFrontend">
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.title && <FormError message={errors.title.message} />}
          </FormItem>

          <FormItem className="tablet:col-span-1">
            <Label htmlFor="firstName" className="text-sys-text font-semibold font-unbounded">
              Ім&apos;я<span className="text-sys-danger">*</span>
            </Label>
            <Input
              id="firstName"
              autoComplete="given-name"
              {...register('firstName', { required: "Ім'я обов'язкове." })}
              variant="primaryFrontend"
              className="h-12 rounded-radius-full px-6"
            />
            {errors.firstName && <FormError message={errors.firstName.message} />}
          </FormItem>

          <FormItem className="tablet:col-span-1">
            <Label htmlFor="lastName" className="text-sys-text font-semibold font-unbounded">
              Прізвище<span className="text-sys-danger">*</span>
            </Label>
            <Input
              autoComplete="family-name"
              id="lastName"
              {...register('lastName', { required: "Прізвище обов'язкове." })}
              variant="primaryFrontend"
              className="h-12 rounded-radius-full px-6"
            />
            {errors.lastName && <FormError message={errors.lastName.message} />}
          </FormItem>
        </div>

        <FormItem>
          <Label htmlFor="phone" className="text-sys-text font-semibold font-unbounded">
            Телефон
          </Label>
          <Input
            type="tel"
            id="phone"
            autoComplete="mobile tel"
            {...register('phone')}
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.phone && <FormError message={errors.phone.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="company" className="text-sys-text font-semibold font-unbounded">
            Компанія
          </Label>
          <Input
            id="company"
            autoComplete="organization"
            {...register('company')}
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.company && <FormError message={errors.company.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="addressLine1" className="text-sys-text font-semibold font-unbounded">
            Вулиця<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="addressLine1"
            autoComplete="address-line1"
            {...register('addressLine1', { required: "Вулиця обов'язкова." })}
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="city" className="text-sys-text font-semibold font-unbounded">
            Місто<span className="text-sys-danger">*</span>
          </Label>
          <Input
            id="city"
            autoComplete="address-level2"
            {...register('city', { required: "Місто обов'язкове." })}
            variant="primaryFrontend"
            className="h-12 rounded-radius-full px-6"
          />
          {errors.city && <FormError message={errors.city.message} />}
        </FormItem>

        <div className="grid gap-space-20 tablet:grid-cols-3">
          <FormItem className="tablet:col-span-1">
            <Label htmlFor="addressLine2" className="text-sys-text font-semibold font-unbounded">
              Будинок / Квартира
            </Label>
            <Input
              id="addressLine2"
              autoComplete="address-line2"
              {...register('addressLine2')}
              variant="primaryFrontend"
              className="h-12 rounded-radius-full px-6"
            />
            {errors.addressLine2 && <FormError message={errors.addressLine2.message} />}
          </FormItem>

          <FormItem className="tablet:col-span-1">
            <Label htmlFor="postalCode" className="text-sys-text font-semibold font-unbounded">
              Індекс<span className="text-sys-danger">*</span>
            </Label>
            <Input
              id="postalCode"
              {...register('postalCode', { required: "Індекс обов'язковий." })}
              variant="primaryFrontend"
              className="h-12 rounded-radius-full px-6"
            />
            {errors.postalCode && <FormError message={errors.postalCode.message} />}
          </FormItem>

          {/* Country is fixed to Ukraine for now (delivery only in Ukraine) */}
          <input type="hidden" {...register('country')} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-radius-full bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
      >
        {isSubmitting ? 'Збереження…' : 'Зберегти'}
      </Button>
    </form>
  )
}
