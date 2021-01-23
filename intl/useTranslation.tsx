import { useContext } from "react";

import { LanguageContext, defaultLocale } from "./LanguageProvider";
import { LangStrings } from "./Strings";

export function useTranslation() {
  const [locale] = useContext(LanguageContext);

  const t = (key: string): string => {
    if (!LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || "";
  }

  return { t, locale };
}
