export { createSlice } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NonBobCurrencyCode } from '../dtos/EurobobExchangeRateResponse'
import { pryboliviangirobackendApi } from 'src/apis/pryboliviangirobackendApi'

import { CurrencyExchange } from 'src/components/calculator/dtos/CurrencyAmount'
import { currencies, CurrencyCode } from 'src/components/selectCurrency/Currency'

export const initialCurrencyExchangeState: CurrencyExchange = {
    from: {
        amount: 1000,
        ...currencies.EUR,
    },
    to: {
        ...currencies.BOB,
    }
}

export const {
    actions: currencyExchangeActions,
    reducer: currencyExchangeReducer,
} = createSlice({
    name: 'currencyExchangeReducer',
    initialState: initialCurrencyExchangeState,
    reducers: {
        setCurrencyFromCode(state, action: PayloadAction<NonBobCurrencyCode>) {
            const fromCode = action.payload
            const fromAmount = state.from.amount

            if (state.from.code !== fromCode) {
                const title = document.getElementById('title')
                const fromCurrency = currencies[fromCode as CurrencyCode]

                if (title) {
                    title.innerHTML = `CambioBlueBolivia ${fromCode} TO ${state.to.code}`
                }

                state.from = {
                    ...fromCurrency,
                    amount: fromAmount,
                }

                if (!!state.bobExchangeRate) {
                    const exchangeRate = state.bobExchangeRate[fromCode]

                    if (fromAmount) {
                        state.to.amount = fromAmount * exchangeRate
                    }
                }
            }
        },
        setCurrencyFromAmount(state, action: PayloadAction<number>) {
            const fromCode = state.from.code
            const fromAmount = action.payload

            state.from.amount = fromAmount
            if (!!state.bobExchangeRate) {
                const exchangeRate = state.bobExchangeRate[fromCode as NonBobCurrencyCode]
                const toAmount = fromAmount * exchangeRate

                if (toAmount !== state.to.amount) {
                    state.to.amount = toAmount
                }
            }
        },
        setCurrencyToAmount(state, action: PayloadAction<number>) {
            const toAmount = action.payload
            const fromCode = state.from.code

            state.to.amount = toAmount
            if (!!state.bobExchangeRate) {
                const exchangeRate = state.bobExchangeRate[fromCode as NonBobCurrencyCode]
                const fromAmount = toAmount / exchangeRate

                if (fromAmount !== state.from.amount) {
                    state.from.amount = toAmount / exchangeRate
                }
            }
        },
    },
    extraReducers: builder => builder
        .addMatcher(pryboliviangirobackendApi.endpoints.getEuroBobExchangeRate.matchFulfilled, (state, action) => {
            const payload = action.payload
            const fromCode = state.from.code as NonBobCurrencyCode

            state.time = payload.time
            state.bobExchangeRate = payload.bobExchangeRate

            const fromAmount = state.from.amount
            const exchangeRate = payload.bobExchangeRate[fromCode]

            if (fromAmount) {
                state.to.amount = fromAmount * exchangeRate
            }
        })
})