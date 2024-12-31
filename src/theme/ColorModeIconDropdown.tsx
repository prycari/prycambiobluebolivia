import * as React from 'react';

import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';

import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';

export default function ColorModeIconDropdown(props: IconButtonOwnProps) {
    const { mode, systemMode, setMode } = useColorScheme();

    const handleClick = () => {
        setMode(mode === 'dark' ? 'light' : 'dark')
    };

    if (!mode) {
        return (
            <Box
                data-screenshot="toggle-mode"
                sx={(theme) => ({
                    width: '2.25rem',
                    height: '2.25rem',
                    border: '1px solid',
                    display: 'inline-flex',
                    verticalAlign: 'bottom',
                    borderColor: (theme.cssVariables || theme).palette.divider,
                    borderRadius: (theme.cssVariables || theme).shape.borderRadius,
                })}
            />
        );
    }
    const resolvedMode = (systemMode || mode) as 'light' | 'dark';

    const icon = {
        dark: <DarkModeIcon />,
        light: <LightModeIcon />,
    }[resolvedMode];

    return (
        <React.Fragment>
            <IconButton
                {...props}
                size="small"
                disableRipple
                aria-haspopup="true"
                onClick={handleClick}
                data-screenshot="toggle-mode"
            >{icon}</IconButton>
        </React.Fragment>
    );
}
