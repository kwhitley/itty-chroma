import { describe, expect, it } from 'vitest'
import * as exports from './index'

const expected = [
  'seconds',
  'ms',
  'duration',
  'datePlus'
]

describe('itty-time', () => {
  describe('exports', () => {
    for (const exportName of expected) {
      it(exportName, () => {
        expect(typeof exports[exportName]).toBe('function')
      })
    }
  })
})
