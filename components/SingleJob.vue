<template>
  <div>
    <!-- Titlebar
    ==================================================-->
    <div class="single-page-header" v-if="false" data-background-image="images/single-job.jpg">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="single-page-header-inner">
              <div class="left-side">
                <div class="header-image">
                  <a href="single-company-profile.html">
                    <img src="images/company-logo-03a.png" alt>
                  </a>
                </div>
                <div class="header-details">
                  <h3>{{item.title | truncate(50)}}</h3>
                  <h5>About the Employer</h5>
                  <ul>
                    <li>
                      <a href="single-company-profile.html">
                        <i class="icon-material-outline-business"></i> King
                      </a>
                    </li>
                    <li>
                      <div class="star-rating" data-rating="4.9"></div>
                    </li>
                    <li>
                      <img class="flag" src="images/flags/gb.svg" alt>
                      {{item.stateName}}
                    </li>
                    <li>
                      <div class="verified-badge-with-title">Verified</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right-side">
                <div class="salary-box">
                  <div class="salary-type">Annual Salary</div>
                  <div class="salary-amount">$35k - $38k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content
    ==================================================-->
    <div class="container margin-top-20">
      <div class="row">
        <!-- Content -->
        <div class="col-xl-8 col-lg-8 content-right-offset">
          <div class="single-page-section">
            <h3 class="margin-bottom-25">Job Description</h3>
            <p v-html="item.description"></p>
          </div>

          <!-- Share Buttons -->
          <div class="share-buttons margin-top-25">
            <div class="share-buttons-trigger">
              <i class="icon-feather-share-2"></i>
            </div>
            <div class="share-buttons-content">
              <span>
                Interesting?
                <strong>Share It!</strong>
              </span>
              <ul class="share-buttons-icons">
                <li>
                  <a
                    href="#"
                    data-button-color="#3b5998"
                    title="Share on Facebook"
                    data-tippy-placement="top"
                  >
                    <i class="icon-brand-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-button-color="#1da1f2"
                    title="Share on Twitter"
                    data-tippy-placement="top"
                  >
                    <i class="icon-brand-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-button-color="#dd4b39"
                    title="Share on Google Plus"
                    data-tippy-placement="top"
                  >
                    <i class="icon-brand-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-button-color="#0077b5"
                    title="Share on LinkedIn"
                    data-tippy-placement="top"
                  >
                    <i class="icon-brand-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-xl-4 col-lg-4">
          <div class="sidebar-container">
            <a href="#small-dialog" class="apply-now-button popup-with-zoom-anim">
              Apply Now
              <i class="icon-material-outline-arrow-right-alt"></i>
            </a>

            <!-- Sidebar Widget -->
            <div class="sidebar-widget">
              <div class="job-overview">
                <div class="job-overview-headline">Job Summary</div>
                <div class="job-overview-inner">
                  <ul>
                    <li>
                      <i class="icon-material-outline-location-on"></i>
                      <span>Location</span>
                      <h5>{{item.cityName=="Other"? item.stateName : item.cityName}}</h5>
                    </li>
                    <li>
                      <i class="icon-material-outline-business-center"></i>
                      <span>Job Type</span>
                      <h5>{{item.partTime==1?"Part Time" : "Full Time"}}</h5>
                    </li>
                    <li>
                      <i class="icon-material-outline-local-atm"></i>
                      <span>Salary</span>
                      <h5>$35k - $38k</h5>
                    </li>
                    <li>
                      <i class="icon-material-outline-access-time"></i>
                      <span>Date Posted</span>
                      <h5>{{item.date | formatDate}}</h5>
                    </li>
                    <!-- <li>
                      <a>
                        View {{showItem?"Less":"More"}}
                        <i class="icon-feather-arrow-right"></i>
                      </a>
                    </li>-->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleJob",
  props: ["item"]
};
</script>
