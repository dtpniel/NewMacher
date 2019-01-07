<template>
  <div>
    <span>Title:{{title}}</span>
    <span>id:{{id}}</span>
    <input type="button" :v-on="show()" value="show">
  </div>
</template>

<script>
import { Route } from "vue-router";
export default {
  data: function() {
    return {
      title: this.$route.params.ad,
      id: this.$route.params.id
    };
  },

  methods: {
    show: function() {
    }
  }
};
</script>
