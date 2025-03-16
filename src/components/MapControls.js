import React from 'react';

const MapControls = ({ onToggleHeatmap, showHeatmap, onToggleSafeRoutes, showSafeRoutes }) => {
  return (
    <div 
      className="map-controls" 
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'white',
        padding: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        borderRadius: '2px',
        zIndex: 1
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showHeatmap} 
            onChange={onToggleHeatmap}
            style={{ marginRight: '8px' }}
          />
          Show Crime Hotspots
        </label>
      </div>
      <div>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showSafeRoutes} 
            onChange={onToggleSafeRoutes}
            style={{ marginRight: '8px' }}
          />
          Calculate Safe Routes
        </label>
      </div>
    </div>
  );
};

export default MapControls;