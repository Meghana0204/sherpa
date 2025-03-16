// Function to get route between two points
export const getRoute = (google, origin, destination, travelMode = 'WALKING') => {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode[travelMode]
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(new Error(`Error calculating route: ${status}`));
          }
        }
      );
    });
  };
  
  // Function to calculate safe route by avoiding high-crime areas
  export const getSafeRoute = async (google, origin, destination, safetyData) => {
    try {
      // Get the standard route first
      const standardRoute = await getRoute(google, origin, destination);
      
      // For this MVP, we'll just return the standard route
      // In a real implementation, you would use the safetyData to adjust the route
      // by adding waypoints that avoid high-crime areas
      
      return standardRoute;
    } catch (error) {
      throw new Error(`Error calculating safe route: ${error.message}`);
    }
  };