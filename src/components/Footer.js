import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '20px', 
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <p>&copy; {new Date().getFullYear()} SafeRoutes - GDG Solution Hackathon Project</p>
      <p style={{ fontSize: '14px', color: '#666' }}>
        This application is designed to help users find safe routes and report incidents.
      </p>
    </footer>
  );
};

export default Footer;