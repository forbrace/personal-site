import React, { FC, useCallback, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import Russian from "../lang/ru.json";
import English from "../lang/en.json";
import Portuguese from "../lang/pt.json";

const langs = [
  {
    locale: "en-US",
    label: "English",
    abbr: "EN"
  },
  {
    locale: "pt-PT",
    label: "Português",
    abbr: "PT"
  },
  {
    locale: "ru-RU",
    label: "Русский",
    abbr: "RU"
  },
];

export const LangContext = React.createContext({
  langs,
  locale: '',
  setLanguage: (_locale: string) => {},
});

type Props = { children: React.ReactNode };

export const LangContextProvider: FC<Props> = ({ children }) => {
  const [locale, setLocale] = useState(langs[0].locale);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocale(window.navigator.language)
    }
  },[])

  const langMessages = (locale: string) => {
    switch (locale) {
      case "ru-RU":
        return Russian;
      case "pt-PT":
        return Portuguese;
      default:
        return English;
    }
  };

  const currentLangMessages = langMessages(locale);
  const [messages, setMessages] = useState(currentLangMessages);

  function setLanguage(locale: string) {
    const newLocale = locale;

    setLocale(newLocale);
    setMessages(langMessages(newLocale));
    localStorage.setItem("currentLocale", newLocale);
  }

  useEffect(() => {
    const currentLocale = localStorage.getItem("currentLocale");
    if (currentLocale) {
      setLanguage(currentLocale);
    }
  }, []);

  return (
    <LangContext.Provider value={{ langs, locale, setLanguage }}>
      {/* <IntlProvider messages={messages} locale={locale}> */}
        {children}
      {/* </IntlProvider> */}
    </LangContext.Provider>
  );
};

export default LangContext;
