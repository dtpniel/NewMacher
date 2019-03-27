<template>
  <div class="container grid-layout margin-top-30">
    <!-- Job Listing -->
    <a href="#" class="job-listing job-premium job-banner" v-for="index in 3" :key="index" style="height:100px;height:130px">
      <!-- Job Listing Details -->
      <div class="job-listing-details">
        <div class="job-listing-company-logo">
          <img :src="'images/company-logo-0'+index+'.png'" alt>
        </div>

        <div class="job-listing-description">
          <h4 class="job-listing-title">Company</h4>
          <h3 class="job-listing-title">Top Banner {{index}}</h3>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "TopBanners"
};
</script>
