// @flow strict

import * as React from 'react';
import PropertyCard from '../../Components/PropertyCard';
import { useState } from 'react';

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function Saved() {
  
   
 
 
   // Array to track which cards are bookmarked
   const featuredPlacesInitial = [
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
       title: "2 Bedroom Flat For Rent",
       location: "Road No 7, Sector 10, Uttara",
       home: "House No: 10",
       date: "Date: 10-10-2025",
       houseType: "Family Flat",
     },
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
   ];
 
   // Add a bookmarked state for each card
   const [featuredPlaces, setFeaturedPlaces] = useState(
     featuredPlacesInitial.map(place => ({ ...place, bookmarked: false }))
   );
 
   
 
   // Toggle bookmark for a single card
   const toggleBookmark = (index) => {
     const updatedPlaces = [...featuredPlaces];
     updatedPlaces[index].bookmarked = !updatedPlaces[index].bookmarked;
     setFeaturedPlaces(updatedPlaces);
   };
    return (
        <div>
            <h2>Saved Properties</h2>
            <div className="featured-place-body">
                
                    {featuredPlaces.map((place, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        {/* Image */}
                        <div className="house-item-img-container" style={{ position: "relative" }}>
                          <img src={place.image} alt={place.title} style={styles.cardImageHorizontal} />              
                          <div
                            className="add"
                            onClick={() => toggleBookmark(index)}>
                            {place.bookmarked ? (
                              <BsBookmarkFill color="#007BFF" size={20} />
                            ) : (
                              <BsBookmark color="#A1A8B0" size={20} />
                            )}
                          </div>
                        </div>
                        {/* Description */}
                        <PropertyCard places={featuredPlaces}/>
                      </div>
                    ))}
                  </div>
        </div>
    );
};

export default Saved;

const styles = {
  slide: {
    background: "#ffffff",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  select: {
    flex: 1,
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  selectrow: {
    display: "flex",
    gap: "15px",
    width: "100%",
    marginTop:"18px",
  },
  cardImageHorizontal: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardContent: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTitle: {
    marginBottom: "10px",
    fontWeight:"600",
    fontSize:"20px",
    lineHeight:"100%",
    color:"#101828",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },
  
  title:{
    paddingTop:"20px",
    paddingBottom:"20px",
    fontWeight:"600",
    fontSize:"24px",

  },
  money:{
    color:"#0988E3",
    fontWeight:"600",
  fontSize:"14px",  },
  call:{
background:"#0988E3",
border:"none",
color:"#FFFFFF",
borderRadius:"6px",
gap:"4px",
padding:"4px 9px",
fontWeight:"400",
fontSize:"14px",
cursor:"pointer",
  },

};
