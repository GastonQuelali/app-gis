import 'expo-router/entry';
import { Platform } from 'react-native';

const STORYBOOK_ENABLED = process.env.STORYBOOK_ENABLED === 'true';

if (STORYBOOK_ENABLED && Platform.OS !== 'web') {
  const { view } = require('./.storybook');
  module.exports = view;
} else {
  module.exports = require('expo-router/entry');
}
