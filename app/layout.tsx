import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Theme from "./theme";

const montserrat  = Montserrat({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  preload: false
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "500",
    "800",
    "900"
  ],
  preload: true
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
