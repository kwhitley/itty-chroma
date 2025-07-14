import { describe, expect, it, spyOn, mock } from 'bun:test'
import { chroma } from './chroma'

type TestLeaf = (args: {
  chroma: typeof chroma
  spyConsole: (method: 'log' | 'warn' | 'error') => jest.SpyInstance
  mockFn: typeof mock
}) => void

type TestTree = {
  [key: string]: TestTree | TestLeaf
}

const isChroma = (instance: any) => typeof instance.a.b.c === 'function'

const tests: TestTree = {
  'NAMED EXPORTS': {
    'import { chroma } from "itty-chroma"': {
      'is a function': () => expect(typeof chroma).toBe('function'),
      'returns the chroma Proxy': () => expect(isChroma(chroma)).toBe(true),
      'empty execution returns nothing': () => expect(typeof chroma()).toBe('undefined'),
      'returns an infinite Proxy chain': () => expect(typeof chroma.a.b.c.d.e.f).toBe('function'),
      'executing any node returns an array (unless log type specified)': () => {
        expect(Array.isArray(chroma.a.b.c('xyz'))).toBe(true)
      },
    },
  },
  'OUTPUT METHODS': {
    'console.log delegation': {
      '.log() calls console.log': ({ spyConsole }) => {
        const logSpy = spyConsole('log')
        const result = chroma.a.b.log.d('xyz')
        expect(Array.isArray(result)).toBe(false)
        expect(result).toBe(undefined)
        expect(logSpy).toHaveBeenCalledTimes(1)
      },
    },
    'console.warn delegation': {
      '.warn() calls console.warn': ({ spyConsole }) => {
        const warnSpy = spyConsole('warn')
        chroma.warn('hey')
        expect(warnSpy).toHaveBeenCalledTimes(1)
      },
    },
    'console.error delegation': {
      '.error() calls console.error': ({ spyConsole }) => {
        const errorSpy = spyConsole('error')
        chroma.error('hey')
        expect(errorSpy).toHaveBeenCalledTimes(1)
      },
    },
  },
  'STYLE PROPERTIES': {
    'color properties': {
      '.color("value") function': () => {
        const out = chroma.color('#aaa')()
        expect(out.join(' ').indexOf('color:#aaa')).not.toBe(-1)
      },
      'CSS color names work as properties': () => {
        const out = chroma.red()
        expect(out.join(' ').indexOf('color:red')).not.toBe(-1)
      },
    },
    'text styling': {
      '.bold': () => {
        const out = chroma.bold()
        expect(out.join(' ').indexOf('font-weight:bold')).not.toBe(-1)
      },
      '.italic': () => {
        const out = chroma.italic()
        expect(out.join(' ').indexOf('font-style:italic')).not.toBe(-1)
      },
      '.underline': () => {
        const out = chroma.underline()
        expect(out.join(' ').indexOf('text-decoration:underline')).not.toBe(-1)
      },
      '.strike': () => {
        const out = chroma.strike()
        expect(out.join(' ').indexOf('text-decoration:line-through')).not.toBe(-1)
      },
    },
    'font properties': {
      '.font("value")': () => {
        const out = chroma.font('Georgia')()
        expect(out.join(' ').indexOf('font-family:Georgia')).not.toBe(-1)
      },
      '.size("value")': () => {
        const out = chroma.size('0.9em')()
        expect(out.join(' ').indexOf('font-size:0.9em')).not.toBe(-1)
      },
    },
    'background and layout': {
      '.bg("value")': () => {
        const out = chroma.bg('rgba(255,0,0,0.3)')()
        expect(out.join(' ').indexOf('background:rgba(255,0,0,0.3)')).not.toBe(-1)
      },
      '.radius("value")': () => {
        const out = chroma.radius('3px')()
        expect(out.join(' ').indexOf('border-radius:3px')).not.toBe(-1)
      },
      '.padding("value")': () => {
        const out = chroma.padding('#aaa')()
        expect(out.join(' ').indexOf('padding:#aaa')).not.toBe(-1)
      },
      '.border("value")': () => {
        const out = chroma.border('1px solid red')()
        expect(out.join(' ').indexOf('border:1px solid red')).not.toBe(-1)
      },
    },
    'custom styling': {
      '.style() accepts custom CSS': () => {
        const styleString = 'text-transform:uppercase;margin-bottom:3rem'
        const out = chroma.style(styleString)()
        expect(out.join(' ').indexOf(styleString)).not.toBe(-1)
      },
    },
  },
  'BARRIER DETECTION': {
    'padding barriers': {
      'includes no color clear by default': () => {
        const result = chroma.red(
          'red text',
          chroma.blue('blue text'),
        )
        expect(result[0].indexOf('%c%s ')).toBe(0)
        expect(result.indexOf('')).toBe(-1)
      },
      'includes a barrier after padding': () => {
        const result = chroma.padding('5px')(
          'padded text',
          chroma.blue('blue text'),
        )
        expect(result[0].indexOf('%c%s%c ')).toBe(0)
        expect(result.indexOf('')).toBe(3)
      },
    },
    'decoration barriers': {
      'includes a barrier after text-decoration': () => {
        const result = chroma.red(
          'padded text',
          chroma.strike,
          'strike text',
          chroma.blue,
          'blue text',
        )
        expect(result[0]).toBe('%c%s %c%s%c %c%s ')
        expect(result.indexOf('')).toBe(5)
      },
    },
  },
  'BEHAVIOR': {
    'function execution': {
      'will not execute non-chroma functions in arguments': ({ spyConsole, mockFn }) => {
        const logSpy = spyConsole('log')
        const fn = mockFn(() => {})
        chroma.red.log('hello', fn, 'world')

        expect(fn).not.toHaveBeenCalled()
        logSpy.mockRestore()
      },
    },
    'state isolation': {
      'partials do not mutate each other': () => {
        const red = chroma.red
        
        // Use red with additional styles
        red.bold.italic('test')
        
        // red should still only be red, not bold+italic
        const result = red('this should only be red')
        const styleString = result.join(' ')
        
        expect(styleString).toContain('color:red')
        expect(styleString).not.toContain('font-weight:bold')
        expect(styleString).not.toContain('font-style:italic')
      },
    },
  },
}

// Setup function for each test
const setup = () => {
  const spyConsole = (method: 'log' | 'warn' | 'error') => {
    return spyOn(console, method).mockImplementation(() => {})
  }

  return {
    chroma,
    spyConsole,
    mockFn: mock,
  }
}

// Recursive test runner
const runTests = (tests: TestTree) => {
  for (const [name, test] of Object.entries(tests)) {
    if (typeof test === 'function') {
      it(name, () => test(setup()))
    } else {
      describe(name, () => runTests(test))
    }
  }
}

// Run the tests!
runTests(tests)