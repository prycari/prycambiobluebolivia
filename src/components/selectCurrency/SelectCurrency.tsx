import { useState } from "react"

import {
    Menu,
    Button,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"

import { CurrencyCode, currencies } from "./Currency"

import { useCurrencyExchange } from "../calculator/hooks/useCurrencyExchange"
import { NonBobCurrencyCode } from "../calculator/dtos/EurobobExchangeRateResponse"

const noBobCurrencies = [
    currencies.CHF,
    currencies.EUR,
    currencies.GBP,
    currencies.USD,
]

export const SelectCurrency = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>()
    const { from: currencyFrom, setCurrencyFromCode } = useCurrencyExchange()

    const open = Boolean(anchorEl)
    const handleClose = () => setAnchorEl(null)

    const handleSelect = (fromCode: CurrencyCode) => {
        setCurrencyFromCode(fromCode as NonBobCurrencyCode)
        setAnchorEl(null)
    }

    return <>
        <Button
            className="flex items-center"
            onClick={e => setAnchorEl(e.currentTarget)}
        >
            <div className="size-14 sm:size-11 flex items-center">
                <img src={currencyFrom?.icon} height={24} />
            </div>
            <div className="ml-1 text-base">
                {currencyFrom?.code}
            </div>
        </Button>
        <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
        >
            {noBobCurrencies.flatMap(curr => {
                if (curr.code === currencyFrom.code) {
                    return []
                }

                return (
                    <MenuItem
                        key={curr.code}
                        onClick={() => handleSelect(curr.code)}
                    >
                        <ListItemIcon>
                            <div className="size-7 sm:size-7">
                                <img src={curr.icon} height={24} />
                            </div>
                        </ListItemIcon>
                        <ListItemText>
                            {curr.code}
                        </ListItemText>
                    </MenuItem>
                )
            })}
        </Menu>
    </>
}