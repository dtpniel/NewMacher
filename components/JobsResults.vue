<template>
  <div class="listings-container compact-list-layout margin-top-15 margin-bottom-35">
    <div
      v-if="!jobs.length"
      class="alert alert-danger"
      role="alert"
    >No results match your search criteria</div>

    <!-- Job Listing -->
    <a
      v-for="(item,index) in jobs"
      :key="item.id"
      :href="'single-job-page.html?id=' + item.id"
      class="job-listing"
       :class="{  'job-listing-mobile' :isMobile}"
    >
      <!-- <a href="single-job-page.html" class="job-listing"> -->
      <!-- Job Listing Details -->
         <h3 v-if="((index)%perPage)==0||index==0" style="font-weight:bold" class="margin-bottom-20">
        <span class="icon-feather-arrow-right"></span>
        Page {{Math.floor((index+1)/perPage)+1}}
      </h3>

      <div class="job-listing-details">
        <!-- Logo -->
        <div class="job-listing-company-logo">
          <img src="images/centers.png" alt>
         <!-- <img src="images/company-logo-05.png" alt>  -->
        </div>

        <!-- Details -->
        <div class="job-listing-description">
          <h3 class="job-listing-title">{{item.title | truncate(200)}}</h3>

          <!-- Job Listing Footer -->
          <div class="job-listing-footer">
            <ul>
              <li>
                <i class="icon-material-outline-business"></i> Centers Health Care
                <!-- <div
                  class="verified-badge"
                  data-tippy-placement="top"
                  data-tippy
                  data-original-title="Verified Employer"
                ></div>-->
              </li>
              <li>
                <i class="icon-material-outline-location-on"></i>
                {{item.cityName=="Other"? item.stateName : item.cityName}}
              </li>
              <li>
                <i class="icon-material-outline-business-center"></i>
                {{item.partTime==1?"Part Time" : "Full Time"}}
              </li>
              <li>
                <i class="icon-material-outline-access-time"></i>
                {{item.date | formatDate}}
              </li>
            </ul>
          </div>
        </div>

        <!-- Bookmark -->
        <span class="bookmark-icon"></span>
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "JobsResults",
  computed: {
    ...mapGetters({
       jobs: "jobs/filteredJobsSliced",
      sum: "jobs/sum",
      perPage: "jobs/perPage",
      isMobile: "isMobile"
    })
  },
    methods: {
    page: function(index) {
      return this.sum % this.perPage;
    }
  }
};
</script>
