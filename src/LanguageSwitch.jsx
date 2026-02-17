import React from "react";
import useLanguage from "./hooks/useLanguage";

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  const isEnglish = language === "en";

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label="Toggle language"
        className="relative w-20 h-8 border border-gray-300 rounded-full bg-white focus:outline-none"
      >
        {/* Toggle knob */}
        <span
          className={`absolute top-1 left-2 w-6 h-6 rounded-full bg-gray-700 transition-transform duration-300 ease-in-out
            ${isEnglish ? "translate-x-10" : "translate-x-0"}`}
        />

        {/* Labels */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-600">
          EN
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-600">
          BN
        </span>
      </button>
    </div>
  );
}
