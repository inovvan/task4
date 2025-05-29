import { resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.js";
export const output = {
  path: resolve(__dirname, "dist"),
  filename: "bundle.js",
};
export const module = {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.js$/i,
      exclude: /node_modules/,
      use: "babel-loader",
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
];
export const devServer = {
  static: {
    directory: join(__dirname, "dist"),
  },
  open: true,
};
export const mode = "development";
