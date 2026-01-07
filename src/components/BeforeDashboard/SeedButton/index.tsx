'use client'

import { toast } from '@payloadcms/ui'
import React, { Fragment, MouseEvent, useCallback, useState } from 'react'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Базу даних заповнено! Тепер можна{' '}
    <a target="_blank" href="/">
      перейти на сайт
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Базу даних уже заповнено.')
        return
      }
      if (loading) {
        toast.info('Заповнення вже виконується.')
        return
      }
      if (error) {
        toast.error('Сталася помилка. Онови сторінку та спробуй ще раз.')
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('An error occurred while seeding.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Заповнюємо даними…',
            success: <SuccessMessage />,
            error: 'Сталася помилка під час заповнення.',
          },
        )
      } catch (err) {
        setError(err)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (заповнення…)'
  if (seeded) message = ' (готово!)'
  if (error) message = ` (помилка: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Заповнити базу
      </button>
      {message}
    </Fragment>
  )
}
