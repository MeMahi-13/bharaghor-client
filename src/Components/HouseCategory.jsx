// @flow strict
import * as React from "react";
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

const categories = [
  { name: "Apartment", icon: <FaBuilding /> },
  { name: "Hostel", icon: <FaBed /> },
  { name: "Office", icon: <FaBriefcase /> },
  { name: "Duplex", icon: <FaHome /> },
  { name: "Studio Apartment", icon: <FaCity /> },
  { name: "Commercial Space", icon: <FaWarehouse /> },
  { name: "Showroom", icon: <FaStore /> },
  { name: "Shop", icon: <FaShoppingBag /> },
];

function HouseCategory({ selectedType, onSelectType }) {
  return (
    <section className=" from-gray-50 to-gray-100 py-8 mt-9">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Browse by Property Type
          </h2>
          <p className="text-gray-500 mt-2">
            Choose a category to explore available listings
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

          {/* ALL Button */}
          <div
            onClick={() => onSelectType("All")}
            className={`group rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer
              shadow-sm hover:shadow-lg transition-all duration-300
              hover:-translate-y-1 border
              ${
                selectedType === "All"
                  ? "bg-blue-50 border-blue-500"
                  : "bg-white border-gray-100"
              }`}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full
                             from-gray-400 to-gray-600
                            text-white text-sm shadow-sm">
              All
            </div>
            <p className="mt-3 text-sm font-medium text-gray-700">All</p>
          </div>

          {categories.map((item, index) => {
            const isActive = selectedType === item.name;

            return (
              <div
                key={index}
                onClick={() => onSelectType(item.name)}
                className={`group rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer
                  shadow-sm hover:shadow-lg transition-all duration-300
                  hover:-translate-y-1 border
                  ${
                    isActive
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-gray-100"
                  }`}
              >
                {/* Icon Circle */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             from-blue-500 to-indigo-600
                             text-white text-sm shadow-sm
                             group-hover:scale-105 transition-transform duration-300"
                >
                  {item.icon}
                </div>

                {/* Name */}
                <p className="mt-3 text-sm font-medium text-gray-700 text-center">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default HouseCategory;
