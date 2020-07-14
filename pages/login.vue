<template>
  <div>
    <Navbar />

    <section id="content">
      <section class="container">
        <div class="user-login">
          <form id="login-form" class="b-box">
            <a href="/" class="c-quwi-logo">
              <img width="40px" height="40px" src="~assets/img/quwi-logo.png">
              <div class="e-logo-text">QUWI</div>
            </a>
            <div class="c-active-input m-skin-guest" :class="{'has-error': errors.email.message}">
              <div class="b-input-group">
                <div class="b-input">
                  <div class="e-placeholder m-top-text" v-show="email || errors.email.message">
                    {{ errors.email.message ? errors.email.message : 'Email' }}
                  </div>
                  <input value="" placeholder="Email" :class="{hasError: errors.email.message}" v-model="email" type="text" autofocus="autofocus"></div>
              </div>
            </div>
            <div class="c-active-input m-skin-guest" :class="{'has-error': errors.password.message}">
              <div class="b-input-group">
                <div class="b-input">
                  <div class="e-placeholder m-top-text" v-show="password || errors.password.message">
                    {{ errors.password.message ? errors.password.message : 'Password' }}
                  </div>
                  <input value="vitaliibondtest" type="password" v-model="password" placeholder="Password"></div>
              </div>
            </div>
            <div class="b-button">
              <div class="btn" @click="onSubmit" >
                <span class="e-text">Login</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </section>
    <div class="c-site-footer b-site-footer">
      <div class="b-inner"><p>This site uses cookies. By continuing browsing this site, you agree to the use of
        cookies.</p>
        <p>All information on the website is provided by the company Udimicom, Limited.</p>
        <p>61 Spyrou Kyprianou, 4003 Limassol, Cyprus,
          con<span class="e-loath"> and </span>tact<span class="e-loath"> that. </span>@quwi.<span
            class="e-loath"> super </span>com
        </p>
        <p><a href="https://www.commercegate.com" target="_blank">CommerceGate</a> is our authorized sales agent.</p>
        <p class="b-links"><a href="https://quwi.com/download" class="">Download Quwi</a><a href="https://quwi.com/tos"
                                                                                            class="">Terms and
          Conditions</a><a href="https://quwi.com/privacy" class="">Privacy Policy</a></p>
        <p>© 2008 - 2020 Udimicom, Limited</p></div>
    </div>
  </div>
</template>

<script >
  import { defaultErrors } from '@/validation/login';
  import validateLogin from '@/validation/login';

  export default {
    name: "login",
    middleware: 'guest',
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        errors: defaultErrors(),
      };
    },
    methods: {
      async onSubmit() {
        if (this.loading) {
          return false;
        }

        this.errors = defaultErrors();

        const loginData = {
          email: this.email,
          password: this.password,
        }

        let validate = validateLogin(loginData);
        validate.result = true;
        if (validate.result) {
          this.loading = true;
          try {
            let response = await this.$auth.loginWith('local', {data: loginData});
            this.loading = false;
            this.$store.dispatch("user/setUser", response.data.app_init.user);
          } catch (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              if (error.response.data.first_errors) {
                if (error.response.data.first_errors.email) {
                  this.errors.email.message = error.response.data.first_errors.email;
                  this.errors.email.error = true;
                }

                if (error.response.data.first_errors.password) {
                  this.errors.password.message = error.response.data.first_errors.password;
                  this.errors.password.error = true;
                }
              }

            } else if (error.request) {
              console.log('error.request', error.request);
            } else {console.log('Error', error);
            }
            this.loading = false;

          }
        } else {
          this.errors = validate.errors;
        }
      }
    }
  }
</script>

<style scoped>

</style>
