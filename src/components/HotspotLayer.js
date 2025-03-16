import React, { useEffect, useState } from 'react';

const HotspotLayer = ({ map, data = [] }) => {
  const [heatmap, setHeatmap] = useState(null);
  
  useEffect(() => {
    if (!map || !window.google) return;
    
    // Clean up any existing heatmap
    if (heatmap) {
      heatmap.setMap(null);
    }
    
    if (data.length === 0) return;
    
    try {
      // Transform data for heatmap
      const heatmapData = data.map(item => ({
        location: new window.google.maps.LatLng(item.position.lat, item.position.lng),
        weight: item.severity || 1
      }));
      
      const newHeatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map,
        radius: 30,
        opacity: 0.7,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      });
      
      setHeatmap(newHeatmap);
    } catch (error) {
      console.error("Error creating heatmap:", error);
    }
    
    return () => {
      if (heatmap) {
        heatmap.setMap(null);
      }
    };
  }, [map, data]);
  
  // This is a UI-less component, it just affects the map
  return null;
};

export default HotspotLayer;