<template>
  <div>
    <span>Category:{{category}}</span>
    
    <results v-bind:jobs="jobs"/>
  </div>
</template>

<script>
import Route from "vue-router";
import results from "~/components/Results.vue";
import axios from "axios";

export default {
  data: function() {
    return {
      category: this.$route.params.category
    };
  },
  components: {
    results
  },
  asyncData({ req, params }) {

    // We can return a Promise instead of calling the callback
    return axios
      .get(process.env.baseApi + "/jobs")
      .then(res => {
        return {
          jobs: res.data[0]
        };
      })
      .catch(e => {
        // error({ statusCode: 404, message: "Post not found" });
      });
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
