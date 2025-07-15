# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development**: `bun test --watch` - runs tests in watch mode
- **Lint**: `bun eslint src` - lints source code
- **Build**: `bun run build` - builds distribution files and updates README snippet
- **Verify**: `bun run verify` - runs build and tests (used before releases)
- **Test**: `bun test` - runs all tests

## Architecture Overview

itty-chroma is a browser console styling library built around a sophisticated Proxy pattern that creates an infinite chain of style properties. The core implementation consists of:

### Core Components

- **Single source file**: `src/chroma.ts` contains the entire implementation (~100 lines)
- **Nested Proxy pattern**: Two-level Proxy structure that handles property access and function execution
- **CSS style accumulation**: Properties build up CSS strings that are passed to console methods
- **Console method delegation**: Supports `log`, `warn`, and `error` output functions

### Key Implementation Details

The library uses a nested Proxy approach:
1. **Outer Proxy**: Handles initial property access and style accumulation
2. **Inner Proxy**: Handles function execution and console output formatting
3. **Style string building**: Properties like `bold`, `red`, `padding('5px')` build CSS strings
4. **Console formatting**: Uses `%c` formatting for applying styles to console output

### Style Property Mapping

- Simple properties (`bold`, `italic`, `underline`) map directly to CSS
- Color names (any CSS color) map to `color` property
- Functions (`color()`, `bg()`, `size()`) accept CSS values
- Special handling for padding/decoration to manage style boundaries

### Testing Strategy

- Uses Bun test framework
- Tests cover infinite proxy chain behavior
- Validates style property mapping and CSS output
- Checks console method delegation (`log`, `warn`, `error`)
- Tests padding barrier detection for proper style isolation

### Build Process

- **Rollup**: Bundles to multiple formats (ESM, CJS, and snippet)
- **TypeScript**: Compiled with strict settings but allows `any` types for Proxy flexibility
- **Terser**: Minifies output for size optimization
- **Bundle size tracking**: Monitors library size (target: under 500 bytes)
- **README injection**: Automatically updates browser snippet in README from build output

### Code Conventions

- ESLint with TypeScript preset
- Single quotes, no semicolons
- Unix line endings
- Disabled strict TypeScript rules for Proxy implementation (`@ts-ignore` used strategically)
- Function parameter destructuring in Proxy handlers