<template>
  <div
    class="page mini-sidebar"
    :class="{ 'fixed-sidebar show-sidebar': this.showNavbar }"
  >
    <div class="page-main">
      <!-- Navbar-->
      <header class="topbar">
        <nav class="navbar top-navbar navbar-expand-md navbar-dark">
          <div class="navbar-header">
            <router-link :to="{ name: 'index' }" class="navbar-brand">
              <img
                src="../assets/images/logo.png"
                alt="homepage"
                class="d-none d-md-inline-block"
                width="141"
              />
              <img
                src="../assets/images/logo-mobile.png"
                class="light-logo d-md-none"
                alt="homepage"
                width="50"
              />
            </router-link>
          </div>
          <div class="navbar-collapse">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link nav-toggler d-block d-md-none waves-effect waves-dark"
                   @click="() => toogleNavbar()">
                  <i :class="!this.showNavbar ? 'ti-menu' : 'ti-close'"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside class="left-sidebar">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar">
          <!-- Sidebar navigation-->
          <nav class="sidebar-nav">
            <ul id="sidebarnav">
              <li
                :class="activeMenu === 'index' ? 'active' : ''"
                id="dashboard"
              >
                <router-link
                  :to="{ name: 'index' }"
                  class="waves-effect waves-dark"
                  aria-expanded="false"
                >
                  <span class="hide-menu">Home</span>
                </router-link>
              </li>
              <li
                :class="activeMenu === 'approve' ? 'active' : ''"
                id="approve"
              >
                <router-link
                  :to="{ name: 'approve' }"
                  class="has-arrow waves-effect waves-dark"
                  aria-expanded="false"
                >
                  <span class="hide-menu">Approve</span>
                </router-link>
              </li>
              <li
                :class="activeMenu === 'rePayment' ? 'active' : ''"
                id="rePayment"
              >
                <router-link
                  :to="{ name: 'rePayment' }"
                  class="has-arrow waves-effect waves-dark"
                  aria-expanded="false"
                >
                  <span class="hide-menu">Re-payment</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <!-- End Sidebar navigation -->
        </div>
        <!-- End Sidebar scroll-->
      </aside>
    </div>
    <div class="page-wrapper">
      <div class="container-fluid">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LinkButton from "@/components/Misc/LinkButton";
import common from "@/libs/common";

export default {
  name: "DefaultTheme",
  components: {
    LinkButton
  },
  data() {
    return {
      showNavbar: false,
      sidebarCollapse: {}
    };
  },
  computed: {
    ...mapGetters({
    }),
    activeMenu() {
      return this.$store.state.route.meta.activeMenu;
    }
  },
  methods: {
    ...mapActions({
    }),
    toogleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
    collapseSidebar(key) {
      this.sidebarCollapse = {
        ...this.sidebarCollapse,
        [key]: !this.sidebarCollapse[key]
      };
    }
  }
};
</script>
