import firebase from './firebase';
const { firestore } = firebase;
export const fetchSafetyData = async (bounds) => {
  try {
    // This is a placeholder - you'll implement actual Firestore queries once 
    // you have data in your database
    const incidents = await firestore
      .collection('incidents')
      .where('timestamp', '>=', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      .get()
      .then(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore GeoPoint to lat/lng object
        position: doc.data().location ? {
          lat: doc.data().location.latitude,
          lng: doc.data().location.longitude
        } : null
      })));
    
    return incidents;
  } catch (error) {
    console.error("Error fetching safety data:", error);
    return [];
  }
};

export const geocodeAddress = async (address, google) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        resolve(results[0].geometry.location);
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
};

export const calculateRoute = async (origin, destination, google) => {
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === "OK") {
          resolve(result);
        } else {
          reject(new Error(`Route calculation failed: ${status}`));
        }
      }
    );
  });
};