import { NextRequest, NextResponse } from 'next/server'

const NOVA_POSHTA_API_KEY =
  process.env.NOVAPOSHTA_API_KEY || '45c6c9717de10fcc8121c926b50416c6'

type NovaPoshtaCity = {
  Ref: string
  Description: string
  SettlementTypeDescription?: string
}

export async function POST(req: NextRequest) {
  try {
    const { query } = (await req.json()) as { query?: string }

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return NextResponse.json({ cities: [] })
    }

    const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVA_POSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'getCities',
        methodProperties: {
          FindByString: query.trim(),
          Page: '1',
          Limit: '20',
        },
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch cities from Nova Poshta' },
        {
          status: 502,
        },
      )
    }

    const data = (await response.json()) as {
      success: boolean
      data?: NovaPoshtaCity[]
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

    const cities = data.data.map((city) => ({
      ref: city.Ref,
      name: city.Description,
    }))

    return NextResponse.json({ cities })
  } catch {
    return NextResponse.json(
      { error: 'Unexpected error while fetching cities' },
      {
        status: 500,
      },
    )
  }
}

