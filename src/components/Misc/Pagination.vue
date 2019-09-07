<template>
  <ul class="pagination" v-if="total > 0">
    <li
      class="paginate_button page-item"
      :class="{ disabled: current === 1 }"
    >
      <router-link class="page-link" :to="firstPage.routeTo">
        First
      </router-link>
    </li>
    <li
      class="paginate_button page-item d-block d-sm-none"
      :class="{ disabled: current === total }"
    >
      <router-link class="page-link" :to="previousPage.routeTo">
        Previous
      </router-link>
    </li>
    <li
      v-for="(page, index) in pages"
      class="paginate_button page-item d-none d-sm-block"
      :class="{ active: page.active }"
      :key="index"
    >
      <router-link class="page-link" :to="page.routeTo">
        {{ page.text }}
      </router-link>
    </li>
    <li
      class="paginate_button page-item d-block d-sm-none"
      :class="{ disabled: current === total }"
    >
      <router-link class="page-link" :to="nextPage.routeTo">
        Next
      </router-link>
    </li>
    <li
      class="paginate_button page-item"
      :class="{ disabled: current === total }"
    >
      <router-link class="page-link" :to="lastPage.routeTo">
        Last
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: Number,
    total: Number,
    routeName: String,
    params: {
      type: Object,
      default: () => {},
    },
    query: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    pages() {
      const pages = [];
      const start = (this.current - 5 > 0) ? this.current - 5 : 1;
      const end = (this.current + 5 < this.total) ? this.current + 5 : this.total;
      for (let i = start; i <= end; i++) {
        pages.push({
          text: i,
          active: i === this.current,
          routeTo: {
            name: this.routeName,
            params: this.params,
            query: {
              ...this.query,
              page: i,
            },
          },
        });
      }
      return pages;
    },
    firstPage() {
      return {
        routeTo: {
          name: this.routeName,
          params: this.params,
          query: {
            ...this.query,
            page: 1,
          },
        }
      };
    },
    previousPage() {
      return {
        routeTo: {
          name: this.routeName,
          params: this.params,
          query: {
            ...this.query,
            page: this.current - 1,
          },
        }
      };
    },
    nextPage() {
      return {
        routeTo: {
          name: this.routeName,
          params: this.params,
          query: {
            ...this.query,
            page: this.current + 1,
          },
        }
      };
    },
    lastPage() {
      return {
        routeTo: {
          name: this.routeName,
          params: this.params,
          query: {
            ...this.query,
            page: this.total,
          },
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
  justify-content: flex-end;
}
</style>
