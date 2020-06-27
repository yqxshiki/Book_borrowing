<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  watch: {
    '$route' (newRoute) {
      this.update_tabNav(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'update_tabNav'
    ]),
  }
}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
