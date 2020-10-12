const path = require(`path`);
const portFinderSync = require(`portfinder-sync`);
const port = portFinderSync.getPort(1338);
const webpack = require(`webpack`);

console.log(process.env.PUBLIC_URL, 'process.env.PUBLIC_URL')

module.exports = {
  entry: `./src/index.jsx`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `docs`),
    publicPath: process.env.PUBLIC_URL === '/test-elfsight' ? '/test-elfsight' : '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, `docs`),
    historyApiFallback: true,
    watchContentBase: true,
    open: true,
    hot: true,
    port,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
            },
          },
        ],
      },
    ],
  },
  devtool: `source-map`,
  plugins: [
    new webpack.DefinePlugin({
      [`process.env.PUBLIC_URL`]: JSON.stringify(process.env.PUBLIC_URL)
    })
  ]
};