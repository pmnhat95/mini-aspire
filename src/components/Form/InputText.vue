<template>
  <form-group
    :name="name"
    :label="label"
    :required="required"
    :inline="inline"
    :errors="errors"
  >
    <div :class="{'input-group': inputGroup}">
      <slot name="prefix" />
      <input
        :id="name"
        :type="inputType"
        :placeholder="placeholder"
        :value="value | displayValue(this.type)"
        :disabled="disabled"
        class="form-control"
        :class="{ 'form-control-danger': errors }"
        @input="input"
        @blur="blur"
        @keyup="keyup"
      />
      <slot name="suffix" />
      <slot />
    </div>
  </form-group>
</template>

<script>
import FormGroup from './FormGroup';

export default {
  name: "InputText",
  components: {
    FormGroup
  },
  filters: {
    displayValue(value) {
      return value;
    }
  },
  props: {
    type: String,
    name: String,
    value: [String, Number],
    label: String,
    placeholder: String,
    inputGroup: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errors: Array,
    inline: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    inputType() {
      return this.type === "number" ? "text" : this.type;
    }
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
    blur(event) {
      this.$emit("blur", event.target.value);
    },
    keyup(event) {
      this.$emit("keyup", event.target.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
