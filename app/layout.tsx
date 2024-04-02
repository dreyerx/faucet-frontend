import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Theme from "./theme";

const montserrat  = Montserrat({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "DreyerX Faucet",
  description: "DreyerX Faucet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Theme>
          { children }
        </Theme>  
      </body>
    </html>
  );
}
