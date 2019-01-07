<template>
  <div>
    <span>Category:{{category}}</span>

    <results/>
  </div>

</template>

<script>
import Route from "vue-router";
import results from "~/components/Results.vue";

export default {
  data: function() {
    return {
      category: this.$route.params.category
    };
  },
  components: {
    results
  },
  head() {
    return {
      title: this.category,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: this.category }
      ]
    };
  },
  methods: {
    show: function() {
      //alert(this.data.category);
      //this.data.category="happy";
      console.log(this.$route.params.category);
    }
  }
};
</script>
