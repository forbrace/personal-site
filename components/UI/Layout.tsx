import React from "react";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useIntl } from "react-intl";
import { useLocale } from "@/hooks/useLocale";
import GTag from "@/components/UI/GTag";

const inter = Inter({ subsets: ["cyrillic", "latin"] });

type Props = { children: React.ReactNode; title: string; description: string };

const Layout: React.FC<Props> = ({ children, title, description }) => {
  const intl = useIntl();
  const translatedTitle = intl.formatMessage({ id: title });
  const translatedDescription = intl.formatMessage({ id: description });
  const { locale, langs } = useLocale();

  return (
    <>
      <GTag />
      <Head>
        <title>{translatedTitle}</title>
        <meta name="description" content={translatedDescription} />
        <meta property="og:title" content={translatedTitle} />
        <meta property="og:description" content={translatedDescription} />
        <meta property="og:url" content="https://paputsa.com" />
        <meta property="og:image" content="/ogg-image.png" />
        <meta property="og:image:alt" content={translatedTitle} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={translatedTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header />
        {/* <div className="h-[1px] flex-auto bg-black dark:bg-white grow-0" /> */}
        <div className="container mx-auto px-6 grow">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
