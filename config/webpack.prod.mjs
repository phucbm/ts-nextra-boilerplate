import TerserPlugin from "terser-webpack-plugin"
import webpack from "webpack"
import { paths, packageInfo, bannerConfig, env } from "./config.mjs"

/**
 * Sample variables: "cross-env TARGET=umd"
 * TARGET: libraryTarget
 */
const libraryTarget = env.TARGET || "umd"
const isMinified = env.MIN === "yes"
let filename,
    experiments = {},
    library = undefined
switch (libraryTarget) {
    case "module":
        filename = `${packageInfo.name}.module.js`
        experiments = {
            outputModule: true,
        }
        break
    default:
        if (isMinified) {
            filename = `${packageInfo.name}.min.js`
        } else {
            filename = `${packageInfo.name}.js`
        }
}

export default {
    mode: "production",
    devtool: false,
    entry: paths.entry,
    experiments,
    output: {
        path: paths.dist,
        filename,
        library,
        libraryTarget,
        umdNamedDefine: true,
        globalObject: "this",
    },
    module: {
        rules: [
            // TypeScript
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@": paths.src,
        },
    },
    plugins: [new webpack.BannerPlugin(bannerConfig)],
    optimization: {
        minimize: isMinified,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
}