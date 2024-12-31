import { useDispatch, useSelector } from "react-redux"

import { RootState } from "src/app/createStore"
import { useGetEuroBobExchangeRateQuery } from "src/apis/pryboliviangirobackendApi"

import { NonBobCurrencyCode } from "src/components/calculator/dtos/EurobobExchangeRateResponse"
import { currencyExchangeActions } from 'src/components/calculator/store/CurrencyExchangeReducer'

export const useCurrencyExchange = () => {
    const dispatch = useDispatch()

    const exchangeRateQuery = useGetEuroBobExchangeRateQuery()
    const currencyExchange = useSelector((state: RootState) => state.currencyExchange)

    const setCurrencyFromCode = (fromCode: NonBobCurrencyCode) => {
        dispatch(currencyExchangeActions.setCurrencyFromCode(fromCode))
    }

    const setCurrencyFromAmount = (fromAmount: number) => {
        dispatch(currencyExchangeActions.setCurrencyFromAmount(fromAmount))
    }

    const setCurrencyToAmount = (toAmount: number) => {
        dispatch(currencyExchangeActions.setCurrencyToAmount(toAmount))
    }

    return {
        ...currencyExchange,
        ...exchangeRateQuery,
        setCurrencyToAmount,
        setCurrencyFromCode,
        setCurrencyFromAmount,
    }
}