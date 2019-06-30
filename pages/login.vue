<template>
  <div>
    <log-in/>
  </div>
</template>
<script>
import LogIn from "~/components/LogIn.vue";
export default {
  data: function() {
    return {
      title: "Macher Log In"
    };
  },
  components: { LogIn }
};
</script>
