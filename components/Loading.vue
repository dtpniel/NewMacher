<template>
  <div class="lds-ripple" v-if="loading">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.lds-ripple {
  display: inline-block;
  position: fixed;
  width: 64px;
  height: 64px;
  z-index: 9999;
  left: 50%;
  top: 50%;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #2a41e8;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>
