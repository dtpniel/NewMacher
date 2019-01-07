<template>
  <div>
    <span>Sub Category:{{subCategory}}</span>
    <span>id:{{id}}</span>
    <input type="button" :v-on="show()" value="show">
  </div>
</template>

<script>
import { Route } from "vue-router";
export default {
  data: function() {
    var array = this.$route.params.subCategory.split("-");
    return {
      subCategory: array[0],
      id: array[1]
    };
  },

  methods: {
    show: function() {
    }
  }
};
</script>
