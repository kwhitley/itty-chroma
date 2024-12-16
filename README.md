<br />

<p>
<a href="https://itty.dev/itty-chroma" target="_blank">
  <img src="https://github.com/kwhitley/itty-chroma/assets/865416/e45b9e04-a442-43b1-9961-59d62c62e88a" alt="itty-chroma" height="120" />
</a>
</p>

[![Version](https://img.shields.io/npm/v/itty-chroma.svg?style=flat-square)](https://npmjs.com/package/itty-chroma)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-chroma&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-chroma)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-chroma?style=flat-square)](https://coveralls.io/github/kwhitley/itty-chroma)
[![Issues](https://img.shields.io/github/issues/kwhitley/itty-chroma?style=flat-square)](https://coveralls.io/github/kwhitley/itty-chroma)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

###  [v1 Documentation](https://itty.dev/itty-chroma) &nbsp;| &nbsp; [Discord](https://discord.gg/53vyrZAu9u)

---

Powerful styling for the browser console in under 500 bytes.

## Features

[x] Tiny. It's about 470 bytes.
[x] Made specifically for the browser console.
[x] Simple, yet powerful.

## Example
```ts
import { chroma } from 'itty-chroma'

// keep it simple
chroma.red.bold.underline.log('This is bold, red, underlined text')

// or go wild
const badge = chroma.padding('3px 6px').bg('#444').white.radius('0.3rem')
const description = chroma.italic.color('#666').size('0.9em')

chroma.log(
  badge('Did You Know?'),
  description,
  'this is now in smaller, italic text',
  'and so is this... until we switch styles again',
  chroma.none,
  'but this is back to normal!'
)
```
