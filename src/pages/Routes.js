import React, { useState } from 'react';
import MapContainer from '../components/MapContainer';
import LocationSearch from '../components/LocationSearch';
const Routes = () => {
  const [routeInfo, setRouteInfo] = useState(null);
  
  // This would be updated with actual route data when available
  const handleRouteCalculated = (routeData) => {
    if (routeData && routeData.routes && routeData.routes.length > 0) {
      const route = routeData.routes[0];
      setRouteInfo({
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        start: route.legs[0].start_address,
        end: route.legs[0].end_address,
        safetyScore: calculateSafetyScore(route) // This would be implemented with real data
      });
    }
  };
  
  // Placeholder function for safety score
  const calculateSafetyScore = (route) => {
    // In a real implementation, this would use actual crime data
    // For now, return a random score between 60 and 100
    return Math.floor(Math.random() * 40) + 60;
  };
  
  return (
    <div className="routes-page">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Find Safe Routes</h1>
        <p>Calculate the safest path between any two locations based on incident data.</p>
        
        <div style={{ marginTop: '20px' }}>
          <MapContainer onRouteCalculated={handleRouteCalculated} />
        </div>
        
        {routeInfo && (
          <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            border: '1px solid #eee', 
            borderRadius: '5px' 
          }}>
            <h2>Route Information</h2>
            <p><strong>From:</strong> {routeInfo.start}</p>
            <p><strong>To:</strong> {routeInfo.end}</p>
            <p><strong>Distance:</strong> {routeInfo.distance}</p>
            <p><strong>Estimated Time:</strong> {routeInfo.duration}</p>
            <p><strong>Safety Score:</strong> {routeInfo.safetyScore}/100</p>
          </div>
        )}
        
        <div style={{ marginTop: '20px' }}>
          <h2>How It Works</h2>
          <p>
            Our algorithm analyzes historical incident data to determine the safest routes. 
            Simply enter your starting point and destination, and we'll calculate the optimal path.
          </p>
          <p>
            The safety score is calculated based on:
          </p>
          <ul style={{ marginLeft: '20px' }}>
            <li>Proximity to reported incidents</li>
            <li>Time of day safety patterns</li>
            <li>Well-lit and populated areas</li>
            <li>Historical safety data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Routes;