import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = ["pt-BR", "en-US", "es-ES"] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = "blaze.lang";
const DEFAULT_LANGUAGE: Language = "pt-BR";

export const LANGUAGE_LABELS: Record<Language, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
  "es-ES": "ES",
};

type LanguageContextValue = {
  lang: Language;
  setLang: (next: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function readStored(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (LANGUAGES as readonly string[]).includes(stored)) {
    return stored as Language;
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStored);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}
