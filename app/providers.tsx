'use client'
import AppWalletProvider from '@/components/Provider/wallet'
import { AppStore, makeStore } from '@/state/store'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false
    },
    colors: {
        bg1: '#212429',
        bg2: '#1b1b1b',

        text: '#f8f8f8',

        primary1: '#7a22c9',

        border: '#ffffff',

        alert: {
            info: {
                background: transparentize(0.1, '#2b6cb0'),  // Blue for Info alerts
                text: '#ffffff',                             // Text color for Info alerts
            },
            success: {
                background: transparentize(0.1, '#38a169'),  // Green for Success alerts
                text: '#ffffff',                             // Text color for Success alerts
            },
            warning: {
                background: transparentize(0.1, '#dd6b20'),  // Orange for Warning alerts
                text: '#ffffff',                             // Text color for Warning alerts
            },
            error: {
                background: transparentize(0.1, '#e53e3e'),  // Red for Error alerts
                text: '#ffffff',                             // Text color for Error alerts
            },
        },
    },
    styles: {
        global: {
            body: {
                bg: transparentize(0.5, '#212429')
            }
        }
    }
})

export default function AppProvider(props: {
    children: ReactNode
}) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <ChakraProvider theme={theme}>
            <Provider store={storeRef.current}>
                <AppWalletProvider>
                    {props.children}
                </AppWalletProvider>
            </Provider>
        </ChakraProvider>
    )
}
