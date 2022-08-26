function getCurrentLocation() {
  return new Promise((resolve, _reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  });
}

module.exports = getCurrentLocation;
