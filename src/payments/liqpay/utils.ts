import crypto from 'crypto'

export function liqpayEncodeData(payload: unknown): string {
  const json = JSON.stringify(payload)
  return Buffer.from(json, 'utf8').toString('base64')
}

// LiqPay signature: base64( sha1(private_key + data + private_key) )
export function liqpaySignature(args: { privateKey: string; data: string }): string {
  const toSign = `${args.privateKey}${args.data}${args.privateKey}`
  return crypto.createHash('sha1').update(toSign, 'utf8').digest('base64')
}

export function liqpayVerifySignature(args: {
  privateKey: string
  data: string
  signature: string
}): boolean {
  const expected = liqpaySignature({ privateKey: args.privateKey, data: args.data })
  // constant-time compare
  const a = Buffer.from(expected)
  const b = Buffer.from(args.signature)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a as unknown as Uint8Array, b as unknown as Uint8Array)
}

export function liqpayDecodeData<T = unknown>(data: string): T {
  const json = Buffer.from(data, 'base64').toString('utf8')
  return JSON.parse(json) as T
}
