<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <here-map
        appId="cbKK71GntW15znfrL7e5"
        appCode="emeXZBrv-p2KVxbAGrUisQ"
        lat="37.7397"
        lng="-121.4252"
        width="100%"
        height="500px"/>
    </v-flex>
  </v-layout>
</template>

<script>
import HereMap from '@/components/HereMap.vue';
export default {
  name: 'LocationIdentifier',
  components: {
    HereMap
  }
}
</script>

<style>

</style>
