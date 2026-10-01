const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { resolver, transformer, serializer } = config;

config.transformer = {
  ...transformer,
  unstable_allowRequireContext: true,
};

config.resolver = {
  ...resolver,
  resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
};

config.serializer = {
  ...serializer,
};

module.exports = config;
