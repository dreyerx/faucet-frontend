import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Theme from "./theme";

const roboto = Roboto({
  subsets: ["latin"],
  weight: [
    "100", "300", "400", "500", "700", "900"
  ],
  preload: true,
  display: "swap"
})
export const metadata: Metadata = {
  title: "DreyerX Faucet",
  description: "Get free DreyerX testnet coin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
