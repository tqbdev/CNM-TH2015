if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}

module.exports = {
  haversine (fromCoordinate, toCoordinate) {
    if (!fromCoordinate || !fromCoordinate.lng || !fromCoordinate.lat ||
        !toCoordinate || !toCoordinate.lng || !toCoordinate.lat) {
      return
    }

    const R = 6371e3; // metres
    const phi1 = fromCoordinate.lat.toRadians();
    const phi2 = toCoordinate.lat.toRadians();
    const deltaPhi = (toCoordinate.lat-fromCoordinate.lat).toRadians();
    const deltaLamda = (toCoordinate.lng-fromCoordinate.lng).toRadians();

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLamda/2) * Math.sin(deltaLamda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;

    return d;
  },
  coordinate2String(coordinate) {
    if (!coordinate) return null
    return `${coordinate.lat},${coordinate.lng}`
  },
  string2Coordinate(strCoordinate) {
    if (!strCoordinate) return null
    const parts = strCoordinate.split(',')
    return {
      lat: +parts[0],
      lng: +parts[1]
    }
  }
}
