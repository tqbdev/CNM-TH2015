<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Client Information">
        <form
          name="request-receiver-form"
          autocomplete="off">
        </form>
        <div class="danger-alert" v-html="error"></div>
        <v-btn
          dark
          class="cyan"
          @click="submit">
          Submit
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Request',
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
