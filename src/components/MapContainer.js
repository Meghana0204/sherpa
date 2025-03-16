import React, { useState, useEffect, useRef } from 'react';
import Map from './Map';
import LocationSearch from './LocationSearch';
import MapControls from './MapControls';
import HotspotLayer from './HotspotLayer';
import RouteDisplay from './RouteDisplay';
import { fetchSafetyData, calculateRoute } from '../services/mapService';

const MapContainer = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showSafeRoutes, setShowSafeRoutes] = useState(false);
  const [safetyData, setSafetyData] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For storing references to markers
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  
  // Handle map instance being created
  const handleMapCreated = (mapObj) => {
    setMapInstance(mapObj);
  };
  
  // Load safety data when map is ready
  useEffect(() => {
    if (!mapInstance) return;
    
    const loadSafetyData = async () => {
      try {
        setLoading(true);
        const bounds = mapInstance.getBounds();
        const data = await fetchSafetyData(bounds);
        setSafetyData(data);
      } catch (err) {
        console.error("Error loading safety data:", err);
        setError("Failed to load safety data");
      } finally {
        setLoading(false);
      }
    };
    
    loadSafetyData();
    
    // Also set up listener for when map bounds change
    const boundsChangedListener = mapInstance.addListener('bounds_changed', () => {
      loadSafetyData();
    });
    
    return () => {
      window.google.maps.event.removeListener(boundsChangedListener);
    };
  }, [mapInstance]);
  
  // Handle start location selection
  const handleStartLocationSelected = (location) => {
    setStartLocation(location);
    
    // Clear previous marker if exists
    if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
    }
    
    // Create new marker
    if (mapInstance && window.google) {
      startMarkerRef.current = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: 'Start Location',
        label: 'A'
      });
      
      // Center map on the location
      mapInstance.panTo({ lat: location.lat, lng: location.lng });
      
      // If we have both start and end, calculate route
      if (endLocation && showSafeRoutes) {
        calculateSafeRoute();
      }
    }
  };
  
  // Handle end location selection
  const handleEndLocationSelected = (location) => {
    setEndLocation(location);
    
    // Clear previous marker if exists
    if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
    }
    
    // Create new marker
    if (mapInstance && window.google) {
      endMarkerRef.current = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: 'End Location',
        label: 'B'
      });
      
      // If we have both start and end, calculate route
      if (startLocation && showSafeRoutes) {
        calculateSafeRoute();
      }
    }
  };
  
  // Calculate safe route
  const calculateSafeRoute = async () => {
    if (!startLocation || !endLocation || !mapInstance || !window.google) {
      return;
    }
    
    try {
      setLoading(true);
      const result = await calculateRoute(
        { lat: startLocation.lat, lng: startLocation.lng },
        { lat: endLocation.lat, lng: endLocation.lng },
        window.google
      );
      
      setRouteData(result);
    } catch (err) {
      console.error("Error calculating route:", err);
      setError("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle heatmap visibility
  const handleToggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };
  
  // Toggle safe routes feature
  const handleToggleSafeRoutes = () => {
    setShowSafeRoutes(!showSafeRoutes);
    
    if (!showSafeRoutes && startLocation && endLocation) {
      calculateSafeRoute();
    }
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <Map onMapLoad={handleMapCreated} />
      
      {mapInstance && (
        <>
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            width: '300px',
            backgroundColor: 'white',
            padding: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            borderRadius: '2px',
            zIndex: 1
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Start Location</h3>
            <LocationSearch 
              onPlaceSelected={handleStartLocationSelected} 
              placeholder="Enter start point"
            />
            
            <h3 style={{ margin: '15px 0 10px 0' }}>End Location</h3>
            <LocationSearch 
              onPlaceSelected={handleEndLocationSelected} 
              placeholder="Enter destination"
            />
          </div>
          
          <MapControls 
            onToggleHeatmap={handleToggleHeatmap}
            showHeatmap={showHeatmap}
            onToggleSafeRoutes={handleToggleSafeRoutes}
            showSafeRoutes={showSafeRoutes}
          />
          
          {showHeatmap && (
            <HotspotLayer map={mapInstance} data={safetyData} />
          )}
          
          {showSafeRoutes && routeData && (
            <RouteDisplay 
              map={mapInstance} 
              routeData={routeData} 
              safetyData={safetyData}
            />
          )}
        </>
      )}
      
      {loading && (
        <div style={{ 
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          zIndex: 2
        }}>
          Loading...
        </div>
      )}
      
      {error && (
        <div style={{ 
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          zIndex: 2
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default MapContainer;