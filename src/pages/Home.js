import React from 'react';
import { LocationSearch, MapControls, MapContainer, CustomMarker } from '../components';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>SafeRoutes</h1>
        <p>Find safe routes, view crime hotspots, and report incidents in your area.</p>
      </div>
      
      <div className="map-section">
        <MapContainer />
      </div>
      
      <div className="features-section" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Features</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div style={{ flex: '1 1 300px', margin: '10px', padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
            <h3>View Crime Hotspots</h3>
            <p>See where incidents are concentrated in your area with our heatmap visualization.</p>
          </div>
          
          <div style={{ flex: '1 1 300px', margin: '10px', padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
            <h3>Find Safe Routes</h3>
            <p>Calculate the safest path between locations based on historical incident data.</p>
          </div>
          
          <div style={{ flex: '1 1 300px', margin: '10px', padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
            <h3>Report Incidents</h3>
            <p>Anonymously report incidents to help keep your community informed and safe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;