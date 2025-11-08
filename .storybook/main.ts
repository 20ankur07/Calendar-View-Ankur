
import type { StorybookConfig } from '@storybook/react';
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links', '@storybook/addon-interactions'],
  framework: { name: '@storybook/react', options: {} },
  docs: { autodocs: 'tag' },
};
export default config;
