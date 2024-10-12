'use client'
import { Turnstile } from '@marsidev/react-turnstile'
import Card from "@/components/Card";
import ConnectStep from "@/components/Steps/connect";
import { Flex, Heading, List, ListIcon, ListItem, Text, useToken } from "@chakra-ui/react";
import { transparentize } from "polished";
import { FaCheck } from "react-icons/fa";
import ButtonAction from '@/components/Action/button';

export default function Home() {
  const [text] = useToken('colors', ['text'])
  return (
    <Flex
      flexDirection={'column'}
      height={'100vh'}
      justify={'center'}
      align={'center'}
      gap={3}
    >
      <Card width={'450px'}>
        <Flex flexDirection={'column'} width={'full'} gap={2}>
          <Heading
            textAlign={'center'}
            size={'lg'}
            marginY={6}
          >
            DRX FAUCET
          </Heading>
          <Text fontWeight={'bold'}>Get Free DreyerX</Text>

          <List color={transparentize(0.4, text)} fontSize={'14px'}>
            <ListItem>
              <ListIcon as={FaCheck} />

              5 DRX on DreyerX Testnet is needed for test funding
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheck} />
              Every 24 hours. DreyerX Testnet can be claimed
            </ListItem>
          </List>
        </Flex>
      </Card>
      <Card
        width={'450px'}
        gap={3}
      >
        <Flex
          flexDirection={'column'}
          width={'full'}
          gap={5}
        >
          <ConnectStep />

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          />
          <ButtonAction />
        </Flex>
      </Card>
    </Flex>
  );
}
