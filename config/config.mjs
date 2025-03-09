import path from "path"
import {fileURLToPath} from "url"
import packageInfo from "../package.json" assert {type: "json"}

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Environment variables
 * scripts: cross-env NODE_ENV=development
 */
const env = process.env

/**
 * Banner
 */
const bannerConfig = {
    banner: `
/**!
 * ${packageInfo.prettyName || packageInfo.name} v${packageInfo.version}
 * @author ${packageInfo.author.name}
 * @homepage ${packageInfo.homepage || ""}
 * @license ${packageInfo.license} ${new Date().getFullYear()}
 */`,
    raw: true,
}

/**
 * Paths
 */
const paths = {
    // Source files
    src: path.resolve(__dirname, "../src"),
    entry: path.resolve(__dirname, "../src/_index.ts"),

    // Production build files
    dist: path.resolve(__dirname, "../dist"),
}

/**
 * Export
 */
export {paths, packageInfo, bannerConfig, env}