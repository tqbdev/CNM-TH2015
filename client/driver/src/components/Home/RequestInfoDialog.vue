<template>
  <v-dialog
    v-if="request"
    v-model="isOpen"
    width="600"
    persistent
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Request Information
      </v-card-title>

      <v-card-text>
        <v-layout row wrap class="text-xs-left">
          <!-- <v-flex xs4>
            ID:
          </v-flex>
          <v-flex xs8>
            {{ request.id }}
          </v-flex> -->
          <v-flex xs4>
            Name:
          </v-flex>
          <v-flex xs8>
            {{ request.name }}
          </v-flex>
          <v-flex xs4>
            Telephone:
          </v-flex>
          <v-flex xs8>
            {{ request.telephone }}
          </v-flex>
          <v-flex xs4>
            Address:
          </v-flex>
          <v-flex xs8>
            {{ request.address }}
          </v-flex>
           <v-flex xs4>
            Note:
          </v-flex>
          <v-flex xs8>
            {{ request.note }}
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          flat
          @click="reject"
        >
          Reject
        </v-btn>
        <v-btn
          color="success"
          flat
          @click="accept"
        >
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RequestInfoDialog',
  props: {
    request: Object,
    isOpen: Boolean
  },
  methods: {
    reject () {
      this.$emit('reject')
    },
    accept () {
      this.$emit('accept')
    }
  }
}
</script>

<style>

</style>
