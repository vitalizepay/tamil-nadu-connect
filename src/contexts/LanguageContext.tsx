import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ta" | "en";

const LanguageContext = createContext<{
  lang: Language;
  toggle: () => void;
}>({ lang: "ta", toggle: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ta");
  const toggle = () => setLang((l) => (l === "ta" ? "en" : "ta"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
