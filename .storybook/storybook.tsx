import { getStorybookUI, registerComponent } from '@storybook/react-native';
import { Preview } from './preview';
import main from './main';

registerComponent({ main, preview: Preview });

const StorybookUIRoot = getStorybookUI({
  enableWebsockets: true,
  host: 'localhost',
  port: 7007,
});

export const view = StorybookUIRoot;
