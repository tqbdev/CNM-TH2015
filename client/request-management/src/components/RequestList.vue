<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <panel title="Client Information">
        <v-data-table
          :headers="headers"
          :items="requests"
          class="elevation-1"
          :disable-initial-sort="true"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.telephone }}</td>
            <td class="text-xs-right">{{ props.item.locatedAddress || props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.note || '' }}</td>
            <td class="text-xs-right">{{ props.item.status | requestStatus }}</td>
            <td class="justify-center">
              <v-icon
                v-if="props.item.status >= 2 && props.item.DriverId"
                small
                class="mt-2"
                @click="showDriver(props.item.Driver)"
              >
                info
              </v-icon>
            </td>
            <td class="justify-center">
              <v-icon
                v-if="props.item.status === 2"
                small
                class="mt-2"
                @click="showRoute(props.item.id)"
              >
                explore
              </v-icon>
            </td>
          </template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
              Sorry, nothing to display here :(
            </v-alert>
          </template>
        </v-data-table>
      </panel>
    </v-flex>
    <driver-info-dialog
      width="500"
      :driver="driver"
      v-on:close="closeDialog"
      :isOpen="isDialogOpen"></driver-info-dialog>
  </v-layout>
</template>

<script>
import io from 'socket.io-client'
import DriverInfoDialog from './DriverInfoDialog'

export default {
  name: 'RequestList',
  components: {
    DriverInfoDialog
  },
  data () {
    return {
      driver: null,
      isDialogOpen: false,
      error: null,
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Telephone',
          value: 'telephone'
        },
        {
          text: 'Address',
          value: 'address'
        },
        {
          text: 'Note',
          value: 'note'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Driver',
          value: 'driver',
          sortable: false
        },
        {
          text: 'Route',
          value: 'route',
          sortable: false
        }
      ],
      requests: [],
      socket : io('localhost:8081/requests', {
        forceNew: true
      })
    }
  },
  mounted() {
    this.socket.on('ALL', (data) => {
      this.requests = data.requests
    });
  },
  methods: {
    showDriver (driver) {
      this.driver = driver
      this.isDialogOpen = true
    },
    closeDialog () {
      this.isDialogOpen = false
    },
    showRoute (id) {
      this.$router.push({
        name: 'request',
        params: {
          requestId: id
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
