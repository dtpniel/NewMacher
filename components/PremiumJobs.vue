<template>
  <div class="listings-container grid-layout margin-top-30">
    <!-- Job Listing -->
    <a
      class="job-listing job-premium"
      v-for="item in premiumJobs"
      :key="item.id"
      :href="'single-job-page.html?id=' + item.id"
    >
      <!-- Job Listing Details -->
      <div class="job-listing-details">
        <!-- Logo -->

        <!-- Details -->
        <div class="job-listing-description">
          <h4 class="job-listing-company">Hot Job!</h4>
          <h3 class="job-listing-title">{{item.title |truncate(100) }}</h3>
        </div>
      </div>

      <!-- Job Listing Footer -->
      <div class="job-listing-footer">
        <div class="job-listing-company-logo">
          <img src="images/hasc.png" alt>
        </div>

        <ul>
          <li>
            <i class="icon-material-outline-business"></i>
            {{item.mainCategoryName | truncate(15)}}
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
            <i class="icon-material-outline-access-time"></i>
            {{item.date | formatDate}}
          </li>
        </ul>
      </div>
    </a>
  </div>
</template>



<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "PremiumJobs",
  computed: {
    ...mapGetters({
      premiumJobs: "jobs/premiumJobs"
    })
  }
};
</script>
