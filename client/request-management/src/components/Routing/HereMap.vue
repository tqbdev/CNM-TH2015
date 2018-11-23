<template>
  <panel title="Map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </panel>
</template>

<script>
import requestIconMarker from "../../assets/marker.png"
import driverIconMarker from "../../assets/motorcycle.png"
import config from "@/config.js"
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      router: {},
      requestMarker: null,
      requestIcon: null,
      driverMarker: null,
      driverIcon: null
    }
  },
  props: {
    driverCoordinate: Object,
    requestCoordinate: Object,
    width: String,
    height: String
  },
  created() {
    // Load icon marker
    this.requestIcon = new H.map.Icon(requestIconMarker)
    this.driverIcon = new H.map.Icon(driverIconMarker)

    // Create platform
    this.platform = new H.service.Platform({
      "app_id": config.HereMap.appId,
      "app_code": config.HereMap.appCode,
      useCIT: true,
      useHTTPS: true
    })

    // Create router
    this.router = this.platform.getRoutingService()
  },
  mounted() {
    const pixelRatio = window.devicePixelRatio || 1
    const mapTypes = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    })

    this.map = new H.Map(
      this.$refs.map,
      mapTypes.normal.map, {
        zoom: 17,
        center: this.requestCoordinate ? this.requestCoordinate : config.HereMap.defaultCoordinate,
        pixelRatio: pixelRatio
      })

    this.$watch('requestCoordinate', requestCoordinate => {
      if (requestCoordinate && this.driverCoordinate) {
        this.routing(requestCoordinate, this.driverCoordinate)
      }
    }, {immediate:true})

    this.$watch('driverCoordinate', driverCoordinate => {
      if (driverCoordinate && this.requestCoordinate) {
        this.routing(this.requestCoordinate, driverCoordinate)        
      }
    }, {immediate:true})

    H.ui.UI.createDefault(this.map, mapTypes)
    const mapEvents = new H.mapevents.MapEvents(this.map)
    new H.mapevents.Behavior(mapEvents)
  },
  methods: {
    routing(requestCoordinate, driverCoordinate) {
      // this.requestMarker = new H.map.Marker(requestCoordinate, { icon: this.requestIcon })
      // this.map.addObject(this.requestMarker)

      // this.driverMarker = new H.map.Marker(driverCoordinate, { icon: this.driverIcon })
      // this.map.addObject(this.driverMarker)
      const routingParameters = {
        // The routing mode:
        'mode': 'fastest;car',
        // The start point of the route:
        'waypoint0': `geo!${driverCoordinate.lat},${driverCoordinate.lng}`,
        // The end point of the route:
        'waypoint1': `geo!${requestCoordinate.lat},${requestCoordinate.lng}`,
        // To retrieve the shape of the route we choose the route
        // representation mode 'display'
        'representation': 'display'
      }

      this.router.calculateRoute(routingParameters, this.onResult,
        function(error) {
          this.$snotify.error(error.message)
        })
    },
    onResult(result) {
      let route,
        routeShape,
        startPoint,
        endPoint,
        linestring
      if(result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0]
        // Pick the route's shape:
        routeShape = route.shape

        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString()

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function(point) {
          const parts = point.split(',')
          linestring.pushLatLngAlt(parts[0], parts[1])
        })

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition
        endPoint = route.waypoint[1].mappedPosition

        // Create a polyline to display the route:
        const routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'blue', lineWidth: 10 }
        })

        // Create a marker for the start point:
        const startMarker = new H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        }, { icon: this.driverIcon })

        // Create a marker for the end point:
        const endMarker = new H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        }, { icon: this.requestIcon })

        // Add the route polyline and the two markers to the map:
        this.map.addObjects([routeLine, startMarker, endMarker])

        // Set the map's viewport to make the whole route visible:
        this.map.setViewBounds(routeLine.getBounds())
      }
    }
  }
}
</script>

<style scoped>
</style>