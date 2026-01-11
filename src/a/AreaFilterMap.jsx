import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

// Sample dataset
const ALL_LOCATIONS = [
  { id: '1', position: { lat: 40.7128, lng: -74.0060 }, name: "New York" },
  { id: '2', position: { lat: 34.0522, lng: -118.2437 }, name: "Los Angeles" },
  { id: '3', position: { lat: 41.8781, lng: -87.6298 }, name: "Chicago" },
];

const AreaFilterMap = () => {
  const [visibleMarkers, setVisibleMarkers] = useState(ALL_LOCATIONS);

  // Triggered whenever the map stops moving or zooming
  const handleBoundsChange = useCallback((event) => {
    const map = event.map;
    const bounds = map.getBounds();

    if (bounds) {
      // Filter the original list to only include items inside the current viewport
      const filtered = ALL_LOCATIONS.filter((loc) => 
        bounds.contains(loc.position)
      );
      setVisibleMarkers(filtered);
    }
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <h3>Visible Items: {visibleMarkers.length}</h3>
      <APIProvider apiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <Map
          defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
          defaultZoom={4}
          onBoundsChanged={handleBoundsChange} // Core filtering trigger
          mapId="YOUR_MAP_ID" // Required for Advanced Markers
        >
          {visibleMarkers.map((marker) => (
            <AdvancedMarker 
              key={marker.id} 
              position={marker.position} 
              title={marker.name} 
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default AreaFilterMap;
