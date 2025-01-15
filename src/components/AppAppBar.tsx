import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { Tooltip, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { SitemarkIcon } from './SitemarkIcon';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    flexShrink: 0,
    display: 'flex',

    border: '1px solid',
    padding: '8px 12px',
    alignItems: 'center',

    backdropFilter: 'blur(10px)',
    justifyContent: 'space-between',
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,

    boxShadow: (theme.cssVariables || theme).shadows[0],
    borderColor: (theme.cssVariables || theme).palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.5),
}));

export function AppAppBar() {
    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box className='flex items-center px-0 grow-0'>
                        <Tooltip title="CambioBlueBolivia" arrow>
                            <Typography
                                variant='subtitle2'
                                className='flex items-center text-black font-semibold hover:cursor-pointer'>
                                <SitemarkIcon />
                            </Typography>
                        </Tooltip>
                        <Box>
                            <Typography
                                color='textPrimary'
                                variant='subtitle2'
                                className='flex items-center font-semibold hover:cursor-pointer'
                            >
                                CambioBlueBolivia
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="items-center gap-1"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <ColorModeIconDropdown />
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size="medium" />
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
