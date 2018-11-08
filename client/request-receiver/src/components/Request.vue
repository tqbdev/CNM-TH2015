<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Client Information">
        <v-form
          ref="form"
          lazy-validation
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
        <v-btn
          :loading="loading"
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
import RequestService from '@/services/RequestService'
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
        v => (v && /^[0-9]*$/.test(v)) || 'Phone must be only numberics',
        v => (v && v.length == 10) || 'Phone must be 10 numberics'
      ],
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true
          await RequestService.sendRequest({
            name: this.fullName,
            telephone: this.phone,
            address: this.address,
            note: this.note
          })

          this.$refs.form.reset()
          this.$snotify.success('Request receive successfully')
        } catch (error) {
          this.$snotify.error(error.response.data.error)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
