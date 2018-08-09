var app = new Vue({
  el: '#container',
  methods: {
    on() {
      this.$http.get('/on')
    },
    off() {
      this.$http.get('/off')
    }
  }
})