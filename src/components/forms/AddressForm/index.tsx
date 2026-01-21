'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { Address, Config } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { deepMergeSimple } from 'payload/shared'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'

type AddressFormValues = {
  firstName?: string | null
  lastName?: string | null
  addressLine1?: string | null
  city?: string | null
  postalCode?: string | null
  country?: string | null
  phone?: string | null
}

type Props = {
  addressID?: Config['db']['defaultIDType']
  initialData?: Omit<Address, 'country' | 'id' | 'updatedAt' | 'createdAt'> & { country?: string }
  callbackAction?: (data: Partial<Address>) => void
  /**
   * If true, the form will not submit to the API.
   */
  skipSubmission?: boolean
}

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callbackAction,
  skipSubmission,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormValues>({
    defaultValues: {
      ...initialData,
      country: 'UA',
    },
  })

  const { createAddress, updateAddress } = useAddresses()

  useEffect(() => {
    setValue('country', 'UA', { shouldValidate: true })
  }, [setValue])

  const submitLabel = useMemo(() => {
    return addressID ? 'Зберегти' : 'Додати адресу'
  }, [addressID])

  const onSubmit = useCallback(
    async (data: AddressFormValues) => {
      const newData = deepMergeSimple(initialData || {}, {
        ...data,
        country: 'UA',
        title: null,
        company: null,
        addressLine2: null,
        state: null,
        phone: typeof data.phone === 'string' ? data.phone.trim() : data.phone,
      })

      if (!skipSubmission) {
        if (addressID) {
          await updateAddress(addressID, newData)
        } else {
          await createAddress(newData)
        }
      }

      if (callbackAction) {
        callbackAction(newData)
      }
    },
    [initialData, skipSubmission, callbackAction, addressID, updateAddress, createAddress],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <FormItem>
            <Label htmlFor="firstName">Імʼя*</Label>
            <Input
              id="firstName"
              autoComplete="given-name"
              {...register('firstName', { required: "Ім'я є обов'язковим." })}
            />
            {errors.firstName && <FormError message={errors.firstName.message} />}
          </FormItem>

          <FormItem>
            <Label htmlFor="lastName">Прізвище*</Label>
            <Input
              autoComplete="family-name"
              id="lastName"
              {...register('lastName', { required: 'Прізвище є обов\'язковим.' })}
            />
            {errors.lastName && <FormError message={errors.lastName.message} />}
          </FormItem>
        </div>

        <FormItem>
          <Label htmlFor="phone">Телефон*</Label>
          <Input
            type="tel"
            id="phone"
            autoComplete="tel"
            placeholder="+380…"
            {...register('phone', {
              required: 'Телефон є обов\'язковим.',
            })}
          />
          {errors.phone && <FormError message={errors.phone.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="addressLine1">Адреса (вулиця, будинок, квартира)*</Label>
          <Input
            id="addressLine1"
            autoComplete="address-line1"
            placeholder="Напр.: вул. Хрещатик, 1, кв. 10"
            {...register('addressLine1', { required: 'Адреса є обов\'язковою.' })}
          />
          {errors.addressLine1 && <FormError message={errors.addressLine1.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="city">Місто*</Label>
          <Input
            id="city"
            autoComplete="address-level2"
            {...register('city', { required: 'Місто є обов\'язковим.' })}
          />
          {errors.city && <FormError message={errors.city.message} />}
        </FormItem>

        <FormItem>
          <Label htmlFor="postalCode">Поштовий індекс*</Label>
          <Input
            id="postalCode"
            placeholder="Напр.: 01001"
            {...register('postalCode', { required: 'Поштовий індекс є обов\'язковим.' })}
          />
          {errors.postalCode && <FormError message={errors.postalCode.message} />}
        </FormItem>

        <input type="hidden" {...register('country')} />

        <div className="text-sm text-muted-foreground">Країна: Україна</div>
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
