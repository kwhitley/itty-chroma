import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import bundleSize from 'rollup-plugin-bundle-size'
import copy from 'rollup-plugin-copy'

export default {
  input: './src/chroma.ts',
  output: [
    {
      format: 'esm',
      file: './dist/chroma.mjs',
    },
    {
      format: 'cjs',
      file: './dist/chroma.js',
    },
    {
      format: 'esm',
      file: './dist/chroma.snippet.js',
    },
  ],
  plugins: [
    typescript(),
    terser(),
    bundleSize(),
    copy({
      targets: [
        {
          src: ['LICENSE'],
          dest: 'dist',
        },
      ],
    }),
  ],
}
