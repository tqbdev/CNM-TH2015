<template>
  <panel title="Handled Address">
    <v-card>
      <v-card-title class="green white-text">Current</v-card-title>
      <v-card-text v-if="curPoint.address">
        {{curPoint.address}}
      </v-card-text>
      <v-card-text v-if="curPoint.coordinate">
        {{curPoint.coordinate}}
      </v-card-text>
      <v-alert :value="!curPoint.address || !curPoint.coordinate" type="warning">
        Cann't resolve request address
      </v-alert>
    </v-card>
    <v-card>
      <v-card-title class="red mt-4 white-text">New</v-card-title>
      <v-card-text v-if="newPoint.address">
        {{newPoint.address}}
      </v-card-text>
      <v-card-text v-if="newPoint.coordinate">
        {{newPoint.coordinate}}
      </v-card-text>
      <v-alert :value="!newPoint.address || !newPoint.coordinate" type="warning">
        Pls pick new address
      </v-alert>
    </v-card>
    <v-btn
      :loading="loading"
      dark
      class="cyan"
      @click="submit">
      Submit
    </v-btn>
  </panel>
</template>

<script>
export default {
  name: 'GeocoderReverse',
  props: {
    curPoint: Object,
    newPoint: Object,
    loading: Boolean
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
.white-text {
  color: white;
}
</style>
