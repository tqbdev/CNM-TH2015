<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        tag="span"
        :to="{
          name: 'home'
        }">
        Driver
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        :to="{
          name: 'home'
        }">
        Home
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn-toggle
        v-if="$store.state.isUserLoggedIn"
        v-model="isReady"
        dark
        mandatory>
        <v-btn
          :loading="loading"
          color="error"
          style="height: 100%; width: 70px;"
          :value="false">
          BUSY
        </v-btn>
        <v-btn
          :loading="loading"
          color="success"
          style="height: 100%; width: 70px;"
          :value="true">
          READY
        </v-btn>
      </v-btn-toggle>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        @click="logout()">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import DriverService from '@/services/DriverService'
export default {
  data () {
    return {
      isReady: false,
      loading: false
    }
  },
  mounted () {
    // this.isReady = this.$store.state.user.ready
    this.$watch('isReady', async isReady => {
      if (isReady === this.$store.state.user.ready) return
      if (isReady && !this.$store.state.user.coordinate) {
        this.$snotify.error('Pls, update location first')
        this.isReady = false
        return
      }

      try {
        this.loading = true
        const response = await DriverService.updateById(this.$store.state.user.id, {
          ready: isReady
        })
        this.$snotify.success(`Update new status successfully.`)
        this.$store.dispatch('setUser', response.data.driver)
        this.isReady = response.data.driver.ready
      } catch (error) {
        this.$snotify.error(error.response.data.error)
        this.isReady = this.$store.state.user.ready
      } finally {
        this.loading = false
      }
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'login'
      })
      this.isReady = false
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: black;
}
</style>
