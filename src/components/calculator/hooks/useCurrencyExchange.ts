import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "src/app/createStore"
import { useGetEuroBobExchangeRateQuery } from "src/apis/pryboliviangirobackendApi"

import { NonBobCurrencyCode } from "src/components/calculator/dtos/EurobobExchangeRateResponse"
import { currencyExchangeActions } from 'src/components/calculator/store/CurrencyExchangeReducer'

const nonBobCurrencyCodes = [
    'CHF', 'EUR', 'USD', 'GBP'
] as NonBobCurrencyCode[]

export const useCurrencyExchange = () => {
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(window.location.search)

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

    useEffect(() => {
        let hasTitleChanged = false

        searchParams.forEach((value, key) => {
            const lowerKey = key.toLocaleLowerCase()

            if (lowerKey === 'from') {
                const codeValue = value as NonBobCurrencyCode

                if (nonBobCurrencyCodes.includes(codeValue)) {
                    hasTitleChanged = true
                    setCurrencyFromCode(codeValue)
                }

                return
            }

            if (lowerKey === 'amount') {
                const amountValue = parseFloat(value)

                if (!isNaN(amountValue)) {
                    setCurrencyFromAmount(amountValue)
                }
            }
        })

        if (!hasTitleChanged) {
            const title = document.getElementById('title')

            if (title) {
                title.innerText = `CambioBlueBolivia ${currencyExchange.from.code} TO ${currencyExchange.to.code}`
            }
        }
    }, [])

    return {
        ...currencyExchange,
        ...exchangeRateQuery,
        setCurrencyToAmount,
        setCurrencyFromCode,
        setCurrencyFromAmount,
    }
}