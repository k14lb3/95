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
      aliases: {
        '@/*': [path.join(import.meta.dirname, 'src', '*')],
      },
    },
  ],
];
