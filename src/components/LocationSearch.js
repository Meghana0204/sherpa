import React, { useEffect, useRef, useState } from 'react';

const LocationSearch = ({ onPlaceSelected, placeholder = "Search for a location" }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const initAutocomplete = async () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps Places API not loaded");
        return;
      }
      
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode', 'establishment'],
          fields: ['geometry', 'name', 'formatted_address']
        });
        
        autocompleteRef.current = autocomplete;
        setLoaded(true);
        
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (!place.geometry || !place.geometry.location) {
            console.error("No location data for this place");
            return;
          }
          
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name || '',
            address: place.formatted_address || ''
          };
          
          onPlaceSelected(location);
        });
      } catch (error) {
        console.error("Error initializing autocomplete:", error);
      }
    };
    
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
    } else {
      // The Map component should have already loaded the API
      const checkGoogleExists = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleExists);
          initAutocomplete();
        }
      }, 100);
      
      // Cleanup
      return () => clearInterval(checkGoogleExists);
    }
  }, [onPlaceSelected]);
  
  return (
    <div className="location-search">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};

export default LocationSearch;  