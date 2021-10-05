var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const dotenv = require('dotenv')
const argv = require('yargs').argv

if (argv.local) {
    mode = 'local'
} else if (argv.vhost) {
    mode = 'vhost'
} else {
    mode = 'local'
    console.warn('\x1b[33m%s\x1b[0m', 'Recordar que se debe pasar el flag --local o --vhost al comando yarn encore, se asume --local')
}

const env = dotenv.config({ path: path.resolve(process.cwd(), `.env.${mode}`) })

if (env.error) {
    throw env.error
}
  
// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath(env.parsed.ENCORE_PUBLIC_PATH)
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    
    // will create web/build/*.css
    .addEntry('error', './assets/css/error.css')

    // .addPlugin(new CopyWebpackPlugin([
    //     // copies to {output}/images
    //     { from: './assets/images', to: 'images' }
    // ]))

    .addPlugin(new CopyWebpackPlugin(
        { 
          patterns: [
            { from: './assets/images', to: 'images' }
          ]
        }
      ))

    .autoProvidejQuery()

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .configureBabel((config)=>{
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // Para sacar el deprecation warning
    .enableSingleRuntimeChunk()

    .enableLessLoader()
    // Silenciando recomendacion al compilar, más info en:
    // https://symfony.com/doc/current/frontend/encore/vuejs.html#runtime-compiler-build
    .enableVueLoader(() => {}, { runtimeCompilerBuild: true })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
