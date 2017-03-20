var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
   context: path.join(__dirname),
   devtool: debug ? "inline-sourcemap" : null,
   entry: "./ReactBooking.js",
   module: {
   loaders: [
      {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel-loader',
         query: {
            presets: ['react', 'es2015', 'stage-1'],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
         }
      },
      {
         test: /\.css$/,
         loader: "style-loader!css-loader"
      }
   ]
   },
   output: {
      path: __dirname,
      filename: "client.min.js"
   },
};
