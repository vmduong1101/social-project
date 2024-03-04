import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#242526',
        },
        secondary: {
            main: '#0866ff',
        },
        action: {
            active: '#0866ff'
        },
    },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fill: '#e4e6eb',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#e4e6eb',
                    background: '#3a3b3c',
                    ":hover": {
                        background: '#4f4f4f'
                    }
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: 3
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    '@media (min-width: 600px)': {
                        minHeight: 56,
                    },
                },
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#242526',
                    color: '#e4e6eb',
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: '#242526',
                    color: '#e4e6eb',
                }
            }
        },
    }
});