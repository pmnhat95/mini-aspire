<template>
  <router-link :to="to" :class="className" v-if="click == null">
    <slot />
  </router-link>
  <a @click="click" tabindex :class="className" v-else>
    <slot />
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props: {
    classes: {
      type: Array,
      default: () => [],
    },
    click: Function,
    to: Object,
  },
  computed: {
    className() {
      return ['btn'].concat(this.classes).concat([this.class]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto-table-img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.btn {
  cursor: pointer;
}
</style>
