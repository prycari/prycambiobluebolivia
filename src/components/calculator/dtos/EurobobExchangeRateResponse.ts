import { CurrencyCode } from "src/components/selectCurrency/Currency"

export type NonBobCurrencyCode = Exclude<CurrencyCode, 'BOB'>

export interface EuroBobExchangeRateResponse {
    time: Date
    bobExchangeRate: Record<NonBobCurrencyCode, number>
}