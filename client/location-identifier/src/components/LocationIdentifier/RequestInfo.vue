<template>
  <panel title="Client Information">
    <v-data-table
      v-if="user"
      :headers="headers"
      :items="[user]"
      class="elevation-1"
      :disable-initial-sort="true"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.telephone }}</td>
        <td class="text-xs-right">{{ props.item.address }}</td>
        <td class="text-xs-right">{{ props.item.note || '' }}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
export default {
  name: 'RequestInfo',
  props: [
    'user'
  ],
  data () {
    return {
      error: null,
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Telephone',
          value: 'telephone',
          sortable: false
        },
        {
          text: 'Address',
          value: 'address',
          sortable: false
        },
        {
          text: 'Note',
          value: 'note',
          sortable: false
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
