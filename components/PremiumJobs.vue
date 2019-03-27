<template>
  <div class="listings-container grid-layout margin-top-30">
    <!-- Job Listing -->
  <a href="#" class="job-listing job-premium" v-for="index in 3" :key="index">
      <!-- Job Listing Details -->
      <div class="job-listing-details">
        <!-- Logo -->

        <!-- Details -->
        <div class="job-listing-description">
          <h4 class="job-listing-company">Hot Job!</h4>
          <h3
            class="job-listing-title"
          >Barista and Cashier Barista and Cashier Barista and Cashier Barista and Cashier</h3>
        </div>
      </div>

      <!-- Job Listing Footer -->
      <div class="job-listing-footer">
        <div class="job-listing-company-logo">
          <img src="images/hasc.png" alt>
        </div>

        <ul>
					  <li>
                <i class="icon-material-outline-business"></i> Hasc Center
                <!-- <div
                  class="verified-badge"
                  data-tippy-placement="top"
                  data-tippy
                  data-original-title="Verified Employer"
                ></div>-->
              </li>
          <li>
            <i class="icon-material-outline-location-on"></i> Brooklyn
          </li>
          <li>
            <i class="icon-material-outline-access-time"></i> 2 days ago
          </li>
        </ul>
      </div>
    </a>
 
   
  </div>
</template>



<script>
export default {
  name: "PremiumJobs",
  props: {
    jobs: {
      type: Array,
      required: true
    }
  }
};
</script>
