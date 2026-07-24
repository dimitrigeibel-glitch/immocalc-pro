const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Anthropic SDK ships as ESM/CJS hybrid — ensure Metro resolves CJS variant
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['require', 'default'];

module.exports = config;
