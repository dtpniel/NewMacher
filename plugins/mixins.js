import Vue from 'vue'

Vue.mixin({
  methods: {
    isMobile() {
      if (process.browser) {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width < 990)
          return true;
        else
          return false;
      }
      return false;
    }
  }
})