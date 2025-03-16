import React, { useEffect, useState } from 'react';

const RouteDisplay = ({ map, routeData, safetyData = [] }) => {
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  
  useEffect(() => {
    if (!map || !window.google) return;
    
    // Clean up existing renderer
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }
    
    if (!routeData) return;
    
    try {
      const renderer = new window.google.maps.DirectionsRenderer({
        map,
        directions: routeData,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#4285F4',
          strokeWeight: 5,
          strokeOpacity: 0.7
        }
      });
      
      setDirectionsRenderer(renderer);
    } catch (error) {
      console.error("Error rendering route:", error);
    }
    
    return () => {
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, [map, routeData]);
  
  // This is a UI-less component, it just affects the map
  return null;
};

export default RouteDisplay;