// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { ru } from '@payloadcms/translations/languages/ru'
import { uk } from '@payloadcms/translations/languages/uk'

import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/collections/Categories'
import { DeliveryMethods } from '@/collections/DeliveryMethods/index'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isR2Enabled = Boolean(
  process.env.R2_BUCKET &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_ACCOUNT_ID,
)

const adminSupportedLanguages: any = {
  uk,
  // Alias for compatibility with our app locale code
  ua: uk,
  ru,
}

const adminTranslations: any = {
  uk: {
    'plugin-ecommerce': {
      abandoned: 'Покинуто',
      active: 'Активний',
      address: 'Адреса',
      addressCity: 'Місто',
      addressCompany: 'Компанія',
      addressCountry: 'Країна',
      addresses: 'Адреси',
      addressesCollectionDescription:
        'Адреси пов’язані з клієнтами та використовуються для автозаповнення доставки й оплати під час оформлення замовлення.',
      addressFirstName: 'Імʼя',
      addressLastName: 'Прізвище',
      addressLine1: 'Адреса 1',
      addressLine2: 'Адреса 2',
      addressPhone: 'Телефон',
      addressPostalCode: 'Поштовий індекс',
      addressState: 'Область',
      addressTitle: 'Назва',
      amount: 'Сума',
      availableVariants: 'Доступні варіанти',
      billing: 'Оплата',
      billingAddress: 'Платіжна адреса',
      cancelled: 'Скасовано',
      cart: 'Кошик',
      carts: 'Кошики',
      cartsCollectionDescription:
        'Кошики відображають вибір товарів, які клієнт планує придбати. За можливості вони пов’язані з клієнтом; у гостей клієнт може бути відсутній.',
      completed: 'Завершено',
      currency: 'Валюта',
      currencyNotSet: 'Валюта не задана.',
      customer: 'Клієнт',
      customerEmail: 'Email клієнта',
      customers: 'Клієнти',
      enableCurrencyPrice: 'Увімкнути ціну в {{currency}}',
      enableVariants: 'Увімкнути варіанти',
      expired: 'Термін минув',
      failed: 'Невдало',
      inventory: 'Наявність',
      item: 'Позиція',
      items: 'Позиції',
      open: 'Відкрито',
      order: 'Замовлення',
      orderDetails: 'Деталі замовлення',
      orders: 'Замовлення',
      ordersCollectionDescription:
        'Замовлення відображають намір клієнта придбати товари у вашому магазині. Вони містять деталі: товари, кількості, ціни, дані клієнта та статус замовлення.',
      paymentMethod: 'Спосіб оплати',
      paymentMethods: 'Способи оплати',
      pending: 'Очікує',
      price: 'Ціна',
      priceIn: 'Ціна ({{currency}})',
      priceNotSet: 'Ціну не задано.',
      prices: 'Ціни',
      priceSetInVariants: 'Ціну задано у варіантах.',
      processing: 'В обробці',
      product: 'Товар',
      productPriceDescription:
        'Ця ціна також використовується для сортування та фільтрації товарів. Якщо увімкнені варіанти, ви можете вказати найнижчу або середню ціну для пошуку й фільтрації, але під час оформлення замовлення ця ціна не використовується.',
      productRequired: 'Потрібно вказати товар.',
      products: 'Товари',
      purchased: 'Куплено',
      purchasedAt: 'Дата покупки',
      quantity: 'Кількість',
      refunded: 'Повернено',
      shipping: 'Доставка',
      shippingAddress: 'Адреса доставки',
      status: 'Статус',
      subtotal: 'Проміжний підсумок',
      succeeded: 'Успішно',
      transaction: 'Транзакція',
      transactionDetails: 'Деталі транзакції',
      transactions: 'Транзакції',
      transactionsCollectionDescription:
        'Транзакції — це спроби оплати за замовлення. Одне замовлення може мати кілька пов’язаних транзакцій, наприклад початкову спробу оплати та подальші повернення або коригування.',
      variant: 'Варіант',
      variantOption: 'Опція варіанта',
      variantOptions: 'Опції варіанта',
      variantOptionsAlreadyExists:
        'Ця комбінація опцій уже використовується іншим варіантом. Будь ласка, виберіть інші опції.',
      variantOptionsCollectionDescription:
        'Опції варіанта визначають можливі значення для типу варіанта, наприклад “червоний” або “білий” для кольорів.',
      variantOptionsRequired: 'Опції варіанта обовʼязкові.',
      variantOptionsRequiredAll: 'Усі опції варіанта обовʼязкові.',
      variants: 'Варіанти',
      variantsCollectionDescription:
        'Варіанти товару дозволяють пропонувати різні версії товару, наприклад розміри або кольори. Вони посилаються на опції варіантів товару відповідно до дозволених типів варіантів.',
      variantType: 'Тип варіанта',
      variantTypes: 'Типи варіантів',
      variantTypesCollectionDescription:
        'Типи варіантів використовуються для визначення різновидів варіантів, які можуть мати ваші товари, наприклад “розмір” або “колір”. Кожен тип може мати кілька опцій.',
    },
  },
  ua: {
    'plugin-ecommerce': {
      abandoned: 'Покинуто',
      active: 'Активний',
      address: 'Адреса',
      addressCity: 'Місто',
      addressCompany: 'Компанія',
      addressCountry: 'Країна',
      addresses: 'Адреси',
      addressesCollectionDescription:
        'Адреси пов’язані з клієнтами та використовуються для автозаповнення доставки й оплати під час оформлення замовлення.',
      addressFirstName: 'Імʼя',
      addressLastName: 'Прізвище',
      addressLine1: 'Адреса 1',
      addressLine2: 'Адреса 2',
      addressPhone: 'Телефон',
      addressPostalCode: 'Поштовий індекс',
      addressState: 'Область',
      addressTitle: 'Назва',
      amount: 'Сума',
      availableVariants: 'Доступні варіанти',
      billing: 'Оплата',
      billingAddress: 'Платіжна адреса',
      cancelled: 'Скасовано',
      cart: 'Кошик',
      carts: 'Кошики',
      cartsCollectionDescription:
        'Кошики відображають вибір товарів, які клієнт планує придбати. За можливості вони пов’язані з клієнтом; у гостей клієнт може бути відсутній.',
      completed: 'Завершено',
      currency: 'Валюта',
      currencyNotSet: 'Валюта не задана.',
      customer: 'Клієнт',
      customerEmail: 'Email клієнта',
      customers: 'Клієнти',
      enableCurrencyPrice: 'Увімкнути ціну в {{currency}}',
      enableVariants: 'Увімкнути варіанти',
      expired: 'Термін минув',
      failed: 'Невдало',
      inventory: 'Наявність',
      item: 'Позиція',
      items: 'Позиції',
      open: 'Відкрито',
      order: 'Замовлення',
      orderDetails: 'Деталі замовлення',
      orders: 'Замовлення',
      ordersCollectionDescription:
        'Замовлення відображають намір клієнта придбати товари у вашому магазині. Вони містять деталі: товари, кількості, ціни, дані клієнта та статус замовлення.',
      paymentMethod: 'Спосіб оплати',
      paymentMethods: 'Способи оплати',
      pending: 'Очікує',
      price: 'Ціна',
      priceIn: 'Ціна ({{currency}})',
      priceNotSet: 'Ціну не задано.',
      prices: 'Ціни',
      priceSetInVariants: 'Ціну задано у варіантах.',
      processing: 'В обробці',
      product: 'Товар',
      productPriceDescription:
        'Ця ціна також використовується для сортування та фільтрації товарів. Якщо увімкнені варіанти, ви можете вказати найнижчу або середню ціну для пошуку й фільтрації, але під час оформлення замовлення ця ціна не використовується.',
      productRequired: 'Потрібно вказати товар.',
      products: 'Товари',
      purchased: 'Куплено',
      purchasedAt: 'Дата покупки',
      quantity: 'Кількість',
      refunded: 'Повернено',
      shipping: 'Доставка',
      shippingAddress: 'Адреса доставки',
      status: 'Статус',
      subtotal: 'Проміжний підсумок',
      succeeded: 'Успішно',
      transaction: 'Транзакція',
      transactionDetails: 'Деталі транзакції',
      transactions: 'Транзакції',
      transactionsCollectionDescription:
        'Транзакції — це спроби оплати за замовлення. Одне замовлення може мати кілька пов’язаних транзакцій, наприклад початкову спробу оплати та подальші повернення або коригування.',
      variant: 'Варіант',
      variantOption: 'Опція варіанта',
      variantOptions: 'Опції варіанта',
      variantOptionsAlreadyExists:
        'Ця комбінація опцій уже використовується іншим варіантом. Будь ласка, виберіть інші опції.',
      variantOptionsCollectionDescription:
        'Опції варіанта визначають можливі значення для типу варіанта, наприклад “червоний” або “білий” для кольорів.',
      variantOptionsRequired: 'Опції варіанта обовʼязкові.',
      variantOptionsRequiredAll: 'Усі опції варіанта обовʼязкові.',
      variants: 'Варіанти',
      variantsCollectionDescription:
        'Варіанти товару дозволяють пропонувати різні версії товару, наприклад розміри або кольори. Вони посилаються на опції варіантів товару відповідно до дозволених типів варіантів.',
      variantType: 'Тип варіанта',
      variantTypes: 'Типи варіантів',
      variantTypesCollectionDescription:
        'Типи варіантів використовуються для визначення різновидів варіантів, які можуть мати ваші товари, наприклад “розмір” або “колір”. Кожен тип може мати кілька опцій.',
    },
  },
  ru: {
    'plugin-ecommerce': {
      abandoned: 'Брошено',
      active: 'Активный',
      address: 'Адрес',
      addressCity: 'Город',
      addressCompany: 'Компания',
      addressCountry: 'Страна',
      addresses: 'Адреса',
      addressesCollectionDescription:
        'Адреса связаны с клиентами и используются для автозаполнения доставки и оплаты при оформлении заказа.',
      addressFirstName: 'Имя',
      addressLastName: 'Фамилия',
      addressLine1: 'Адрес 1',
      addressLine2: 'Адрес 2',
      addressPhone: 'Телефон',
      addressPostalCode: 'Почтовый индекс',
      addressState: 'Область/Регион',
      addressTitle: 'Название',
      amount: 'Сумма',
      availableVariants: 'Доступные варианты',
      billing: 'Оплата',
      billingAddress: 'Платёжный адрес',
      cancelled: 'Отменено',
      cart: 'Корзина',
      carts: 'Корзины',
      cartsCollectionDescription:
        'Корзины отражают выбор товаров, которые клиент планирует купить. По возможности они связаны с клиентом; у гостей клиент может отсутствовать.',
      completed: 'Завершено',
      currency: 'Валюта',
      currencyNotSet: 'Валюта не задана.',
      customer: 'Клиент',
      customerEmail: 'Email клиента',
      customers: 'Клиенты',
      enableCurrencyPrice: 'Включить цену в {{currency}}',
      enableVariants: 'Включить варианты',
      expired: 'Истекло',
      failed: 'Неудачно',
      inventory: 'Наличие',
      item: 'Позиция',
      items: 'Позиции',
      open: 'Открыто',
      order: 'Заказ',
      orderDetails: 'Детали заказа',
      orders: 'Заказы',
      ordersCollectionDescription:
        'Заказы отражают намерение клиента купить товары в вашем магазине. Они содержат детали: товары, количества, цены, данные клиента и статус заказа.',
      paymentMethod: 'Способ оплаты',
      paymentMethods: 'Способы оплаты',
      pending: 'Ожидает',
      price: 'Цена',
      priceIn: 'Цена ({{currency}})',
      priceNotSet: 'Цена не задана.',
      prices: 'Цены',
      priceSetInVariants: 'Цена задана в вариантах.',
      processing: 'В обработке',
      product: 'Товар',
      productPriceDescription:
        'Эта цена также используется для сортировки и фильтрации товаров. Если включены варианты, вы можете указать минимальную или среднюю цену для поиска и фильтрации, но при оформлении заказа эта цена не используется.',
      productRequired: 'Необходимо указать товар.',
      products: 'Товары',
      purchased: 'Куплено',
      purchasedAt: 'Дата покупки',
      quantity: 'Количество',
      refunded: 'Возвращено',
      shipping: 'Доставка',
      shippingAddress: 'Адрес доставки',
      status: 'Статус',
      subtotal: 'Промежуточный итог',
      succeeded: 'Успешно',
      transaction: 'Транзакция',
      transactionDetails: 'Детали транзакции',
      transactions: 'Транзакции',
      transactionsCollectionDescription:
        'Транзакции — это попытки оплаты заказа. Один заказ может иметь несколько связанных транзакций, например первичную попытку оплаты и последующие возвраты или корректировки.',
      variant: 'Вариант',
      variantOption: 'Опция варианта',
      variantOptions: 'Опции варианта',
      variantOptionsAlreadyExists:
        'Эта комбинация опций уже используется другим вариантом. Пожалуйста, выберите другие опции.',
      variantOptionsCollectionDescription:
        'Опции варианта определяют возможные значения для типа варианта, например “красный” или “белый” для цветов.',
      variantOptionsRequired: 'Опции варианта обязательны.',
      variantOptionsRequiredAll: 'Все опции варианта обязательны.',
      variants: 'Варианты',
      variantsCollectionDescription:
        'Варианты товара позволяют предлагать разные версии товара, например размеры или цвета. Они ссылаются на опции вариантов товара согласно разрешённым типам вариантов.',
      variantType: 'Тип варианта',
      variantTypes: 'Типы вариантов',
      variantTypesCollectionDescription:
        'Типы вариантов используются для определения разновидностей вариантов, которые могут иметь ваши товары, например “размер” или “цвет”. Каждый тип может иметь несколько опций.',
    },
  },
}

