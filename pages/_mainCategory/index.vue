<template>
  <div>
    <div class="margin-top-90"></div>
    <jobs-list/>
  </div>
</template>

<script>
import Route from "vue-router";
import JobsList from "~/components/Jobslist.vue";

import axios from "axios";

export default {
  data: function() {
    return {
      mainCategory: this.$route.params.mainCategory
    };
  },

  components: {
    JobsList
  },

  async fetch({ store, params }) {
    var qstring = {};
    if (params.mainCategory != "all")
      qstring = {
        qstring: { mainCategory: params.mainCategory, category: "" }
      };
    await store.dispatch("jobs/getJobsQueryString", qstring);
  },

  head() {
    return {
      title: this.mainCategory,
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
