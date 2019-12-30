// postcss.config.js
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
