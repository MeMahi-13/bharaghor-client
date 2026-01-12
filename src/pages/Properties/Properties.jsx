// @flow strict

import * as React from 'react';
import { useState } from 'react';
import PropertyCard from '../../Components/PropertyCard';
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
function Properties() {
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
            <h2 className='font-medium text-2xl mb-4'>Saved Properties</h2>
            <div style={{ position: "relative" }}>
                <PropertyCard places={featuredPlaces} />

                {/* Bookmark layer */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "20px",
                        paddingTop: "24px",
                    }}
                >
                    {featuredPlaces.map((place, index) => (
                        <div
                            key={index}
                            style={{
                                position: "relative",
                                pointerEvents: "auto",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    cursor: "pointer",
                                    background: "#fff",
                                    borderRadius: "50%",
                                    padding: "6px",
                                }}
                                onClick={() => toggleBookmark(index)}
                            >
                                {place.bookmarked ? (
                                    <BsBookmarkFill color="#007BFF" size={18} />
                                ) : (
                                    <BsBookmark color="#A1A8B0" size={18} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Properties;