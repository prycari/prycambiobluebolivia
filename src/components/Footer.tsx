import Box from '@mui/material/Box';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="#copyright">
                CambioBlueBolivia
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export function Footer() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
            }}
        >
            <Box className='flex justify-between w-full'
                sx={{
                    pt: { xs: 4, sm: 8 },
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link color="text.secondary" variant="body2" href="#privacypolicy">
                        Privacy Policy
                    </Link>
                    <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="#termsofservice">
                        Terms of Service
                    </Link>
                    <Copyright />
                </div>
                <Stack
                    useFlexGap
                    spacing={1}
                    direction="row"
                    sx={{ justifyContent: 'left', color: 'text.secondary' }}
                >
                    <IconButton
                        size="small"
                        color="inherit"
                        target='_blank'
                        aria-label="GitHub"
                        className='self-center'
                        href="https://github.com/swisscartoryy"
                    >
                        <FacebookIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="inherit"
                        target='_blank'
                        aria-label="LinkedIn"
                        className='self-center'
                        href="https://www.linkedin.com/in/pedro-caricari/"
                    >
                        <LinkedInIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}
