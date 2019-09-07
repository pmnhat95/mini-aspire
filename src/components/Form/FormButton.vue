<template>
  <button :type="inputType" :disabled="disabled" :class="className" @click="onClick" tabindex>
    <span v-if="loading">
      <i class="fa fa-spin fa-spinner" />
    </span>
    <span v-else>
      <span v-if="text">{{ text }}</span>
      <slot v-else />
    </span>
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    type: String,
    text: String,
    block: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    click: Function,
    inputType: {
      type: String,
      default: 'submit',
    },
    classes: Array,
  },
  computed: {
    className() {
      let classes = ['btn', `btn-${this.type}`];
      if (this.block) {
        classes.push('btn-block');
      }
      if (this.classes) {
        classes = classes.concat(this.classes)
      }
      return classes.join(' ');
    },
  },
  methods: {
    onClick() {
      if (!this.loading && this.click) {
        this.click();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
