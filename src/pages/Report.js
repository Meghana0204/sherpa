import React from 'react';
import { LocationSearch, MapControls, MapContainer, CustomMarker } from '../components';

const Report = () => {
  return (
    <div className="report-page">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Report an Incident</h1>
        <p>Help keep your community safe by anonymously reporting incidents.</p>
        
        <div style={{ marginTop: '20px' }}>
          <p>Report form coming soon!</p>
          <p>This feature will be implemented in Day 7-8 of our development plan.</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h2>How It Works</h2>
          <p>
            All reports are anonymous and help us build a safer community. 
            Your reports will be used to identify areas of concern and improve route safety calculations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;