
import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export function ModalWrapper(props: {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void,

    title: string
}) {
    return (
        <Modal
            size={'sm'}
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
            motionPreset={'slideInBottom'}
        >
            <ModalOverlay
                backdropFilter={'blur(1px)'}
            />

            <ModalContent
                backgroundColor={'bg1'}
            >
                <ModalHeader>
                    <Text fontSize={'16px'}>
                        {props.title}
                    </Text>
                </ModalHeader>
                <ModalCloseButton
                    backgroundColor={'transparent'}
                    _hover={{
                        backgroundColor: 'transparent'
                    }}
                    _focusVisible={{
                        borderWidth: 0
                    }}
                />
                <Divider />
                <ModalBody>
                    {props.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
