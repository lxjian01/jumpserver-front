<template>

</template>

<script>
  export default {
    name: 'refresh',
    // refresh.vue
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$router.replace(from.fullPath)
      })
    }
  }
</script>

<style scoped>

</style>
