#!/usr/bin/env bun

import fs from 'fs'
import { execSync } from 'child_process'

const CHROMA_FILE = 'src/chroma.ts'

// Quick size check
function getSize() {
  try {
    execSync('rimraf dist && mkdir -p dist && rollup -c', { stdio: 'pipe' })
    const output = fs.readFileSync('dist/chroma.mjs', 'utf8')
    const compressed = execSync(`echo '${output}' | gzip -c | wc -c`, { encoding: 'utf8' })
    return parseInt(compressed.trim())
  } catch {
    return 99999
  }
}

// Quick test
function quickTest() {
  try {
    execSync('bun test', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

// Save current best
const original = fs.readFileSync(CHROMA_FILE, 'utf8')
let bestCode = original
let bestSize = getSize()

console.log(`Starting size: ${bestSize} bytes`)

// Different arrangements to try
const arrangements = [
  // Current best order: log/warn/error first, then color, style, etc.
  { name: "current", pattern: "log-first" },
  
  // Try bold first (most common style)
  { 
    name: "bold-first",
    order: ['bold', 'color', 'style', 'italic', 'underline', 'strike', 'font', 'size', 'bg', 'radius', 'padding', 'border']
  },
  
  // Try grouping by length
  { 
    name: "by-length", 
    order: ['bg', 'font', 'size', 'bold', 'color', 'style', 'italic', 'strike', 'radius', 'border', 'padding', 'underline']
  },
  
  // Try alphabetical
  { 
    name: "alphabetical",
    order: ['bg', 'bold', 'border', 'color', 'font', 'italic', 'padding', 'radius', 'size', 'strike', 'style', 'underline']
  }
]

for (const arr of arrangements) {
  if (!arr.order) continue
  
  // Generate new conditional chain
  const conditions = [
    "prop == 'log' || prop == 'warn' || prop == 'error' ? (which = prop, __)"
  ]
  
  for (const prop of arr.order) {
    switch (prop) {
      case 'color':
        conditions.push(`prop == 'color' ? add(prop)`)
        break
      case 'style':
        conditions.push(`prop == 'style' ? add\`\``)
        break
      case 'bold':
        conditions.push(`prop == 'bold' ? add\`font-weight\`(prop)`)
        break
      case 'italic':
        conditions.push(`prop == 'italic' ? add\`font-style\`(prop)`)
        break
      case 'underline':
        conditions.push(`prop == 'underline' ? add\`text-decoration\`(prop)`)
        break
      case 'strike':
        conditions.push(`prop == 'strike' ? add\`text-decoration\`\`line-through\``)
        break
      case 'font':
        conditions.push(`prop == 'font' ? add\`font-family\``)
        break
      case 'size':
        conditions.push(`prop == 'size' ? add\`font-size\``)
        break
      case 'bg':
        conditions.push(`prop == 'bg' ? add\`background\``)
        break
      case 'radius':
        conditions.push(`prop == 'radius' ? add\`border-radius\``)
        break
      case 'padding':
        conditions.push(`prop == 'padding' ? add(prop)`)
        break
      case 'border':
        conditions.push(`prop == 'border' ? add(prop)`)
        break
    }
  }
  
  // Handle combined padding/border case  
  const finalConditions = conditions.filter(c => !c.includes('padding') && !c.includes('border'))
  finalConditions.push(`prop == 'padding' || prop == 'border' ? add(prop)`)
  finalConditions.push(`add\`color\`(prop)`)
  
  const newReturn = `        return ${finalConditions.join('\n          : ')}`
  
  // Apply changes
  const newCode = original.replace(
    /return prop == 'log'[\s\S]*?add`color`\(prop\)/,
    newReturn
  )
  
  fs.writeFileSync(CHROMA_FILE, newCode)
  
  if (quickTest()) {
    const size = getSize()
    console.log(`${arr.name}: ${size} bytes ${size < bestSize ? '🎉 NEW BEST!' : ''}`)
    
    if (size < bestSize) {
      bestSize = size
      bestCode = newCode
    }
  } else {
    console.log(`${arr.name}: FAILED TESTS`)
  }
}

// Restore best version
fs.writeFileSync(CHROMA_FILE, bestCode)
console.log(`\nFinal best size: ${bestSize} bytes`)