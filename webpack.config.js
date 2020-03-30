const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'src/fe/dist',
        to: 'release/'
      },
      {
        from: 'src/img',
        to: 'release/img'
      },
      {
        from: 'src/background.js',
        to: 'release/background.js'
      },
      {
        from: 'src/manifest.json',
        to: 'release/manifest.json'
      },
    ]),
  ],
}
