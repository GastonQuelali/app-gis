import { Platform } from 'react-native';

const STORYBOOK_ENABLED = process.env.STORYBOOK_ENABLED === 'true';

if (STORYBOOK_ENABLED && Platform.OS !== 'web') {
  require('./.rnstorybook');
} else {
  require('expo-router/entry');
}
