import { Currency } from "src/components/selectCurrency/Currency"
import { EuroBobExchangeRateResponse } from "./EurobobExchangeRateResponse"

export type CurrencyAmount = {
    amount?: number
} & Currency

export type CurrencyExchange = {
    to: CurrencyAmount
    from: CurrencyAmount
} & Partial<EuroBobExchangeRateResponse>