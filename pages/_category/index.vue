<template>
  <div>
    <div class="margin-top-90"></div>

    <!-- filter -->
    <!-- <div class="col-xl-3 col-lg-4">
      <jobs-filter v-bind:data="data"/>
    </div>-->
    <!-- results -->
    <results v-bind:jobsData="jobsData"/>
  </div>
</template>

<script>
import Route from "vue-router";
import results from "~/components/Results.vue";
// import jobsFilter from "~/components/Filter.vue";
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
      .post(process.env.baseApi + "/jobs")
      .then(res => {
        return {
          jobsData: res.data
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
