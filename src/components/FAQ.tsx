import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        question: 'How do I contact customer support if I have a question or issue?',
        answer: <>
            You can reach our customer support team by emailing&nbsp;
            <Link href="mailto:support@email.com">support@email.com</Link>
            &nbsp;or calling our toll-free number. We&apos;re here to assist you
            promptly.
        </>
    },
    {
        question: 'Can I return the product if it doesn&apos;t meet my expectations?',
        answer: <>
            Absolutely! We offer a hassle-free return policy. If you&apos;re not
            completely satisfied, you can return the product within [number of
            days] days for a full refund or exchange.
        </>
    },
    {
        question: 'What makes your product stand out from others in the market?',
        answer: <>
            Our product distinguishes itself through its adaptability, durability,
            and innovative features. We prioritize user satisfaction and
            continually strive to exceed expectations in every aspect.
        </>
    },
    {
        question: 'Is there a warranty on the product, and what does it cover?',
        answer: <>
            Yes, our product comes with a [length of warranty] warranty. It covers
            defects in materials and workmanship. If you encounter any issues
            covered by the warranty, please contact our customer support for
            assistance.
        </>
    }
]

export default function FAQ() {
    const [expanded, setExpanded] = React.useState<string[]>([]);

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(
                isExpanded
                    ? [...expanded, panel]
                    : expanded.filter((item) => item !== panel),
            );
        };

    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                gap: { xs: 3, sm: 6 },
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: 'text.primary',
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >Frequently asked questions</Typography>
            <Box sx={{ width: '100%' }}>
                {faqs.map((faq, index) => {
                    const panel = `panel${index + 1}`
                    return (
                        <Accordion
                            key={index}
                            onChange={handleChange(panel)}
                            expanded={expanded.includes(panel)}
                        >
                            <AccordionSummary
                                id={`${panel}d-header`}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${panel}d-content`}
                            >
                                <Typography component="span" variant="subtitle2">
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                                >{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Box>
        </Container>
    );
}
