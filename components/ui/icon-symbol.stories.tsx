import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconSymbol } from './icon-symbol';
import { View, StyleSheet } from 'react-native';

const meta: Meta<typeof IconSymbol> = {
  title: 'Components/UI/IconSymbol',
  component: IconSymbol,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IconSymbol>;

export const House: Story = {
  args: {
    name: 'house.fill',
    size: 28,
    color: '#007AFF',
  },
};

export const Settings: Story = {
  args: {
    name: 'gear',
    size: 28,
    color: '#8E8E93',
  },
};

export const Map: Story = {
  args: {
    name: 'map',
    size: 28,
    color: '#34C759',
  },
};

export const Large: Story = {
  args: {
    name: 'star.fill',
    size: 48,
    color: '#FF9500',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
