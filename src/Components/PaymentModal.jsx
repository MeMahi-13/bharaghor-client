import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { MdRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import bkashLogo from "../assets/bkash.svg";
import nagadLogo from "../assets/nagad-1.svg";
import rocketLogo from "../assets/Rocket_mobile_banking_logo.svg";
const PaymentModal = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedMobile, setSelectedMobile] = useState("");

  if (!isOpen) return null;

 const mobileMethods = [
  { name: "bKash", logo: bkashLogo },
  { name: "Nagad", logo: nagadLogo },
  { name: "Rocket", logo: rocketLogo },
];


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Choose Payment Method
        </h2>

        <div className="space-y-5">

          {/* Card Payment */}
          <div
            onClick={() => setSelectedMethod("card")}
            className={`relative border rounded-2xl p-6 cursor-pointer transition ${
              selectedMethod === "card"
                ? "border-[#0988E3] bg-blue-50 shadow-md"
                : "border-gray-300"
            }`}
          >
            <div className="absolute top-4 right-4 text-[#0988E3] text-xl">
              {selectedMethod === "card" ? (
                <MdRadioButtonChecked />
              ) : (
                <MdOutlineRadioButtonUnchecked />
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              <FaCreditCard className="text-3xl text-[#0988E3] mb-3" />
              <p className="font-semibold text-lg">Card Payment</p>
              <p className="text-sm text-gray-500">
                Visa, Mastercard Supported
              </p>
            </div>
          </div>

          {/* Mobile Banking */}
          <div
            onClick={() => setSelectedMethod("mobile")}
            className={`relative border rounded-2xl p-6 transition ${
              selectedMethod === "mobile"
                ? "border-[#0988E3] bg-blue-50 shadow-md"
                : "border-gray-300"
            }`}
          >
            <div className="absolute top-4 right-4 text-[#0988E3] text-xl">
              {selectedMethod === "mobile" ? (
                <MdRadioButtonChecked />
              ) : (
                <MdOutlineRadioButtonUnchecked />
              )}
            </div>

            <div className="flex flex-col items-center text-center cursor-pointer">
              <FaMobileAlt className="text-3xl text-[#0988E3] mb-3" />
              <p className="font-semibold text-lg">Mobile Banking</p>
            </div>

            {/* Show Options When Selected */}
            {selectedMethod === "mobile" && (
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {mobileMethods.map((method) => (
                  <div
                    key={method.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMobile(method.name);
                    }}
                    className={`flex flex-col items-center justify-center border rounded-xl w-20 h-20 cursor-pointer transition p-2 bg-white ${
                      selectedMobile === method.name
                        ? "border-[#0988E3] shadow-md"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="h-10 object-contain mb-2"
                      onError={(e) => {
                        // fallback text if image fails
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.alt = method.name;
                      }}
                    />
                    <span className="text-sm font-medium">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        <button className="mt-8 w-full bg-[#0988E3] text-white py-3 rounded-xl hover:opacity-90 transition">
          Continue Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
