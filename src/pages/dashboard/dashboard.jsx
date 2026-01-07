import React from 'react'
import './dashboard.css';
import { MdOutlineEventNote } from "react-icons/md";
import { FaHome, FaCheckCircle, FaClock, FaDollarSign } from "react-icons/fa";
import PropertyCard from '../../Components/PropertyCard'
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
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
    <h2 className='font-medium text-2xl color-[#101828] mt-9'>Your Properties</h2>
  <p>View All</p>
  </div>
  
  <PropertyCard places={featuredPlaces} />
</div>
{/* Your Properties */}
{/* Recent Bookings */}
<div>
  <div className='flex items-center gap-2'>
    <div className="w-9 h-9 bg-[#CBF3FF] flex items-center justify-center rounded-xl ">
  <MdOutlineEventNote size={22} />
</div>

    <h2 className='font-medium text-xl text-[#101828]'>Recent Bookings</h2>
  </div>
  <p></p>
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