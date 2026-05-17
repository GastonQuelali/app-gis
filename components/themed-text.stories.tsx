import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemedText } from '../components/themed-text';
import { View, StyleSheet } from 'react-native';

const meta: Meta<typeof ThemedText> = {
  title: 'Components/ThemedText',
  component: ThemedText,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedText>;

export const Default: Story = {
  args: {
    children: 'Default text',
  },
};

export const Title: Story = {
  args: {
    type: 'title',
    children: 'Title Text',
  },
};

export const Subtitle: Story = {
  args: {
    type: 'defaultSemiBold',
    children: 'Subtitle Text',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    children: 'Link Text',
  },
};

export const Small: Story = {
  args: {
    type: 'default',
    style: { fontSize: 12 },
    children: 'Small text',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
