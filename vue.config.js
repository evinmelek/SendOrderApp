module.exports = { 
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  pwa: {
    name: "LP Cell App",
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black', 
      workboxOptions: { 
        swDest: 'service-worker.js',
        exclude: [/_redirects/]
      }
    } 
}
