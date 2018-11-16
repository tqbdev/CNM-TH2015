<template>
  <div class="here-map">
    <div ref="map" v-bind:style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
import makerIcon from "../assets/marker.png"
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      marker: null,
      icon: null,
    }
  },
  props: {
    appId: String,
    appCode: String,
    lat: String,
    lng: String,
    width: String,
    height: String
  },
  created() {
    // Load icon marker
    this.icon = new H.map.Icon(makerIcon)

    // Create platform
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode,
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
        zoom: 14,
        center: { lng: this.lng, lat: this.lat },
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

      this.map.setCenter(coords)
      // this.map.setZoom(14)
      this.map.addObject(this.marker)
    })

    H.ui.UI.createDefault(this.map, mapTypes)
    const mapEvents = new H.mapevents.MapEvents(this.map)
    new H.mapevents.Behavior(mapEvents)
  }
}
</script>

<style scoped>
</style>