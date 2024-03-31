'use client'
import { ChakraProvider, StyleFunctionProps, ThemeConfig, extendTheme } from '@chakra-ui/react'
import React from 'react'

interface ThemeProps {
    children: React.ReactNode
}

const config: ThemeConfig       = {
    initialColorMode: "dark",
    useSystemColorMode: false
}

const theme     = extendTheme({
    config,
    colors: {
        bg: "#151521",
        card: "#2a112f",
        primary: "#3c1043",
        
        hover: {
            primary: "#340d3b"
        }
    },
    styles: {
        global: {
            body: {
                bgGradient: "linear(to-r, #3c1043, #370329)"
            }
        }
    }
})

export default function Theme(props: ThemeProps) {
  return (
    <ChakraProvider theme={theme}>
        {
            props.children
        }
    </ChakraProvider>
  )
}
