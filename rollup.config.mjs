import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import fs from 'fs-extra'
import { globby } from 'globby'
import bundleSize from 'rollup-plugin-bundle-size'
import copy from 'rollup-plugin-copy'

// scan files to build
const files = (await globby('./src/*.ts', {
  ignore: ['**/*.spec.ts'],
})).map(path => ({
  path,
  shortPath: path.replace(/(\/src)|(\.ts)/g, '').replace('./index', '.'),
  esm: path.replace('/src/', '/dist/').replace('.ts', '.mjs'),
  cjs: path.replace('/src/', '/dist/').replace('.ts', '.js'),
  types: path.replace('/src/', '/dist/').replace('.ts', '.d.ts'),
})).sort((a, b) => a.shortPath.toLowerCase() < b.shortPath.toLowerCase() ? -1 : 1)

// read original package.json
const pkg = await fs.readJSON('./package.json')

// create updated exports list from build files
pkg.exports = files.reduce((acc, file) => {
  acc[file.shortPath] = {
    import: file.esm.replace('/dist', ''),
    require: file.cjs.replace('/dist', ''),
    types: file.types.replace('/dist', ''),
  }

  return acc
}, {})

// write updated package.json
await fs.writeJSON('./package.json', pkg, { spaces: 2 })

console.log('files are', files)

export default async () => {
  console.log(files.map(f => f.path))

  // export base files
  return files.map(file => ({
    input: file.path,
    output: [
      {
        format: 'esm',
        file: file.esm,
        sourcemap: false,
      },
      {
        format: 'cjs',
        file: file.cjs,
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({ sourceMap: false }),
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
  }))
}
