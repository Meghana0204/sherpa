import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ 
      backgroundColor: '#4285F4', 
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
          SafeRoutes
        </Link>
      </div>
      
      <nav>
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          margin: 0, 
          padding: 0 
        }}>
          <li style={{ marginRight: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/report" style={{ color: 'white', textDecoration: 'none' }}>
              Report Incident
            </Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/analytics" style={{ color: 'white', textDecoration: 'none' }}>
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/routes" style={{ color: 'white', textDecoration: 'none' }}>
              Safe Routes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;