import { combineReducers } from '@reduxjs/toolkit'
import { pryboliviangirobackendApi } from 'src/apis/pryboliviangirobackendApi'

import { currencyExchangeReducer, initialCurrencyExchangeState } from 'src/components/calculator/store/CurrencyExchangeReducer'

export const initialRootState = {
    currencyExchange: initialCurrencyExchangeState
}

export const rootReducer = combineReducers({
    currencyExchange: currencyExchangeReducer,
    [pryboliviangirobackendApi.reducerPath]: pryboliviangirobackendApi.reducer
})
