const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cw3-pwa/'
    : '/',
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: './src/service-worker.js',
        debug:true
      },
    },
})
