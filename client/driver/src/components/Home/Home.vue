<template>
  <div>
    <update-location></update-location>
    <request-info-dialog
      :isOpen="isOpen"
      :request="request"
      v-on:accept="onAccept"
      v-on:reject="onReject"></request-info-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import io from 'socket.io-client'
import UpdateLocation from './UpdateLocation'
import RequestInfoDialog from './RequestInfoDialog'
export default {
  name: 'Home',
  data () {
    return {
      socket: null,
      request: null,
      isOpen: false,
      timeout: null
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

    this.socket.on('SEND-REQUEST', (data) => {
      console.log(data)
      this.request = data
      this.isOpen = true
      this.timeout = setTimeout(() => {
        this.onReject()
      }, 10000)
    });
  },
  methods: {
    onAccept () {
      this.isOpen = false
      this.socket.emit('ACCEPT', {
        requestId: this.request.id
      })

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    onReject () {
      this.isOpen = false
      this.socket.emit('REJECT', {
        requestId: this.request.id
      })
      this.request = null
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    }
  },
  components: {
    UpdateLocation,
    RequestInfoDialog
  }
}
</script>

<style>

</style>
