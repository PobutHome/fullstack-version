import { NextRequest, NextResponse } from 'next/server'

const NOVA_POSHTA_API_KEY =
  process.env.NOVAPOSHTA_API_KEY || '45c6c9717de10fcc8121c926b50416c6'

type NovaPoshtaWarehouse = {
  Ref: string
  Description: string
  ShortAddress?: string
  Number?: string
  CategoryOfWarehouse?: string
  PostalCodeUA?: string
  WarehouseIndex?: string
  TotalMaxWeightAllowed?: string
  PlaceMaxWeightAllowed?: string
  PostMachineType?: string
  SendingLimitationsOnDimensions?: {
    Width?: number
    Height?: number
    Length?: number
  }
}

type WarehousesRequestBody = {
  city?: string
  cityRef?: string
  page?: number | string
  limit?: number | string
  findByString?: string
  warehouseId?: string
  typeOfWarehouseRef?: string
}

export async function POST(req: NextRequest) {
  try {
    const {
      city,
      cityRef,
      page,
      limit,
      findByString,
      warehouseId,
      typeOfWarehouseRef,
    } = (await req.json()) as WarehousesRequestBody

    if ((!city || typeof city !== 'string') && (!cityRef || typeof cityRef !== 'string')) {
      return NextResponse.json(
        { error: 'City or cityRef is required' },
        {
          status: 400,
        },
      )
    }

    const methodProperties: Record<string, string> = {
      ...(cityRef ? { CityRef: cityRef } : { CityName: city! }),
      Page: String(page ?? 1),
      // Nova Poshta may return a lot of warehouses for big cities,
      // so use a generous default to avoid truncation.
      Limit: String(limit ?? 200),
      Language: 'UA',
    }

    if (typeof findByString === 'string' && findByString.trim()) {
      methodProperties.FindByString = findByString.trim()
    }

    if (typeof warehouseId === 'string' && warehouseId.trim()) {
      methodProperties.WarehouseId = warehouseId.trim()
    }

    if (typeof typeOfWarehouseRef === 'string' && typeOfWarehouseRef.trim()) {
      methodProperties.TypeOfWarehouseRef = typeOfWarehouseRef.trim()
    }

    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVA_POSHTA_API_KEY,
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch warehouses from Nova Poshta' },
        {
          status: 502,
        },
      )
    }

    const data = (await response.json()) as {
      success: boolean
      data?: NovaPoshtaWarehouse[]
      errors?: (string | { ErrorCode?: string; MessageText?: string })[]
    }

    if (!data.success || !Array.isArray(data.data)) {
      return NextResponse.json(
        {
          error:
            (Array.isArray(data.errors) && typeof data.errors[0] === 'string'
              ? data.errors[0]
              : 'Nova Poshta API returned an error') || 'Nova Poshta API returned an error',
        },
        {
          status: 502,
        },
      )
    }

    const warehouses = data.data.map((wh): {
      id: string
      label: string
      primary?: string
      secondary?: string
      categoryLabel?: string
      postalCode?: string
      index?: string
      weightInfo?: string
      sizeInfo?: string
      postomatNote?: string
    } => {
      const baseLabel =
        wh.ShortAddress ||
        (wh.Number ? `Відділення №${wh.Number}: ${wh.Description}` : wh.Description)

      const categoryLabel =
        wh.CategoryOfWarehouse === 'Postomat'
          ? 'Поштомат'
          : wh.CategoryOfWarehouse === 'DropOff'
            ? 'Пункт прийому'
            : wh.CategoryOfWarehouse === 'Branch'
              ? 'Відділення'
              : undefined

      const postomatNote =
        wh.CategoryOfWarehouse === 'Postomat'
          ? wh.PostMachineType === 'ForResidentsOfEntrance'
            ? 'Лише для мешканців підʼїзду'
            : wh.PostMachineType === 'FullDayService'
              ? 'Цілодобове обслуговування'
              : undefined
          : undefined

      const weightInfo =
        wh.TotalMaxWeightAllowed && wh.TotalMaxWeightAllowed !== '0'
          ? `До ${wh.TotalMaxWeightAllowed} кг загалом`
          : wh.PlaceMaxWeightAllowed && wh.PlaceMaxWeightAllowed !== '0'
            ? `До ${wh.PlaceMaxWeightAllowed} кг на одне місце`
            : undefined

      const sizeInfo = wh.SendingLimitationsOnDimensions
        ? `${wh.SendingLimitationsOnDimensions.Length ?? ''}×${wh.SendingLimitationsOnDimensions.Width ?? ''}×${wh.SendingLimitationsOnDimensions.Height ?? ''} см`
        : undefined

      return {
        id: wh.Ref,
        label: baseLabel,
        primary: wh.Number ? `Відділення №${wh.Number}` : wh.Description,
        secondary: wh.ShortAddress || undefined,
        categoryLabel,
        postalCode: wh.PostalCodeUA || undefined,
        index: wh.WarehouseIndex || undefined,
        weightInfo,
        sizeInfo,
        postomatNote,
      }
    })

    return NextResponse.json({ warehouses })
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error while fetching warehouses' },
      {
        status: 500,
      },
    )
  }
}

