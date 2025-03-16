import React from 'react';

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Safety Analytics</h1>
        <p>Understand crime patterns and stay informed about safety in your area.</p>
        
        <div style={{ marginTop: '20px' }}>
          <p>Analytics dashboard coming soon!</p>
          <p>This feature will be implemented in Day 9-11 of our development plan.</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Planned Features</h2>
          <ul style={{ marginLeft: '20px' }}>
            <li>Crime frequency visualization</li>
            <li>Area safety comparison</li>
            <li>Time-based trend analysis</li>
            <li>Incident type breakdown</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;