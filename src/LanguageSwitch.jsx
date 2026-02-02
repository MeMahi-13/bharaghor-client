import React from "react";
import useLanguage from "./hooks/useLanguage"; // ✅ default import

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected !== language) toggleLanguage();
  };

  return (
    <div className="text-right">
      <select
        value={language}
        onChange={handleChange}
        className="text-sm px-2 py-2 bg-[#1b4965] text-white rounded-lg font-semibold hover:bg-[#073032] focus:outline-none"
      >
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
