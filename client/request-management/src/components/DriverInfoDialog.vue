<template>
  <v-dialog
    v-if="driver"
    v-model="isOpen"
    width="600"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Driver Information
      </v-card-title>

      <v-card-text>
        <v-layout row wrap class="text-xs-left">
          <v-flex xs4>
            ID:
          </v-flex>
          <v-flex xs8>
            {{ driver.id }}
          </v-flex>
          <v-flex xs4>
            Name:
          </v-flex>
          <v-flex xs8>
            {{ driver.name }}
          </v-flex>
          <v-flex xs4>
            Telephone:
          </v-flex>
          <v-flex xs8>
            {{ driver.telephone }}
          </v-flex>
          <v-flex xs4>
            Address:
          </v-flex>
          <v-flex xs8>
            {{ driver.address }}
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="close"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DriverInfoDialog',
  props: {
    driver: Object,
    isOpen: Boolean,
    width: String
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
