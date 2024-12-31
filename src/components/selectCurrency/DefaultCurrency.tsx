import { FC } from "react"
import { Button } from "@mui/material"

import { currencies, CurrencyCode } from './Currency'

type DefaultCurrencyProps = {
    code: CurrencyCode
}

export const DefaultCurrency: FC<DefaultCurrencyProps> = ({
    code
}) => {
    const defaultCurrency = currencies[code]

    return (
        <Button
            disabled
            className="flex items-center"
        >
            <div className="size-14 sm:size-11 flex items-center">
                <img src={defaultCurrency?.icon} height={24} />
            </div>
            <div className="ml-1 text-base">
                {defaultCurrency?.code}
            </div>
        </Button>
    )
}