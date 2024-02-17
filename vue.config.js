const { defineConfig } = require('@vue/cli-service')
const repoName = "cw3-pwa"
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:`/${{repoName}}`
})
