<template>
  <update-location></update-location>
</template>

<script>
import {mapState} from 'vuex'
import io from 'socket.io-client'
import UpdateLocation from './UpdateLocation'
export default {
  name: 'Home',
  data () {
    return {
      socket: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  mounted () {
    this.socket = io('localhost:8081/drivers', {
      forceNew: true,
      query: `id=${this.user.id}`
    })

    this.socket.on('REQUEST', (data) => {
      console.log(data)
    });
  },
  components: {
    UpdateLocation
  }
}
</script>

<style>

</style>
