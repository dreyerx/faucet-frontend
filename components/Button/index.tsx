'use client'
import React, { ReactNode } from 'react'
import { Button as ChakraButton, ButtonProps as ChakraButtonProps, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'

interface ButtonProps extends ChakraButtonProps {
    children: ReactNode,
    transparent?: boolean
}

export default function Button(props: ButtonProps) {
    const [border, bg2] = useToken('colors', ['border', 'bg2'])
    const [bg] = useToken('colors', [props.backgroundColor as string])
    const backgroundColor = bg ?? bg2

    return (
        <ChakraButton
            width={props.width}
            size={props.size}
            backgroundColor={props.transparent ? 'transparent' : backgroundColor}
            borderWidth={props.transparent ? 0 : (props.borderWidth ?? 1)}
            borderColor={transparentize(0.9, border)}
            transition={'all .2s ease-in-out'}
            isLoading={props.isLoading}

            _hover={{
                cursor: props.isDisabled ? 'auto' : 'pointer'
            }}
            _active={{
                backgroundColor: props.isDisabled ? backgroundColor : transparentize(0.2, backgroundColor)
            }}
            _focusVisible={{
                cursor: props.isDisabled ? 'auto' : 'pointer',
            }}
            _loading={{
                backgroundColor: transparentize(0.3, backgroundColor)
            }}

            onClick={props.onClick}
        >
            {props.children}
        </ChakraButton>
    )
}