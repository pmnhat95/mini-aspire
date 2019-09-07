<template>
  <div :class="className">
    <label v-if="label && !inline" :for="name">
      {{ label }}<span class="text-danger" v-if="required">*</span>
    </label>
    <div class="col-md-2 text-md-right" v-else-if="label && inline">
      <label :for="name">
        {{ label }}<span class="text-danger" v-if="required">*</span>
      </label>
    </div>
    <div :class="{ 'col-md-10': label, 'col-md-12': !label }" v-if="inline">
      <slot />
      <small class="form-control-feedback" v-if="errors">
        {{ errors | displayError }}
      </small>
    </div>
    <slot v-else />
    <small class="form-control-feedback" v-if="errors && !inline">
      {{ errors | displayError }}
    </small>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    name: String,
    label: String,
    required: Boolean,
    inline: {
      type: Boolean,
      default: false
    },
    errors: Array,
  },
  computed: {
    className() {
      let classes = ['form-group'];
      if (this.errors) classes = classes.concat([ 'has-danger' ]);
      if (this.inline) classes = classes.concat([ 'row' ]);
      return classes.concat(this.classes).concat([this.class]);
    },
  },
  filters: {
    displayError(errors) {
      return errors.join(', ');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
