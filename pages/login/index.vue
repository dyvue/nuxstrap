<template>
  <div class="authincation h-100 mt-5">
    <loading :active.sync="form.loading"
      :is-full-page="true"></loading>
    <div class="container h-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-12 text-center">
          <img class="c-brand-auth" src="@/assets/images/logo-hr.png" alt="" />
        </div>
        <div class="col-md-6 mt-3">
          <div class="authincation-content">
            <div class="row no-gutters">
              <div class="col-xl-12">
                <div class="auth-form">
                  <h4 class="text-center mb-4">Sign in your account</h4>
                  <div v-if="form.err" class="mt-3 mb-4">
                    <span class="bg-danger text-white px-2 py-1">Incorrect Email / Password!</span>
                  </div>
                  <form @submit.prevent="submit">
                    <div class="form-group">
                      <label class="mb-1"><strong>Email</strong></label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Your Email"
                        v-model="form.email"
                      />
                    </div>
                    <div class="form-group">
                      <label class="mb-1"><strong>Password</strong></label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Your password"
                        v-model="form.password"
                      />
                    </div>
                    <div class="form-row d-flex justify-content-between mt-4 mb-2">
                      <div class="form-group">
                        <div class="custom-control custom-checkbox ml-1">
                          <input type="checkbox" class="custom-control-input" id="basic_checkbox_1"/>
                          <label class="custom-control-label" for="basic_checkbox_1">Remember my preference</label>
                        </div>
                      </div>
                      <div class="form-group">
                        <nuxt-link to="/">Forgot Password?</nuxt-link>
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                  </form>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  layout: "blank",
  middleware: 'no-auth',
  components: {
    Loading
  },
  data: () => ({
    form: {
      err: false,
      loading: false,
      email: "",
      password: ""
    }
  }),
  mounted() {
    this.clearLOG()
  },
  methods: {
    submit: async function() {
      this.form.loading = true
      try {
        let payload = {
          email: this.form.email,
          password: this.form.password
        }
        const __log = await this.$store.dispatch('login', payload)
        if (__log.data.code === 200) {
          // this.$router.push("/")
          location.reload("/")
          this.form.loading = false
        }
      }
      catch (err) {
        console.error(err)
        this.form.err = true
        this.form.loading = false
      }
    },

    // HELP

    clearLOG: function() {
      console.clear()
    }
  }
};
</script>