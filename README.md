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
![image](https://github.com/user-attachments/assets/1ac23229-111c-4434-a6ce-379b55d71a71)

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
  description,                // or drop them inline to change style
  'this is now in smaller, italic text',
  'and so is this... until we switch styles again',
  chroma.none,
  'but this is back to normal!'
)
```

![image](https://github.com/user-attachments/assets/ef7ecf70-4a91-46fa-a2e9-61c9d942d412)

# How it Works

Call/access properties to add multiple styles, then call the function itself to trigger the output.  

Otherwise, it follows the following behaviors:

### 1. Use `chroma.log` (or warn/error) to output to console.
```ts
chroma.log('text') // console.log('text')
chroma.warn('text') // console.warn('text')
chroma.error('text') // console.error('text')
```
![image](https://github.com/user-attachments/assets/0c82f3e9-0fae-4e4a-a021-6d334874ed00)


### 2. Chroma segments
You can call them directly:
```ts
chroma.bold.red.log('This will be red.')
```
![image](https://github.com/user-attachments/assets/63a78004-87f2-4bf2-ba9e-60407b986419)


Use them inside other chroma statements:
```ts
chroma.log(
  chroma.bold.green,
  'This will be green.'
)
```
![image](https://github.com/user-attachments/assets/04a68ebd-3c46-45cc-ad71-9ed8e68b98fc)

Save them for later:
```ts
const blue = chroma.bold.blue

chroma.log(blue, 'This will be blue.')
```
![image](https://github.com/user-attachments/assets/d1083073-f33d-4356-8b21-37ae02fe0d3c)

Or even make a logger:
```ts
const ittyLogger = chroma.bold.color("#f0c").log

ittyLogger('This will be itty-colored.')
```
![image](https://github.com/user-attachments/assets/0a2e05aa-923c-4d47-98b8-bf3f583a3cf4)

### 3. All valid CSS color names may be used (100% support)
```ts
chroma.salmon.log('This is salmon.')
chroma.cornflowerblue.log('This is cornflowerblue.')
chroma.cornFlowerBlue.log('Case does not matter here...')
```
![image](https://github.com/user-attachments/assets/b363fcec-a289-4f25-af8c-d3d5f31e532f)

### 3. Any valid CSS can be used for property values that expect a value
```ts
chroma
  .color('rgba(255,0,100,0.4)')
  .log('This works just fine')
```
![image](https://github.com/user-attachments/assets/98f978a0-87b6-4488-8f22-696452e927d0)

### 4. Or completely custom CSS can be inlined using `.style(css: string)`
```ts
chroma
  .size('2em')
  .padding('0.5em')
  .style('text-transform:uppercase; text-shadow:0 0 0.5em magenta;')
  .log('So does this')
```
![image](https://github.com/user-attachments/assets/3a6e5bcf-99ab-4616-9794-579c2e0e6cc8)

### 5. A style will continue to apply until replaced, or cleared using **`chroma.none`**

```ts
chroma.log(
  chroma.red('this will be red'),
  '...but so will this',
  chroma.clear,
  'back to unformatted text'
)
```
![image](https://github.com/user-attachments/assets/d970e8c1-1249-4a39-a183-845ccd5d841f)

### 6. Either called/uncalled segments can be used in assembling messages

```ts
const called = chroma.red('red text')
const uncalled = chroma.blue

chroma.log(
  called,
  uncalled,
  'blue text',
)
```
![image](https://github.com/user-attachments/assets/76d85a9f-2de1-4bc8-9beb-24547a76db31)

### 7. Example: Creating custom log messages
```ts
// we define a curried function to accept some args now, some later
const createLogger = (type = 'log', label, badge = 'grey', text = 'grey') => 
  (...args) => 
    chroma[type](
      chroma.bg(badge).white.bold.padding('2px 5px 1px').radius('0.2rem')(label),
      chroma.color(text).italic,
      ...args,
    )

// our loggers are partial executions
const info = createLogger('log', 'INFO', 'green')
const warning = createLogger('warn', 'WARNING', 'orange', 'brown')

// and we finally call them to log messages
info('This is just a helpful bit of info!')
warning('But this is a more serious warning text...')
```
![image](https://github.com/user-attachments/assets/58cdbcbb-51c3-4b67-8fe8-323bf3a094cd)

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


