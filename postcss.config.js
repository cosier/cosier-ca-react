module.exports = (ctx) => {
  return {
    map: ctx.env === 'development' ? 'inline' : false,
    // ctx.env === process.env.NODE_ENV === 'development' (default)
    plugins: [
      // require('postcss-smart-import')(),
      // require('postcss-url')(),
      // require('postcss-mixins')(),
      // require('postcss-cssnext')(),
      // require('postcss-inline-comment')()
    ]
  }
}
