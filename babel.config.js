import path from 'node:path';

/** @type {string[]} */
export const presets = ['next/babel'];

const dirname = import.meta.dirname;

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
        '@styles': [path.join(dirname, 'src/styles/index.css')],
        '@components': [path.join(dirname, 'src/components/index.ts')],
        '@hooks': [path.join(dirname, 'src/hooks/index.ts')],
        '@lib': [path.join(dirname, 'src/lib/index.ts')],
        '@stylex/color.stylex.ts': [
          path.join(dirname, 'src/stylex/consts/color.stylex.ts'),
        ],
        '@stylex/px.stylex.ts': [
          path.join(dirname, 'src/stylex/consts/px.stylex.ts'),
        ],
        '@stylex/font.stylex.ts': [
          path.join(dirname, 'src/stylex/consts/font.stylex.ts'),
        ],
        '@stylex/animation.stylex.ts': [
          path.join(dirname, 'src/stylex/consts/animation.stylex.ts'),
        ],
      },
    },
  ],
];
