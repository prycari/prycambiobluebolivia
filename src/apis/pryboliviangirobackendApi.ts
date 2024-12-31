import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EuroBobExchangeRateResponse } from "src/components/calculator/dtos/EurobobExchangeRateResponse";

const reducerPath = 'pryboliviangirobackendApi';
const apiBaseUrl = import.meta.env.VITE_PRYBOLIVIANGIROBACKEND_BASE_URL;

export const pryboliviangirobackendApi = createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
    }),
    endpoints: (builder) => ({
        getEuroBobExchangeRate: builder.query<EuroBobExchangeRateResponse, void>({
            query: () => ({
                method: 'GET',
                url: '/eurobob-exchange-rate',
            }),
        })
    })
});

export const {
    useGetEuroBobExchangeRateQuery,
    useLazyGetEuroBobExchangeRateQuery,
} = pryboliviangirobackendApi;
