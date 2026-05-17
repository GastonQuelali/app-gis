import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemedView } from '../components/themed-view';
import { StyleSheet } from 'react-native';

const meta: Meta<typeof ThemedView> = {
  title: 'Components/ThemedView',
  component: ThemedView,
};

export default meta;

type Story = StoryObj<typeof ThemedView>;

export const Default: Story = {
  args: {
    style: styles.container,
    children: null,
  },
};

export const Tinted: Story = {
  args: {
    style: styles.container,
    tint: 'tint',
    children: null,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
