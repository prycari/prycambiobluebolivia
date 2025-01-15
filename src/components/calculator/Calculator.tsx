import React from 'react';
import { NumericFormat } from 'react-number-format'

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import {
    Card,
    Divider,
    CardContent,
    Grid2 as Grid,
} from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SwapHorizIcon from '@mui/icons-material/SwapHorizRounded';

import { Show } from '../Show';
import { WhatsappButton } from '../WhatsappButton';

import { SelectCurrency } from '../selectCurrency/SelectCurrency';
import { DefaultCurrency } from '../selectCurrency/DefaultCurrency';

import { useCurrencyExchange } from './hooks/useCurrencyExchange';
import { NonBobCurrencyCode } from './dtos/EurobobExchangeRateResponse';

const getUsaFormat = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(value)

export const Calculator = React.forwardRef((_props, ref) => {
    const { from, to, ...currencyExchange } = useCurrencyExchange()

    const fromCode = from.code as NonBobCurrencyCode
    const exchangeRateDate = !!currencyExchange.time && new Date(currencyExchange.time!)
    const exchangeRate = currencyExchange.bobExchangeRate ? currencyExchange.bobExchangeRate[fromCode] : 0;

    const handleFromAmountChange = (e: any) => {
        const fromUsaFormatAmount = e.target.value?.replace(/,/g, '')

        if (fromUsaFormatAmount) {
            const toAmount = +fromUsaFormatAmount * exchangeRate
            to.amount !== toAmount && currencyExchange.setCurrencyToAmount(toAmount)
        }
    }

    const handleToAmountChange = (e: any) => {
        const toUsaFormatAmount = e.target.value?.replace(/,/g, '')

        if (toUsaFormatAmount) {
            const fromAmount = +toUsaFormatAmount / exchangeRate
            from.amount !== fromAmount && currencyExchange.setCurrencyFromAmount(fromAmount)
        }
    }

    return (
        <Box id="hero" className='w-full' ref={ref}>
            <Container
                className='flex items-center flex-col'
                sx={{
                    pb: { xs: 8, sm: 12 },
                    pt: { xs: 14, sm: 20 },
                }}
            >
                <Stack
                    useFlexGap
                    spacing={2}
                    className='w-full items-center'
                    sx={{ width: { xs: '100%', sm: '70%' } }}
                >
                    <Typography
                        variant="h1"
                        className='text-center flex items-center'
                        sx={{
                            fontSize: {
                                xs: "1.7rem",
                                sm: "2rem",
                                md: "2.5rem",
                                lg: "3rem",
                            },
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}
                    >
                        {getUsaFormat(from.amount!)} {fromCode} a {to.code} hoy
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            width: { sm: '100%', md: '80%' },
                        }}
                    >
                        Convierte {fromCode} a {to.code} al tipo de cambio actualizado
                    </Typography>
                    <Stack
                        useFlexGap
                        spacing={1}
                        className='w-full'
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                    >
                        <Card className='flex w-full p-2 flex-col gap-4'>
                            <CardContent>
                                <Box className='flex align-baseline'>
                                    <Grid
                                        container
                                        spacing={0}
                                        rowSpacing={1}
                                        className='flex justify-center items-center flex-row w-full p-5'
                                    >
                                        <Grid component={'div'} size={{ xs: 12, md: 5 }}>
                                            <InputLabel className='font-semibold'>
                                                Amount
                                            </InputLabel>
                                            <NumericFormat
                                                fullWidth
                                                hiddenLabel
                                                decimalScale={2}
                                                value={from.amount}
                                                allowNegative={false}
                                                decimalSeparator='.'
                                                thousandSeparator=','
                                                placeholder='1,000.00'
                                                customInput={TextField}
                                                onChange={handleFromAmountChange}
                                                helperText={`Min. 100.00 ${fromCode}`}
                                                slotProps={{
                                                    input: {
                                                        style: { fontSize: '1.5rem' },
                                                        endAdornment: <SelectCurrency />,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid component={'div'} className='flex justify-center items-center' size={{ xs: 12, md: 2 }}>
                                            <Button className='mt-00 md:mt-3' size='large' disabled>
                                                <SwapHorizIcon fontSize='large' />
                                            </Button>
                                        </Grid>
                                        <Grid component={'div'} size={{ xs: 12, md: 5 }}>
                                            <InputLabel className='font-semibold'>
                                                Converted to
                                            </InputLabel>
                                            <NumericFormat
                                                fullWidth
                                                hiddenLabel
                                                decimalScale={2}
                                                allowNegative={false}
                                                decimalSeparator='.'
                                                thousandSeparator=','
                                                placeholder='10,000.00'
                                                value={to.amount}
                                                customInput={TextField}
                                                onChange={handleToAmountChange}
                                                slotProps={{
                                                    input: {
                                                        style: { fontSize: '1.5rem' },
                                                        endAdornment: <DefaultCurrency code='BOB' />,
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Divider className='w-full my-2 opacity-75' />
                                        <Grid
                                            component={'div'}
                                            size={{ xs: 12, md: 6 }}
                                        >
                                            <Typography variant="h5" className='pt-1'>
                                                {getUsaFormat(1)} {fromCode} = {exchangeRate.toFixed(5)} {to.code}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {from.name} to {to.name} at <br />
                                                <Link href="#" color="primary">
                                                    <Show when={!!currencyExchange.time}>
                                                        {exchangeRateDate.toLocaleString()}
                                                    </Show>
                                                </Link>.
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            component={'div'}
                                            size={{ xs: 12, md: 6 }}
                                            className='flex justify-end pt-2 items-center'
                                        >
                                            <Button
                                                className='mx-3'
                                                color='secondary'
                                                variant='contained'
                                                onClick={currencyExchange.refetch}
                                            >
                                                Recalculate
                                            </Button>
                                            <WhatsappButton
                                                phoneNumber='41772241120'
                                                disabled={!exchangeRateDate}
                                                message={`¡Hola buenas!\nQuiero cambiar *${getUsaFormat(from.amount!)} ${fromCode}*.\nA tipo de cambio *${getUsaFormat(exchangeRate)} ${fromCode}/${to.code}*.\n(actualizado el _${exchangeRateDate.toLocaleString()}_).`}
                                            >
                                                Contact Us
                                                <WhatsAppIcon fontSize='small' className='ml-1' />
                                            </WhatsappButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Stack>
            </Container>
        </Box >
    );
})
