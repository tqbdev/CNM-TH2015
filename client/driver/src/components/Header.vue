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
        v-if="isUserLoggedIn"
        v-model="isReady"
        v-on:change="onChangeReady"
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
          :value="true"
          :disabled="!user.coordinate">
          READY
        </v-btn>
      </v-btn-toggle>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn
        v-if="!isUserLoggedIn"
        flat
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>

      <v-btn
        v-if="isUserLoggedIn"
        flat
        @click="logout()">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapState} from 'vuex'
import DriverService from '@/services/DriverService'
export default {
  data () {
    return {
      isReady: false,
      loading: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'login'
      })
      this.isReady = false
    },
    async onChangeReady(isReady) {
      if (isReady === this.user.ready) return

      try {
        this.loading = true
        const response = await DriverService.updateById(this.user.id, {
          ready: isReady
        })
        this.$snotify.success(`Update new status successfully.`)
        this.$store.dispatch('setUser', response.data.driver)
        this.isReady = response.data.driver.ready
      } catch (error) {
        this.$snotify.error(error.response.data.error)
        this.isReady = this.user.ready
      } finally {
        this.loading = false
      }
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
