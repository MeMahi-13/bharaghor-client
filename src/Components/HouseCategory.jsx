import React from "react";
import {
  FaBuilding,
  FaBed,
  FaBriefcase,
  FaHome,
  FaCity,
  FaWarehouse,
  FaStore,
  FaShoppingBag,
} from "react-icons/fa";
import useLanguage  from "../hooks/useLanguage";

const categories = [
  { name: "apartment", icon: <FaBuilding />, label: { bn: "Apartment", en: "ফ্ল্যাট" } },
  { name: "hostel", icon: <FaBed />, label: { bn: "Hostel", en: "হোস্টেল" } },
  { name: "office", icon: <FaBriefcase />, label: { bn: "Office", en: "অফিস" } },
  { name: "studio", icon: <FaCity />, label: { bn: "Studio", en: "স্টুডিও" } },
  { name: "commercial", icon: <FaWarehouse />, label: { bn: "Commercial", en: "কমার্শিয়াল" } },
  { name: "showroom", icon: <FaStore />, label: { bn: "Showroom", en: "শোরুম" } },
  { name: "shop", icon: <FaShoppingBag />, label: { bn: "Shop", en: "দোকান" } },
];

function HouseCategory({ selectedType, onSelectType }) {
  const { language } = useLanguage(); 

  return (
    <section className="py-8 mt-6 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-[#073032]">
            {language === "bn" ? "Property Type" : "সম্পত্তির ধরন"}
          </h2>
          <p className="text-xs mt-1 text-[#073032]/70">
            {language === "bn" ? "Filter listings by category" : "ক্যাটাগরি অনুযায়ী ফিল্টার করুন"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <CategoryPill
  label={language === "en" ? "সব" : "All"}
  icon={<FaHome />}
  active={selectedType === "All"}
  onClick={() => onSelectType("All")}
/>

{categories.map((item, index) => (
  <CategoryPill
    key={index}
    label={item.label[language]} 
    icon={item.icon}
    active={selectedType === item.name}
    onClick={() => onSelectType(item.name)}
  />
))}

        </div>
      </div>
    </section>
  );
}

function CategoryPill({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer
        border transition-all duration-200
        ${active
          ? "bg-[#E3D0B3]/40 border-[#1b4965]"
          : "bg-[#073032]/5 border-[#073032]/10 hover:bg-[#1b4965]/10"
        }`}
    >
      {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#1b4965]" />}
      <div className={`text-sm ${active ? "text-[#1b4965]" : "text-[#073032]/60"}`}>{icon}</div>
      <span className={`text-sm font-medium capitalize tracking-wide ${active ? "text-[#073032]" : "text-[#073032]/80"}`}>
        {label}
      </span>
    </div>
  );
}

export default HouseCategory;
