import { NextRequest, NextResponse } from 'next/server'

const NOVA_POSHTA_API_KEY =
  process.env.NOVAPOSHTA_API_KEY || '45c6c9717de10fcc8121c926b50416c6'

type NovaPoshtaWarehouse = {
  Ref: string
  Description: string
  ShortAddress?: string
  Number?: string
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
      errors?: string[]
    }

    if (!data.success || !Array.isArray(data.data)) {
      return NextResponse.json(
        {
          error: data.errors?.[0] || 'Nova Poshta API returned an error',
        },
        {
          status: 502,
        },
      )
    }

    const warehouses = data.data.map((wh) => ({
      id: wh.Ref,
      label:
        wh.ShortAddress ||
        (wh.Number ? `Відділення №${wh.Number} — ${wh.Description}` : wh.Description),
    }))

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

