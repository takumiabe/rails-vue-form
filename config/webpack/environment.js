const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')

environment.loaders.append('vue', vue)

Object.assign(environment.config.resolve, {
  alias: {
    '@vue': 'vue/dist/vue.esm.js'
  }
})

module.exports = environment
