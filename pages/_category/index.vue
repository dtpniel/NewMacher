<template>
  <div>
    <div class="margin-top-90"></div>

    <!-- filter -->
    <!-- <div class="col-xl-3 col-lg-4">
      <jobs-filter v-bind:data="data"/>
    </div>-->
    <!-- results -->
    <jobs-list/>
  </div>
</template>

<script>
import Route from "vue-router";
import JobsList from "~/components/Jobslist.vue";

// import jobsFilter from "~/components/Filter.vue";
import axios from "axios";

export default {
  data: function() {
    return {
      category: this.$route.params.category
    };
  },
  components: {
    JobsList
  },
  async  fetch({ store, params }) {
    // We can return a Promise instead of calling the callback
    // return axios
    //   .post(process.env.baseApi + "/jobs")
    //   .then(res => {
    //     return {
    //       //  debugger
    //       data: res.data.data.recordsets
    //     };
    //   })
    //   .catch(e => {
    //     // error({ statusCode: 404, message: "Post not found" });
    //   });
    await store.dispatch("jobs/getJobs");
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
