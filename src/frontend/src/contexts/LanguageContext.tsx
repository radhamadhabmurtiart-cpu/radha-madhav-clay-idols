import type { Language } from "@/types";
import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { bn: string; en: string }) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (translations) => translations.en,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (translations: { bn: string; en: string }): string => {
    return translations[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
