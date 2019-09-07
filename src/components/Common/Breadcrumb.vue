<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <router-link
        :to="{ name: 'index' }"
      >
        <span>Home</span>
      </router-link>
    </li>
    <li class="breadcrumb-item" v-if="parentpage">
      <router-link
        :to="{ name: parentpage.name }"
      >
        <span>{{parentpage.title}}</span>
      </router-link>
    </li>
    <li class="breadcrumb-item active">{{page}}</li>
  </ol>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["parentpage", "page"]
};
</script>
