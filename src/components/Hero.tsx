import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
    Card,
    Divider,
    CardContent,
    Grid2 as Grid,
} from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SwapHorizIcon from '@mui/icons-material/SwapHorizRounded';

import { SelectCurrency } from './selectCurrency/SelectCurrency';
import { DefaultCurrency } from './selectCurrency/DefaultCurrency';
import { CurrencyExchange } from './calculator/dtos/CurrencyAmount';

import { useCurrencyExchange } from './calculator/hooks/useCurrencyExchange';
import { NonBobCurrencyCode } from './calculator/dtos/EurobobExchangeRateResponse';

const getUsaFormat = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(value)

export default function Hero() {
    const { from, to, ...currencyExchange } = useCurrencyExchange()
    const { register, handleSubmit, ...form } = useForm<Omit<CurrencyExchange, 'time' | 'bobExchangeRate'>>({
        mode: 'onChange',
        defaultValues: { from, to }
    })

    const fromCode = from.code as NonBobCurrencyCode
    const exchangeRate = currencyExchange.bobExchangeRate ? currencyExchange.bobExchangeRate[fromCode] : 0;

    // const { errors } = form.formState
    const minimumToAmount = 100 * exchangeRate

    const handleFromAmountChange = (e: any) => {
        const fromUsaFormatAmount = e.target.value?.replace(/,/g, '')

        if (fromUsaFormatAmount) {
            const toAmount = +fromUsaFormatAmount * exchangeRate

            if (to.amount !== toAmount) {
                form.setValue('to.amount', toAmount)
                currencyExchange.setCurrencyToAmount(toAmount)
            }
        }
    }

    const handleToAmountChange = (e: any) => {
        const toUsaFormatAmount = e.target.value?.replace(/,/g, '')
        if (toUsaFormatAmount) {
            const fromAmount = +toUsaFormatAmount / exchangeRate

            if (from.amount !== fromAmount) {
                form.setValue('from.amount', fromAmount)
                currencyExchange.setCurrencyFromAmount(fromAmount)
            }
        }
    }

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Box id="hero" className='w-full'>
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
                        {getUsaFormat(from.amount!)} {fromCode} to {to.code} today
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            width: { sm: '100%', md: '80%' },
                        }}
                    >
                        Convert {fromCode} to {to.code} at the real exchange rate
                    </Typography>
                    <Stack
                        useFlexGap
                        spacing={1}
                        className='w-full'
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    allowNegative={false}
                                                    decimalSeparator='.'
                                                    thousandSeparator=','
                                                    placeholder='1,000.00'
                                                    value={from.amount}
                                                    customInput={TextField}
                                                    slotProps={{
                                                        input: {
                                                            style: { fontSize: '1.5rem' },
                                                            endAdornment: <SelectCurrency />,
                                                        }
                                                    }}
                                                    {...register('from.amount', {
                                                        onChange: handleFromAmountChange,
                                                        required: 'Amount required',
                                                        min: {
                                                            value: 100,
                                                            message: `at least 100.00 ${fromCode}`
                                                        }
                                                    })}
                                                />
                                            </Grid>
                                            <Grid component={'div'} className='flex justify-center items-center' size={{ xs: 12, md: 2 }}>
                                                <Button className='mt-3' size='large' disabled>
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
                                                    decimalSeparator='.'
                                                    thousandSeparator=','
                                                    placeholder='10,000.00'
                                                    value={to.amount}
                                                    customInput={TextField}
                                                    // error={!!errors.to?.amount}
                                                    slotProps={{
                                                        input: {
                                                            style: { fontSize: '1.5rem' },
                                                            endAdornment: <DefaultCurrency code='BOB' />,
                                                        }
                                                    }}
                                                    {...register('to.amount', {
                                                        onChange: handleToAmountChange,
                                                        min: {
                                                            value: minimumToAmount,
                                                            message: `at least ${minimumToAmount.toFixed(2)}`
                                                        }
                                                    })}
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
                                                        {currencyExchange.time?.toLocaleString('es-US')}
                                                    </Link>.
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                component={'div'}
                                                size={{ xs: 12, md: 6 }}
                                                className='flex justify-end pt-2 items-center'
                                            >
                                                <Button className='mx-3' color='secondary' variant='contained'>
                                                    Recalculate
                                                </Button>
                                                <Button
                                                    type='submit'
                                                    color='primary'
                                                    variant='contained'
                                                    className='flex items-center'
                                                >
                                                    Contact Us
                                                    <WhatsAppIcon fontSize='small' className='ml-1' />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </form>
                    </Stack>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                    >
                        By clicking &quot;Start now&quot; you agree to our&nbsp;
                        <Link href="#" color="primary">
                            Terms & Conditions
                        </Link>
                        .
                    </Typography>
                </Stack>
            </Container>
        </Box >
    );
}
