import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Map container styles
const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

// Default center (you can adjust this)
const center = {
  lat: 37.7749,
  lng: -122.4194
};

function SafeRoutes() {
  // State variables
  const [map, setMap] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = {
            lat: latitude,
            lng: longitude,
            name: "Current Location"
          };
          setCurrentLocation(location);
          // You can also center the map on current location
          if (map) {
            map.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map]);

  // Handle map click to add marker
  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      name: `Location ${markers.length + 1}`
    };
    setMarkers([...markers, newMarker]);
  };

  // Set start point
  const handleSetStartPoint = (location) => {
    setStartPoint(location);
  };

  // Set end point
  const handleSetEndPoint = (location) => {
    setEndPoint(location);
  };

  // Handle map load
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Use effect to get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div className="safe-routes-container">
      <h1>Safe Routes</h1>
      
      <div className="controls">
        <button onClick={getCurrentLocation}>Get Current Location</button>
        {/* Add additional controls for route finding */}
      </div>
      
      <LoadScript googleMapsApiKey="AIzaSyBT8rgxrZPyDNd85BMtP-Dvta_hzOoCkTs">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation || center}
          zoom={14}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {/* Current location marker */}
          {currentLocation && (
            <Marker
              position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
              onClick={() => setSelectedLocation(currentLocation)}
            />
          )}
          
          {/* Start point marker */}
          {startPoint && (
            <Marker
              position={{ lat: startPoint.lat, lng: startPoint.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              }}
              onClick={() => setSelectedLocation(startPoint)}
            />
          )}
          
          {/* End point marker */}
          {endPoint && (
            <Marker
              position={{ lat: endPoint.lat, lng: endPoint.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
              onClick={() => setSelectedLocation(endPoint)}
            />
          )}
          
          {/* Other markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelectedLocation(marker)}
            />
          ))}
          
          {/* Info window for selected location */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3>{selectedLocation.name || "Selected Location"}</h3>
                <p>Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}</p>
                <button onClick={() => handleSetStartPoint(selectedLocation)}>Set as Start</button>
                <button onClick={() => handleSetEndPoint(selectedLocation)}>Set as Destination</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default SafeRoutes;