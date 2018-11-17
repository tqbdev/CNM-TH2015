<template>
  <panel title="Map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </panel>
</template>

<script>
import makerIcon from "../../assets/marker.png"
import makerCurrentIcon from "../../assets/marker-old.png"
import config from "@/config.js"
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      marker: null,
      icon: null,
      currentMarker: null,
      currentIcon: null
    }
  },
  props: {
    requestCoordinate: Object,
    width: String,
    height: String
  },
  created() {
    // Load icon marker
    this.icon = new H.map.Icon(makerIcon)
    this.currentIcon = new H.map.Icon(makerCurrentIcon)

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

    this.map.addEventListener("tap", evt => {
      const coords = this.map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      )

      if (this.marker) {
        this.map.removeObject(this.marker)
      }
      this.marker = new H.map.Marker(coords, { icon: this.icon })

      this.$emit('changeCoordinate', {
        lat: coords.lat.toFixed(4),
        lng: coords.lng.toFixed(4)
      })

      this.map.setCenter(coords)
      // this.map.setZoom(14)
      this.map.addObject(this.marker)
    })

    this.$watch('requestCoordinate', requestCoordinate => {
      if (requestCoordinate) {
        const currentCoords = requestCoordinate
        this.currentMarker = new H.map.Marker(currentCoords, { icon: this.currentIcon })
        this.map.setCenter(currentCoords)
        this.map.addObject(this.currentMarker)
      }
    }, {immediate:true})

    H.ui.UI.createDefault(this.map, mapTypes)
    const mapEvents = new H.mapevents.MapEvents(this.map)
    new H.mapevents.Behavior(mapEvents)
  }
}
</script>

<style scoped>
</style>