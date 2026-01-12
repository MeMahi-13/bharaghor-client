// @flow strict

import * as React from 'react';
import Profile from "../../../public/images/Ellipse 116.png"
import { MdOutlineEventNote } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";2
function booking() {
    // use information for booking property
    const bookings = [
      {
        id: 1,
        name: "Farjana",
        property: "Sunset Villa",
        date: "Jan 15, 2026 - Jan 22, 2026",
        status: "Confirmed",
        amount: "TK1200",
        image: Profile,
      },
      {
        id: 2,
        name: "Ayesha",
        property: "Palm Residency",
        date: "Feb 01, 2026 - Feb 05, 2026",
        status: "Pending",
        amount: "TK900",
        image: Profile,
      },
      {
        id: 3,
        name: "Nusrat",
        property: "Ocean View",
        date: "Mar 10, 2026 - Mar 15, 2026",
        status: "Canceled",
        amount: "TK1500",
        image: Profile,
      },
    ];
    return (
       
        <div className='border  border-[#E9EBF8] mt-10 rounded-md'>
          <div className=' flex justify-between px-5 py-5'>
          <div className='flex items-center gap-2'>
            <div className="w-9 h-9 bg-[#CBF3FF] flex items-center justify-center rounded-xl ">
          <MdOutlineEventNote size={22} />
        </div>
        <div><h2 className='font-medium text-xl text-[#101828]'>Recent Bookings</h2></div>
            
          </div>
           <p className='flex items-center font-normal text-base text-[#0988E3]'>View All <span><IoIosArrowForward /></span></p>
        </div>
        {/* booking information */}
        {/* booking information */}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between px-5 py-5 border-b border-[#E9EBF8]"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              <img
                src={booking.image}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
        
              <div>
                <p className="font-medium">{booking.name}</p>
                <p className="text-sm text-[#99A1AF]">{booking.property}</p>
              </div>
            </div>
        
            {/* Right side */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-[#4A5565]">{booking.date}</span>
        
              <span
                className={`px-2 py-1 rounded-md text-sm
                  ${
                    booking.status === "Confirmed"
                        ? "text-green-700 bg-green-100"
                : booking.status === "Pending"
                ? "text-yellow-700 bg-yellow-100"
                : "text-red-700 bg-red-100" 
                      
                  }
                `}
              >
                {booking.status}
              </span>
        
              <span className="text-base text-[#101828]">
                {booking.amount}
              </span>
            </div>
          </div>
        ))}
        
        
        </div>
    );
};

export default booking;