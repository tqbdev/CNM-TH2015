<template>
  <v-layout row>
    <v-flex xs12>
      <panel title="Client Information">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'RequestList',
  data () {
    return {
      error: null
    }
  },
  methods: {
    async submit () {
      // try {
      // } catch (error) {
      //   this.error = error.response.data.error
      // }
    }
  }
}
</script>

<style scoped>
</style>
