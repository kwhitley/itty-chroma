import fs from 'fs'

const transformCode = code => code
  .replace(/^const\s+(\w+)\s*=/, 'let chroma=')
  .replace(/;export\s*{[^}]+};?\s*$/, ';')

const snippet = fs.readFileSync('dist/chroma.snippet.js', 'utf-8')
const transformed = transformCode(snippet).trim()

// remove snippet file
fs.unlinkSync('dist/chroma.snippet.js')

// Check if README has snippet markers, if so update them
if (fs.existsSync('README.md')) {
  const readme = fs.readFileSync('README.md', 'utf-8')
  
  if (readme.includes('<!-- BEGIN SNIPPET -->')) {
    const newReadme = readme.replace(
      /(<!-- BEGIN SNIPPET -->[\r\n]+```(?:js|ts)[\r\n]).*?([\r\n]```[\r\n]+<!-- END SNIPPET -->)/s,
      `$1${transformed}$2`
    )
    
    fs.writeFileSync('README.md', newReadme)
    console.log('README snippet updated')
  } else {
    console.log('No snippet markers found in README, snippet created but not injected')
  }
}