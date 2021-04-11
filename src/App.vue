<template>
  <div id="app">
    <div v-show="!networkState" style="width: 100%;height: 100%;">
      <RefreshContent></RefreshContent>
    </div>
    <router-view v-show="networkState" />
  </div>
</template>

<script>
  import RefreshContent from './components/refresh-content'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: { RefreshContent },
    computed: {
      ...mapState({
        networkState: state => state.home.network_state
      }),
    },
  }
</script>
