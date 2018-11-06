<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Client Information">
        <v-form
          name="request-receiver-form"
          autocomplete="off">
          <v-text-field
            label="Full name"
            v-model="fullName"
            required
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="phone"
            required
            :rules="phoneRules"
          ></v-text-field>
          <v-text-field
            label="Address taken"
            v-model="address"
            required
            :rules="addressRules"
          ></v-text-field>
          <v-textarea
            box
            label="Note"
            v-model="note"
          ></v-textarea>
        </v-form>
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
      fullName: '',
      phone: '',
      address: '',
      note: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      addressRules: [
        v => !!v || 'Address is required'
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^[0-9]*$/.test(v) || 'Phone must be only numberics',
        v => v.length == 10 || 'Phone must be 10 numberics'
      ],
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
