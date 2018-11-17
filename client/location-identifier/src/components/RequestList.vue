<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <panel title="Client Information">
        <v-data-table
          :headers="headers"
          :items="requests"
          class="elevation-1"
          :disable-initial-sort="true"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.telephone }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.note || '' }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item.id)"
              >
                edit
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
  </v-layout>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'RequestList',
  data () {
    return {
      error: null,
      headers: [
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
          text: 'Actions',
          value: 'name',
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
    this.socket.on('OPEN', (data) => {
      this.requests = data.requests
    });
  },
  methods: {
    editItem (id) {
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
