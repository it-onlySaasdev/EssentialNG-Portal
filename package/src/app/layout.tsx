import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import { DonationProvider } from "./context/donationContext";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import NextTopLoader from 'nextjs-toploader';

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <NextTopLoader color="#FF4D7E" />
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <DonationProvider>
            <AuthDialogProvider>
              <SessionProviderComp session={session}>
                <Aoscompo>
                  <Header />
                  {children}
                  <Footer />
                </Aoscompo>
                <ScrollToTop />
              </SessionProviderComp>
            </AuthDialogProvider>
          </DonationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
