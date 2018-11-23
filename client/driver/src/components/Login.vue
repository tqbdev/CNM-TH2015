<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-form
          ref="form"
          lazy-validation
          name="request-receiver-login-form"
          autocomplete="off">
          <v-text-field
            label="Telephone"
            v-model="telephone"
            :rules="phoneRules"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            :rules="requiredRules"
            required
          ></v-text-field>
        </v-form>
        <v-btn
          :loading="loading"
          dark
          class="cyan"
          @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthencationService from '@/services/AuthencationService'
export default {
  name: 'Login',
  data () {
    return {
      telephone: '',
      password: '',
      loading: false,
      phoneRules: [
        v => !!v || 'Telephone is required',
        v => (v && /^[0-9]*$/.test(v)) || 'Telephone must be only numberics',
        v => (v && v.length == 10) || 'Telephone must be 10 numberics'
      ],
      requiredRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    async login () {
      if (this.$refs.form.validate() && !this.loading) {
        try {
          this.loading = true
          const response = await AuthencationService.login({
            telephone: this.telephone,
            password: this.password
          })

          this.$store.dispatch('setAccessToken', response.data.token)
          this.$store.dispatch('setRefreshToken', response.data.refreshToken)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'home'
          })
          this.$snotify.success('Login successfully')
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
