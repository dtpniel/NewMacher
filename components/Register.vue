<template>
  <div>
    <!-- Page Content
    ==================================================-->
    <div class="container">
      <div class="row">
        <div class="col-xl-5 offset-xl-3">
          <div class="login-register-page">
            <Notification :message="error" v-if="error"/>

            <!-- Welcome Text -->
            <div class="welcome-text">
              <h3 style="font-size: 26px;">Let's create your account!</h3>
              <span>
                Already have an account?
                <a href="login">Log In!</a>
              </span>
            </div>

            <!-- Account Type -->
            <div class="account-type">
              <div>
                <input
                  type="radio"
                  name="account-type-radio"
                  id="freelancer-radio"
                  @change="type=0"
                  class="account-type-radio"
                  checked
                >
                <label for="freelancer-radio" class="ripple-effect-dark">
                  <i class="icon-material-outline-account-circle"></i> Candidate
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="account-type-radio"
                  id="employer-radio"
                  @change="type=1"
                  class="account-type-radio"
                >
                <label for="employer-radio" class="ripple-effect-dark">
                  <i class="icon-material-outline-business-center"></i> Employer
                </label>
              </div>
            </div>

            <!-- Form -->
            <form method="post" @submit.prevent="register" action="#" id="register-account-form">
              <div class="input-with-icon-left">
                <i class="icon-material-baseline-mail-outline"></i>
                <input
                  type="text"
                  class="input-text with-border"
                  name="email"
                  id="email"
                  v-model="email"
                  placeholder="Email Address"
                >
              </div>

              <div
                class="input-with-icon-left"
                title="Should be at least 8 characters long"
                data-tippy-placement="bottom"
              >
                <i class="icon-material-outline-lock"></i>
                <input
                  type="password"
                  class="input-text with-border"
                  name="password"
                  id="password"
                  v-model="password"
                  placeholder="Password"
                >
              </div>

              <div class="input-with-icon-left">
                <i class="icon-material-outline-lock"></i>
                <input
                  type="password"
                  class="input-text with-border"
                  name="password2"
                  id="password2"
                  v-model="password2"
                  placeholder="Repeat Password"
                >
              </div>
            </form>

            <!-- Button -->
            <button
              class="button full-width button-sliding-icon ripple-effect margin-top-10"
              type="submit"
              form="login-form"
            >
              Register
              <i class="icon-material-outline-arrow-right-alt"></i>
            </button>

            <!-- Social Login -->
            <div class="social-login-separator">
              <span>or</span>
            </div>
            <div class="social-login-buttons">
              <button class="facebook-login ripple-effect">
                <i class="icon-brand-facebook-f"></i> Register via Facebook
              </button>
              <button class="google-login ripple-effect">
                <i class="icon-brand-google-plus-g"></i> Register via Google+
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Spacer -->
    <div class="margin-top-70"></div>
    <!-- Spacer / End-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      password2:"",
      type: 0,
      error: null
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("register", {
          user: {
            email: this.email,
            password: this.password,
            type: this.type
          }
        });

        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });

        this.$router.push("/");
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
};
</script>