export default buildConfig({
  admin: {
    meta: {
      title: 'Адмін-панель',
      titleSuffix: '— Адмін-панель',
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
    },
    user: Users.slug,
  },
  collections: [Users, Pages, Categories, DeliveryMethods, Media],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  localization: {
    defaultLocale: 'ua',
    fallback: true,
    locales: ['ua', 'ru'],
  },
  i18n: {
    fallbackLanguage: 'uk',
    // NOTE:
    // Content locales are `ua` / `ru`, but Payload Admin UI uses `uk` for Ukrainian.
    // If the browser (or i18next cookie `lng`) is set to `ua`, the admin UI would otherwise
    // show translation keys everywhere. We alias `ua` -> `uk` so UI translations resolve.
    supportedLanguages: adminSupportedLanguages,
    translations: adminTranslations,
  },
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  //email: nodemailerAdapter(),
  endpoints: [],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
    ...(isR2Enabled
      ? [
          s3Storage({
            bucket: process.env.R2_BUCKET as string,
            collections: {
              media: true,
            },
            config: {
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
              },
              endpoint: `https://${process.env.R2_ACCOUNT_ID as string}.r2.cloudflarestorage.com`,
              forcePathStyle: true,
              region: 'auto',
            },
          }),
        ]
      : []),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
