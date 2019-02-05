<template>

</template>
<script>
export default {
  name: "jobsFilter",
  props: ["data"],
  data: function() {
    return {
      title: "Filter",
      mainCategories: this.data[3]
    };
  },
  methods: {}
};
</script>