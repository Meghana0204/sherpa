import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ center = { lat: 40.7128, lng: -74.0060 }, zoom = 12, onMapLoad }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places", "visualization"]
      });

      try {
        const google = await loader.load();
        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        mapInstanceRef.current = mapInstance;
        setMapLoaded(true);

        // Make the map instance available to parent components
        if (onMapLoad) {
          onMapLoad(mapInstance, google);
        }
        
        // Add current position marker if geolocation is available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              mapInstance.setCenter(pos);
              
              new google.maps.Marker({
                position: pos,
                map: mapInstance,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "white",
                  strokeWeight: 2,
                },
                title: "Your location"
              });
            },
            () => {
              console.error("Error: The Geolocation service failed.");
            }
          );
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();

    return () => {
      // Cleanup if needed
    };
  }, [center, zoom, onMapLoad]);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
      />
      {!mapLoaded && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}>
          Loading map...
        </div>
      )}
    </div>
  );
};

export default Map;