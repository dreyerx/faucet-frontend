'use client'
import { Flex, FlexProps, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import React, { ReactNode } from 'react'

interface CardProps extends FlexProps {
    children: ReactNode
}

export default function Card(props: CardProps) {
    const [bg1, border] = useToken('colors', ['bg1', 'border'])

    return (
        <Flex
            {...props}
            alignItems={'center'}
            backgroundColor={transparentize(0.9, bg1)}
            padding={3}
            borderWidth={1}
            borderColor={transparentize(0.9, border)}
            borderRadius={10}
            boxShadow={'2px 2px 13px -10px #7a22c9'}
        >
            {props.children}
        </Flex>
    )
}