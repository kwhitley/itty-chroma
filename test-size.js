#!/usr/bin/env bun

import { execSync } from 'child_process'
import fs from 'fs'

// Fast build and size check - skip tests, just build
function quickBuild() {
  try {
    execSync('rimraf dist && mkdir -p dist', { stdio: 'pipe' })
    const output = execSync('rollup -c', { stdio: 'pipe', encoding: 'utf8' })
    
    // Extract gzip size from output
    const match = output.match(/(\d+) B → (\d+) B \(gzip\)/)
    if (match) {
      return parseInt(match[2])
    }
    
    // Fallback: check file size
    const stats = fs.statSync('dist/chroma.mjs')
    return stats.size
  } catch (error) {
    return null
  }
}

// Test if current code still works
function quickTest() {
  try {
    execSync('bun test', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

// Export for use in optimization script
export { quickBuild, quickTest }

// If run directly, just show current size
if (import.meta.main) {
  const size = quickBuild()
  console.log(`Current gzipped size: ${size} bytes`)
}