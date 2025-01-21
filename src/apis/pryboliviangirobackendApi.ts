import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EuroBobExchangeRateResponse } from "src/components/calculator/dtos/EurobobExchangeRateResponse";

const reducerPath = 'pryboliviangirobackendApi';

const username = import.meta.env.VITE_BASIC_AUTH_USER;
const password = import.meta.env.VITE_BASIC_AUTH_PASS;

const originUrl = import.meta.env.VITE_ORIGIN;
const apiBaseUrl = import.meta.env.VITE_PRYCAMBIOBLUEBOLIVIA_BASE_URL;

export const pryboliviangirobackendApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
        mode: 'cors',
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers) => {
            headers.set('origin', originUrl)

            if (username && password) {
                const credentials = btoa(`${username}:${password}`)
                headers.set('Authorization', `Basic ${credentials}`)
            }

            return headers
        },

    }),
    endpoints: (builder) => ({
        getEuroBobExchangeRate: builder.query<EuroBobExchangeRateResponse, void>({
            query: () => {
                return ({
                    method: 'GET',
                    url: '/eurobob-exchange-rate',
                });
            },
        })
    })
});

export const {
    useGetEuroBobExchangeRateQuery,
    useLazyGetEuroBobExchangeRateQuery,
} = pryboliviangirobackendApi;
