import path from 'node:path';

/** @type {string[]} */
export const presets = ['next/babel'];

/** @type {import('@babel/core').PluginItem[]} */
export const plugins = [
  [
    '@stylexjs/babel-plugin',
    {
      dev: process.env.NODE_ENV !== 'production',
      treeshakeCompensation: true,
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: dirname,
      },
      aliases: {
        '@/*': [path.join(import.meta.dirname, 'src', '*')],
      },
    },
  ],
];
