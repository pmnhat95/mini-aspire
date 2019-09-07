<template>
  <div id="app" :key="key">
    <default-theme v-if="theme === 'default'">
      <router-view :key="$route.fullPath" />
    </default-theme>
    <toast position="se"></toast>
  </div>
</template>

<script>
import { Toast } from "vuex-toast";

import DefaultTheme from "@/themes/Default";

import helper from "@/libs/helper";

import "vuex-toast/dist/vuex-toast.css";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";

export default {
  name: "App",
  components: {
    DefaultTheme,
    Toast
  },
  computed: {
    theme() {
      return this.$store.state.route.meta.theme;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  watch: {
    key: function() {
      helper.scrollTop();
    }
  },
  mounted: function() {
  }
};
</script>

<style>
@import "./assets/css/style.css";
@import "./assets/css/custom.css";
</style>
