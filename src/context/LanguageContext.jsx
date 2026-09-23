import { createContext, useState } from "react";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // ✅ Read saved language on FIRST render
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage ? savedLanguage : "bn"; // default Bangla
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const nextLanguage = prev === "en" ? "bn" : "en";
      localStorage.setItem("language", nextLanguage); // ✅ persist
      return nextLanguage;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
