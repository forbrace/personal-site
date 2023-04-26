import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { IntlProvider } from "react-intl";
import { useLocale } from "@/hooks/useLocale";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  const { locale, messages } = useLocale();
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <ThemeProvider attribute="class">
        <IntlProvider locale={locale as string} messages={messages}>
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}
