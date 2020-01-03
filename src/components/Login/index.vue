<template>
  <div class="login">
    <b-modal
      v-model="isShow"
      centered
      cancel-disabled
      no-close-on-esc
      :header-border-variant="border"
      :footer-border-variant="border"
    >
      <template #modal-footer>
        <div class="w-100"></div>
      </template>
      <template #modal-header>
        <div class="w-100"></div>
      </template>
      <b-form @submit="hLogin">
        <b-row class="pb=4">
          <b-col>
            <label class="w-100 pb-2">
              Name:
              <b-input type="text" v-model="name"></b-input>
            </label>
          </b-col>
        </b-row>
        <b-row class="pb-5">
          <b-col>
            <label class="w-100 pb-2">
              Password:
              <b-input type="password" v-model="pass"></b-input>
            </label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button type="submit" class="w-100">Login</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        URL: 'auth/login',
        isShow: true,
        border: 'white',
        name: '',
        pass: ''
      }
    },
    methods: {
      async hLogin (e) {
        e.preventDefault()
        this.$http.post(this.URL,{ login: this.name, password: this.pass }).then(({ data }) => {
          // eslint-disable-next-line no-console
          const result = data.data
          if (result.access_token) {
            localStorage.setItem('jwt', result.access_token)
            location.reload(true)
          }
        }, ({ data, status }) => {
          // eslint-disable-next-line no-console
          console.warn(`Status code: ${status}`, data.errors)
        })
      }
    }
  }
</script>

<style scoped>

</style>
