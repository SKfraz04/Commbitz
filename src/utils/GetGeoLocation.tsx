
export const GetGeoLocations = () => {
  return new Promise((resolve, reject) => {
    // Check if the browser supports Geolocation API
    if (navigator.geolocation) {
      // Get the current location
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject('Geolocation is not supported by your browser');
    }
  });
}

