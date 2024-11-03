const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js/translator.js", // Entry point for your JavaScript
  },
  output: {
    filename: "bundle.js", // Output JS file name
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Load and extract CSS
      },
      {
        test: /\.html$/,
        use: ["html-loader"], // Load HTML files
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS file name
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Template HTML file
      inlineSource: ".(js|css)$", // Inline any JS and CSS files
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    minimize: true, // Minify output
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
    ],
  },
};
