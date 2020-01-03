<template>
  <b-container>
    <b-row class="pb-3">
      <b-col cols="3" align="left" class="pl-0">
        <b-button @click="getCustomers">GET Custormers</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3" class="pl-0 overflow-hidden" style="height: 480px">
        <div class="box w-100 h-100" align="left">{{ dataFromServer }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "index",
    data: () => ({
      URL_Customers: 'https://pre.ugoloc.ucann.ru/api/cabinet/v1.0/customers',
      dataFromServer: ''
    }),
    methods: {
      async getCustomers () {
        const token = localStorage.getItem('jwt')
        // const { data } = await this.$http.get(this.URL_Customers)
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'json'
        xhr.open('GET', this.URL_Customers)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
        xhr.onload = () => new Promise((resolve, reject) => {
          if (xhr.readyState === 4) {
            resolve(xhr)
          } else {
            // eslint-disable-next-line no-console
            console.warn('Promise.reject')
            reject(xhr)
          }
        })
        .then(({ response }) => {
          this.dataFromServer = response.data
        }, err => {
          // eslint-disable-next-line no-console
          console.warn('...Catched', err)
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    -webkit-column-width: 150px;
    -moz-column-width: 150px;
    column-width: 150px;
    height: 100%;
  }
</style>
