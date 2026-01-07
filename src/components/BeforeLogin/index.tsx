import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Ласкаво просимо до адмін-панелі!</b>
        {' Тут адміністратори керують магазином. Покупцям потрібно '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>увійти на сайт</a>
        {' щоб переглядати свій акаунт, історію замовлень тощо.'}
      </p>
    </div>
  )
}
