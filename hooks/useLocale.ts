import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import en from "@/lang/en.json";
import pt from "@/lang/pt.json";
import ru from "@/lang/ru.json";
import { flattenMessages, INestedMessages } from "@/lang/flattenMessages";

export const langs = [
  {
    locale: "en",
    label: "English",
    abbr: "EN"
  },
  {
    locale: "pt",
    label: "Português",
    abbr: "PT"
  },
  {
    locale: "ru",
    label: "Русский",
    abbr: "RU"
  },
];

// Union type
export type Locale = "en" | "pt" | "ru";

// a Record is an object wich we can pass union types to it as key.
const messages: Record<Locale, INestedMessages> = {
  en,
  pt,
  ru,
};

export const useLocale = () => {
  const router = useRouter();
  const flattenedMessages = useMemo(
    () => flattenMessages(messages[router.locale as keyof typeof messages]),
    [router]
  );

  const switchLocale = useCallback(
    (locale: Locale) => {
      if (locale === router.locale) {
        return;
      }
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );
  return { locale: router.locale, switchLocale, messages: flattenedMessages, langs };
};
