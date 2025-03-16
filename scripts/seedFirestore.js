import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebase = require('firebase/app');
require('firebase/firestore');

// Firebase config - fill in your values
const firebaseConfig = {
    apiKey: "AIzaSyBT8rgxrZPyDNd85BMtP-Dvta_hzOoCkTs",
    authDomain: "sherpa-gdg2025.firebaseapp.com",
    projectId: "sherpa-gdg2025",
    storageBucket: "sherpa-gdg2025.firebasestorage.app",
    messagingSenderId: "220103059490",
    appId: "1:220103059490:web:a2389d4f8265ff977bc27b",
    measurementId: "G-4PZYB05S69"  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Sample incident data around a location (adjust to your target location)
const centerLat = 40.7128; // New York City latitude
const centerLng = -74.0060; // New York City longitude

// Generate random incidents around the center point
const incidents = [];
const incidentTypes = ['robbery', 'assault', 'theft', 'vandalism', 'suspicious_activity'];
const now = new Date();

for (let i = 0; i < 50; i++) {
  // Random position within ~3km of center
  const lat = centerLat + (Math.random() - 0.5) * 0.05;
  const lng = centerLng + (Math.random() - 0.5) * 0.05;
  
  // Random time in the last 30 days
  const timestamp = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  
  // Random incident type
  const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
  
  // Random severity (1-5)
  const severity = Math.floor(Math.random() * 5) + 1;
  
  incidents.push({
    type,
    location: new firebase.firestore.GeoPoint(lat, lng),
    timestamp,
    description: `Random ${type} incident for testing`,
    severity,
    reportedBy: `anonymous_user_${Math.floor(Math.random() * 1000)}`,
    status: 'verified'
  });
}

// Add all incidents to Firestore
const addIncidents = async () => {
  console.log('Adding sample incidents to Firestore...');
  
  try {
    const batch = db.batch();
    
    incidents.forEach((incident) => {
      const docRef = db.collection('incidents').doc();
      batch.set(docRef, incident);
    });
    
    await batch.commit();
    console.log('Successfully added all incidents!');
  } catch (error) {
    console.error('Error adding incidents:', error);
  }
  
  process.exit(0);
};

addIncidents();