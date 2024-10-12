import type { Metadata } from "next";
import { Manrope } from 'next/font/google'
import { Suspense } from "react";
import AppProvider from "./providers";

const manrope = Manrope({
  subsets: ['latin'],
  weight: [
    '200', '300', '400', '500', '600', '700', '800'
  ]
})

export const metadata: Metadata = {
  title: 'DreyerX Faucet',
  description: 'Get free DreyerX Testnet',
  applicationName: 'faucet',
  authors: {
    name: 'dreyerxlabs',
    url: 'https://dreyerx.com'
  },
  keywords: [
    'dreyerx',
    'testnet',
    'dreyerx testnet',
    'free',
    'free testnet',
    'dreyerx faucet',
    'faucet dreyerx',
    'dreyerx network',
    'web3',
    'dreyerx blockchain'
  ],
  creator: 'DreyerX Labs',
  publisher: 'DreyerX',
  openGraph: {
    type: 'website',
    url: 'https://faucet.dreyerx.com',
    title: 'DreyerX Faucet',
    description: 'Get free DreyerX Testnet',
    siteName: 'DreyerX Faucet'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={manrope.className}
      >
        <Suspense>
          <AppProvider>
            {children}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
