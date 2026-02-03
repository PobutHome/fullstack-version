'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressForm } from '@/components/forms/AddressForm'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = 'Додати нову адресу',
  modalTitle = 'Додавання нової адреси',
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          className="rounded-radius-full border-sys-btn-outline-border text-sys-btn-outline-fg hover:border-sys-btn-outline-border-hover hover:text-sys-btn-outline-fg-hover"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-sys-surface border-sys-accent rounded-radius-primary shadow-shadow-md p-space-20 tablet:p-space-30 sm:max-w-208">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="pobut-H3 text-sys-text">{modalTitle}</DialogTitle>
          <DialogDescription className="text-sys-text-muted">
            Ця адреса буде прив&apos;язана до вашого акаунту.
          </DialogDescription>
        </DialogHeader>

        <AddressForm
          addressID={addressID}
          initialData={initialData}
          callback={handleCallback}
          skipSubmission={skipSubmission}
        />
      </DialogContent>
    </Dialog>
  )
}
