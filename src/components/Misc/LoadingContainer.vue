<template>
  <div>
    <div class="text-center" v-if="loading">
      <div class="spinner-grow text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: "LoadingContainer",
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
