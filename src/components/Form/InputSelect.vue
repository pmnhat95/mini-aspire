<template>
  <form-group
    :name="name"
    :label="label"
    :required="required"
    :inline="inline"
    :errors="errors"
  >
    <select
      :id="name"
      :value="displayValue"
      :placeholder="placeholder"
      class="custom-select form-control"
      :class="{ 'form-control-danger': errors, [className]: className }"
      @input="event => this.$emit('input', event.target.value)"
      @change="event => this.$emit('change', event.target.value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <slot />
  </form-group>
</template>

<script>
import FormGroup from './FormGroup';

export default {
  name: "InputSelect",
  components: {
    FormGroup
  },
  props: [
    "name",
    "value",
    "label",
    "placeholder",
    "required",
    "options",
    "errors",
    "className",
    "inline"
  ],
  computed: {
    displayValue() {
      return this.value || "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
