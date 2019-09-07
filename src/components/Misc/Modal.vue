<template>
  <div v-if="show">
    <div class="modal fade show d-block" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button @click="close" type="button" class="close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import classnames from 'classnames/dedupe';

export default {
  name: "Modal",
  props: {
    show: Boolean,
    title: String,
    close: Function
  },
  watch: {
    show: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        document.body.className = classnames(document.body.className, {
          'modal-open': !!newValue
        });
      }
    }
  }
};
</script>
