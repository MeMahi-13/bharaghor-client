import React from 'react'
import './dashboard.css';
import { MdOutlineEventNote } from "react-icons/md";
import { FaHome, FaCheckCircle, FaClock, FaDollarSign } from "react-icons/fa";
import PropertyCard from '../../Components/PropertyCard'
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import { IoIosArrowForward } from "react-icons/io";
import Profile from "../../../public/images/Ellipse 116.png"
const cards = [
  {
      title: "Total Properties",
      value: "245",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: <FaHome />,
    },
  {
    title: "Active Listings",
    value: "180",
    icon: <FaCheckCircle />,
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending Requests",
    value: "32",
    icon: <FaClock />,
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Sold Properties",
    value: "78",
    icon: <FaDollarSign />,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];
const featuredPlaces = [
  {
    image: "/images/slider.png",
    title: "2 Bedroom Flat For Rent",
    location: "Road No 7, Sector 10, Uttara",
    home: "House No: 10",
    date: "Date: 10-10-2025",
    houseType: "Family Flat",
  },
  {
    image: "/images/slider.png",
    title: "Apartment 2",
    location: "Road No 7, Sector 10, Uttara",
    home: "House No: 10",
    date: "Date: 10-10-2025",
    houseType: "Family Flat",
  },
   {
    image: "/images/slider.png",
    title: "Apartment 2",
    location: "Road No 7, Sector 10, Uttara",
    home: "House No: 10",
    date: "Date: 10-10-2025",
    houseType: "Family Flat",
  },
   {
    image: "/images/slider.png",
    title: "Apartment 2",
    location: "Road No 7, Sector 10, Uttara",
    home: "House No: 10",
    date: "Date: 10-10-2025",
    houseType: "Family Flat",
  },


];
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


const dashboard = () => {
  
  // const userData = useLoaderData(); 
  const { user } = useAuth();
  console.log(user)

  return (
    <>
     <div>
      <div className='user_name'>
        <h2 className='font-medium text-2xl text-[#101828]'>Welcome back, {user?.displayName || 'User'}</h2>
        <p className='font-normal text-base text-[#4A5565]'>Here’s what’s happening with your properties today </p>
      </div>
      <div className="flex flex-wrap gap-6" style={styles.needmagin}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} w-full sm:w-[48%] lg:w-[23%] h-36 p-6 rounded-xl shadow-sm hover:shadow-md transition`}
        >
          <div className="flex items-center justify-between h-full">
            {/* Text */}
            <div className="flex flex-col justify-center h-full">
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
            </div>

            {/* Icon */}
            <div className={`h-12 w-12 flex items-center justify-center rounded-full ${card.iconBg} ${card.iconColor} text-xl`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
{/* Your Properties */}
<div style={styles.needmagin}>
  <div className='flex justify-between items-center'>
    <h2 className='font-medium text-2xl color-[#101828] mt-9 mb-4'>Your Properties</h2>
  <p>View All</p>
  </div>
  
  <PropertyCard places={featuredPlaces} />
</div>
{/* Your Properties */}
{/* Recent Bookings */}
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

<div>
  
</div>
     </div>

    </>
  )
}

export default dashboard
const styles = {
  
 needmagin:{
  marginTop:"30px",
 }
};