import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '../components/ui/collapsible';
import { ThemedText } from '../themed-text';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/UI/Collapsible',
  component: Collapsible,
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: <ThemedText>This is the collapsible content</ThemedText>,
  },
};

export const Expanded: Story = {
  args: {
    title: 'Already expanded',
    children: <ThemedText>This content is shown expanded by default</ThemedText>,
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
