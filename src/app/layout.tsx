'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import './globals.css';


// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache(),
});

const theme = createTheme({
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
          fontSize: '1.25rem',
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }
      }
    },
  },
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}