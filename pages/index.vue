<template>
  <span>Hello World!</span>
</template>

<script>
//import jQuery from "jquery";

export default {
  methods: {
    // initAutocomplete: function() {
    //   var options = {
    //     types: ["(cities)"]
    //     // componentRestrictions: {country: "us"}
    //   };

    //   var input = document.getElementById("autocomplete-input");
    //   var autocomplete = new google.maps.places.Autocomplete(input, options);
    // }
  },

  mounted() {
    if (process.browser) {
      // jQuery(document).ready(function() {
      //   console.log("hi");
      // });
    }

    // this.initAutocomplete();
    // // Autocomplete adjustment for homepage
    // if ($(".intro-banner-search-form")[0]) {
    //   setTimeout(function() {
    //     $(".pac-container").prependTo(".intro-search-field.with-autocomplete");
    //   }, 300);
    // }

    // // Snackbar for user status switcher
    // $("#snackbar-user-status label").click(function() {
    //   Snackbar.show({
    //     text: "Your status has been changed!",
    //     pos: "bottom-center",
    //     showAction: false,
    //     actionText: "Dismiss",
    //     duration: 3000,
    //     textColor: "#fff",
    //     backgroundColor: "#383838"
    //   });
    // });
  }
};
</script>
