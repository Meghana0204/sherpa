import React from 'react';

const Profile = () => {
  return (
    <div className="profile-page">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Your Profile</h1>
        <p>Manage your settings and view your saved routes.</p>
        
        <div style={{ marginTop: '20px' }}>
          <p>Profile features coming soon!</p>
          <p>This feature will be implemented in Day 6 of our development plan.</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Planned Features</h2>
          <ul style={{ marginLeft: '20px' }}>
            <li>Anonymous account management</li>
            <li>Saved routes history</li>
            <li>Preferences for route calculation</li>
            <li>Notification settings</li>
            <li>Your submitted reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;