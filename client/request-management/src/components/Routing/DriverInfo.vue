<template>
  <panel title="Driver Information">
    <v-data-table
      v-if="driver"
      :headers="headers"
      :items="[driver]"
      class="elevation-1"
      :disable-initial-sort="true"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.telephone }}</td>
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
  name: 'DriverInfo',
  props: [
    'driver'
  ],
  data () {
    return {
      error: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: false
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false
        },
        {
          text: 'Telephone',
          value: 'telephone',
          sortable: false
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
