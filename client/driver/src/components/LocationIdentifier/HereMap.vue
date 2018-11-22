<template>
  <div ref="map" v-bind:style="{ width: width, height: height }"></div>
</template>

<script>
import newIcon from "../../assets/marker.png"
import curIcon from "../../assets/marker-old.png"
import config from "@/config.js"
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      newMarker: null,
      newMarkerIcon: null,
      curMarker: null,
      curMarkerIcon: null
    }
  },
  props: {
    curCoordinate: Object,
    newCoordinate: Object,
    width: String,
    height: String
  },
  created() {
    // Load icon marker
    this.newMarkerIcon = new H.map.Icon(newIcon)
    this.curMarkerIcon = new H.map.Icon(curIcon)

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
        center: this.curCoordinate ? this.curCoordinate : config.HereMap.defaultCoordinate,
        pixelRatio: pixelRatio
      })

    this.map.addEventListener("tap", evt => {
      const coords = this.map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      )
      this.$emit('changeCoordinate', {
        lat: +coords.lat,
        lng: +coords.lng
      })
    })

    this.$watch('curCoordinate', curCoordinate => {
      if (this.curMarker) {
        this.map.removeObject(this.curMarker)
      }
      if (curCoordinate) {
        const currentCoords = curCoordinate
        this.curMarker = new H.map.Marker(currentCoords, { icon: this.curMarkerIcon })
        this.map.setCenter(currentCoords)
        this.map.addObject(this.curMarker)
      }
    }, {immediate:true})

    this.$watch('newCoordinate', newCoordinate => {
      if (this.newMarker) {
        this.map.removeObject(this.newMarker)
      }
      if (newCoordinate) {
        const newCoords = newCoordinate
        this.newMarker = new H.map.Marker(newCoords, { icon: this.newMarkerIcon })
        this.map.setCenter(newCoords)
        this.map.addObject(this.newMarker)
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