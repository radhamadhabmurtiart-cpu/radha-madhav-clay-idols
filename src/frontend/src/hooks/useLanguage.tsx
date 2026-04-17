import {
  LanguageContext,
  type LanguageContextValue,
} from "@/contexts/LanguageContext";
import { useContext } from "react";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
