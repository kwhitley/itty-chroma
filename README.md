<br />

<p>
<a href="https://itty.dev/itty-chroma" target="_blank">
  <img src="https://github.com/user-attachments/assets/cfe915d5-63ce-4297-83ef-316426c7af57" alt="itty-chroma" height="120" />
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

- Tiny. It's an itty library, after all.
- Made specifically for the browser console.
- Loads of styling options, with infinite combinations.
- Simple and powerful API, designed for ease & readability.

## Example
```ts
import { chroma } from 'itty-chroma'

// KEEP IT SIMPLE
chroma.red.bold.log('This is bold red text')

// OR GO WILD
const badge = chroma.padding('3px 6px').bg('#444').white.radius('3px')
const description = chroma.italic.color('#666').size('0.9em')

chroma.log(
  badge('Did You Know?'),     // pass args directly to any chroma segment
  description,                // or place inline to affect later arguments
  'this is now in smaller, italic text',
  'and so is this... until we switch styles again',
  chroma.none,
  'but this is back to normal!'
)
```

![image](https://github.com/user-attachments/assets/ef7ecf70-4a91-46fa-a2e9-61c9d942d412)



# API

Chroma exposes an infinitely-chainable function/object, allowing you to chain styles.

You can also use chroma style definitions as arguments inside _other_ chroma statements, allowing for reusable, composable styles.

| PROPERTY | DESCRIPTION | EXAMPLE(s) |
| --- | --- | --- |
| **.log** | once executed, will output to console.log | `chroma.log('hello')` |
| **.warn** | once executed, will output to console.warn | `chroma.warn('warning text')` |
| **.error** | once executed, will output to console.error | `chroma.error('error text')` |
| **.bold** | bold text | `chroma.bold('this is bold')`, `chroma.bold.red('this is bold and red')` |
| **.italic** | italicized text | `chroma.italic('this is italic')` |
| **.underline** | underlined text | `chroma.underline('text')` |
| **.strike** | text with a line through it | `chroma.strike('this text was removed')` |
| **.{colorName}** | sets text color, supports any valid CSS color name | `chroma.magenta`, `chroma.lightGreen` |
| **.color(value)** | sets font color, supports any valid CSS color | `chroma.color('white')`, `chroma.color('rgba(255,0,0,0.2)')` |
| **.font(value)** | sets font, supports any valid CSS font-family | `chroma.font('Georgia')` |
| **.size(value)** | sets font size | `chroma.size('0.8rem')` |
| **.bg(value)** | sets background, supports any valid CSS background | `chroma.bg('salmon')` |
| **.radius(value)** | sets border-radius (for badges) | `chroma.radius('4px')` |
| **.border(value)** | sets border style | `chroma.border('double 5px red')` |
| **.padding(value)** | sets padding | `chroma.padding('2px 5px')` |
| **.style(value)** | sets custom CSS, allowing any valid sequence | `chroma.style('text-transform:uppercase;text-shadow:0 0 0.5rem rgba(255,0,100,0.5)')` |
| **.none**<sup>1</sup> | clears styling for subsequent arguments | `chroma.red('red text', chroma.none, 'plain text')` |

<sup>1</sup> <small>Any invalid CSS color name can be used in place of **chroma.none**, as this utimately turns into `"color:none;"`. Alternatively, you could use **chroma.clear**, **chroma.noStyle**, or anything else.</small>

## Examples

```ts

```

