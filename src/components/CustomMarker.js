import React, { useEffect, useState } from 'react';

const CustomMarker = ({ map, position, title, icon, onClick }) => {
  const [marker, setMarker] = useState(null);
  
  useEffect(() => {
    if (!map || !window.google) return;
    
    // Create the marker
    const newMarker = new window.google.maps.Marker({
      position,
      map,
      title,
      icon: icon || undefined
    });
    
    // Add click listener if provided
    if (onClick) {
      newMarker.addListener('click', () => onClick(newMarker));
    }
    
    setMarker(newMarker);
    
    // Clean up
    return () => {
      if (newMarker) {
        newMarker.setMap(null);
      }
    };
  }, [map, position, title, icon, onClick]);
  
  // This is a UI-less component, it just affects the map
  return null;
};

export default CustomMarker;