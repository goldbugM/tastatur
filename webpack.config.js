/* eslint-disable n/no-extraneous-import */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { intlTransformer } from "@mkboard/scripts/intl-transformer.js";
import { ManifestPlugin } from "@mkboard/scripts/webpack-manifest.js";
// Removed thirdparties webpack environment
import CompressionPlugin from "compression-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mode = process.env.NODE_ENV || "production";

const isVendor = (excludedVendors) => {
  const vendorsDir = join(__dirname, "node_modules");
  return ({ resource }) => {
    // A vendor package is anything in the root /node_modules/ dir
    // except for some explicitly excluded packages.
    // Packages in the nested /node_modules/ dirs are not vendors.
    return (
      resource != null &&
      resource.startsWith(vendorsDir) &&
      !excludedVendors.some((excluded) =>
        resource.startsWith(join(vendorsDir, excluded)),
      )
    );
  };
};

const dev = mode === "development";
const filename = dev ? "[name]" : "[contenthash:16]";
const chunkFilename = dev ? "[name]" : "[contenthash:16]";
const assetModuleFilename = dev ? "[name]" : "[contenthash:16]";
const localIdentName = dev
  ? "[name]__[local]__[hash:base64:10]"
  : "[hash:base64:10]";

const rule_ts = () => ({
  test: /\.(ts|tsx)$/,
  type: "javascript/auto",
  use: [
    {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
        compilerOptions: {
          target: "es2022",
          module: "es2022",
          moduleResolution: "bundler",
          jsx: mode === "development" ? "react-jsxdev" : "react-jsx",
        },
        getCustomTransformers: () => ({
          before: [intlTransformer()],
        }),
      },
    },
  ],
});

const rule_js = () => ({
  test: /\.(js|jsx)$/,
  type: "javascript/auto",
  use: [
    {
      loader: "source-map-loader",
    },
  ],
});

const rule_less = (emit) => ({
  test: /\.less$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        emit,
      },
    },
    {
      loader: "css-loader",
      options: {
        modules: {
          auto: true,
          namedExport: true,
          exportGlobals: true,
          exportLocalsConvention: "dashesOnly",
          localIdentName,
        },
      },
    },
    {
      loader: "less-loader",
    },
  ],
});

export default [
  {
    name: "server",
    target: "node",
    mode,
    context: __dirname,
    entry: {
      index: "./packages/server/lib/main.ts",
      mkboard: "./packages/server-cli/lib/main.ts",
    },
    output: {
      path: join(__dirname, "root", "lib"),
      clean: false,
      filename: "[name].js",
      chunkFilename: "[name].js",
      assetModuleFilename: `[name][ext]`,
    },
    module: {
      rules: [
        rule_ts(),
        rule_js(),
        rule_less(false),
        {
          test: /\.(png|jpe?g|gif|svg|ico|webp)$/i,
          use: "null-loader",
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          use: "null-loader",
        },
        {
          test: /\.(mp3|wav|ogg)$/i,
          use: "null-loader",
        },
        {
          test: /\.data$/i,
          use: "null-loader",
        },
        {
          test: /\.stats$/i,
          use: "null-loader",
        },
        {
          test: /\/knex\/lib\/dialects\//,
          exclude: /\/mysql|sqlite3|better-sqlite3\//,
          use: "null-loader",
        },
        {
          test: /\/knex\/lib\/migrations\//,
          use: "null-loader",
        },
      ],
    },
    externals: {
      "sqlite3": "commonjs sqlite3",
      "better-sqlite3": "commonjs better-sqlite3",
      "bufferutil": "commonjs bufferutil",
      "utf-8-validate": "commonjs utf-8-validate",
    },
    optimization: {
      minimize: false,
      moduleIds: "named",
      chunkIds: "named",
    },
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "typeof window": JSON.stringify("undefined"),
      }),
      new MiniCssExtractPlugin(),
    ],
  },
  {
    name: "browser",
    target: "web",
    mode,
    context: __dirname,
    entry: {
      browser: "./packages/mkboard-pages-browser/lib/entry.ts",
      server: "./packages/mkboard-pages-server/lib/entry.ts",
    },
    output: {
      path: join(__dirname, "root", "public", "assets"),
      clean: true,
      publicPath: "/assets/",
      filename: `${filename}.js`,
      chunkFilename: `${chunkFilename}.js`,
      assetModuleFilename: `${assetModuleFilename}[ext]`,
    },
    module: {
      rules: [
        rule_ts(),
        rule_js(),
        rule_less(true),
        {
          test: /\.(png|jpe?g|gif|svg|ico|webp)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(mp3|wav|ogg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.data$/i,
          type: "asset/resource",
        },
        {
          test: /\.stats$/i,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: isVendor(["tslib", "@mdi"]),
            chunks: "all",
            name: "shared-vendor",
          },
          widget: {
            test: /\/mkboard-widget\//,
            chunks: "all",
            name: "shared-widget",
          },
          keyboard: {
            test: /\/mkboard-keyboard\//,
            chunks: "all",
            name: "shared-keyboard",
          },
          styles: {
            type: "css/mini-extract",
            chunks: "all",
            name: "styles",
          },
        },
      },
    },
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "typeof window": JSON.stringify("object"),
      }),
      new MiniCssExtractPlugin({
        filename: `${filename}.css`,
        chunkFilename: `${chunkFilename}.css`,
        ignoreOrder: true,
      }),
      new ManifestPlugin(),
      ...(dev
        ? []
        : [
            new CompressionPlugin({
              test: /\.(js|css|svg|data)$/,
              filename: "[file].gz",
              algorithm: "gzip",
            }),
            new CompressionPlugin({
              test: /\.(js|css|svg|data)$/,
              filename: "[file].br",
              algorithm: "brotliCompress",
            }),
          ]),
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
      }),
    ],
    performance: {
      maxAssetSize: 1048576,
      maxEntrypointSize: 1048576,
    },
  },
];
