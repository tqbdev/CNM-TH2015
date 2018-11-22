<template>
  <panel title="Map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </panel>
</template>

<script>
import requestIconMarker from "../../assets/marker.png"
import driverIconMarker from "../../assets/marker-old.png"
import config from "@/config.js"
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
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
        const currentCoords = requestCoordinate
        this.currentMarker = new H.map.Marker(currentCoords, { icon: this.currentIcon })
        this.map.setCenter(currentCoords)
        this.map.addObject(this.currentMarker)
      }
    }, {immediate:true})

    H.ui.UI.createDefault(this.map, mapTypes)
    const mapEvents = new H.mapevents.MapEvents(this.map)
    new H.mapevents.Behavior(mapEvents)
  },
  methods: {
    routing(requestCoordinate, driverCoordinate) {
      this.requestMarker = new H.map.Marker(requestCoordinate, { icon: this.requestIcon })
      this.map.addObject(this.requestMarker)

      this.driverMarker = new H.map.Marker(driverCoordinate, { icon: this.driverIcon })
      this.map.addObject(this.driverMarker)
    }
  }
}
</script>

<style scoped>
</style>