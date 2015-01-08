'use strict';
var options = {
    appName: 'RPS',
    appOutput: './src/public/_rps-http-gulp',
    appServer: './src/server/index.js',
    baseTheme: './src/public/styles/core/theme',
    baseThemeWidgets: './src/public/styles/core/theme/widgets',
    nodeModules: './node_modules',
    features: './src/public/features',
    specs: {
        sources: ['./src/server/**/*.js', '!./src/server/lib/**', '!./src/server/config/**'],
        tests: ['./test/unit/server/**/*.js'],
        coverageFolder: 'reports/coverage'
    },
    karmaConfigLocal: 'test/config/karma.conf.local.js',
    karmaConfigSingle: 'test/config/karma.conf.single.js'
};

module.exports = options;