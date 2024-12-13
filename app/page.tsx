'use client'
import { Turnstile } from '@marsidev/react-turnstile'
import Card from "@/components/Card";
import ConnectStep from "@/components/Steps/connect";
import { Flex, Heading, List, ListIcon, ListItem, Text, useToken } from "@chakra-ui/react";
import { transparentize } from "polished";
import { FaCheck, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";
import ButtonAction from '@/components/Action/button';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [text] = useToken('colors', ['text'])

  const [isLinkClicked, setLinkClicked] = useState({
    twitter: false,
    telegram: false,
    github: false
  })


  return (
    <Flex
      flexDirection={'column'}
      height={'100vh'}
      justify={'center'}
      align={'center'}
      gap={3}
      px={['10px', 0]}
    >
      <Card width={['full', '450px']}>
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
        width={['full', '450px']}
        gap={2}
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
          <Flex flexDirection={'column'} gap={2} justify={'center'}>
            <Flex gap={1} justify={'center'}>
              <Link
                href={'https://x.com/dreyerxcoin'}
                target='_blank'
              >
                <Button backgroundColor={isLinkClicked.twitter ? 'primary1' : 'bg1'} size={'sm'} onClick={() => setLinkClicked(prev => ({ ...prev, twitter: true }))}>
                  <FaTwitter style={{ marginRight: '5px' }} />
                  Follow X
                </Button>
              </Link>
              <Link
                href={'https://t.me/dreyerxcoin'}
                target='_blank'
              >
                <Button backgroundColor={isLinkClicked.telegram ? 'primary1' : 'bg1'} size={'sm'} onClick={() => setLinkClicked(prev => ({ ...prev, telegram: true }))}>
                  <FaTelegram style={{ marginRight: '5px' }} />
                  Join Telegram
                </Button>
              </Link>
              <Link
                href={'https://github.com/dreyerx'}
                target='_blank'
              >
                <Button backgroundColor={isLinkClicked.github ? 'primary1' : 'bg1'} size={'sm'} onClick={() => setLinkClicked(prev => ({ ...prev, github: true }))}>
                  <FaGithub style={{ marginRight: '5px' }} />
                  Follow Github
                </Button>
              </Link>

            </Flex>
            <ButtonAction />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
