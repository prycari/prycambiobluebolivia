import UkIcon from 'src/assets/currencies/ukIcon.svg'
import usaIcon from 'src/assets/currencies/usaIcon.svg'

import euroIcon from 'src/assets/currencies/euroIcon.svg'
import SwissIcon from 'src/assets/currencies/swissIcon.svg'
import BoliviaIcon from 'src/assets/currencies/boliviaIcon.svg'

export type CurrencyCode = 'CHF' | 'GBP' | 'EUR' | 'USD' | 'BOB'

export interface Currency {
    name: string
    icon?: string
    code: CurrencyCode
    abbreviation: string
}
export const currencies: Record<CurrencyCode, Currency> = {
    BOB: {
        code: "BOB",
        icon: BoliviaIcon,
        name: "Bolivian Boliviano",
        abbreviation: "Bs."
    },
    USD: {
        code: "USD",
        icon: usaIcon,
        name: "United States Dollar",
        abbreviation: "$"
    },
    EUR: {
        code: "EUR",
        name: "Euro",
        icon: euroIcon,
        abbreviation: "€"
    },
    CHF: {
        code: "CHF",
        icon: SwissIcon,
        name: "Swiss Franc",
        abbreviation: "Fr.",
    },
    GBP: {
        code: "GBP",
        icon: UkIcon,
        name: "Pound Sterling",
        abbreviation: "£",
    },
}