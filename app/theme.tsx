'use client'
import { ChakraProvider, StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import React from 'react'

interface ITheme {
    children: React.ReactNode
}

const theme = extendTheme({
    colors: {
        bg: "#07010c",
        card: "#120b17",
        primary: "#aa55f7",
        primary2: "#d5acfe",
        border: "#ffffff33"
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          bg: "bg"
        }
      })
    }
})

export default function Theme(props: ITheme) {
  return (
    <ChakraProvider theme={theme}>
        { props.children }
    </ChakraProvider>
  )
}
