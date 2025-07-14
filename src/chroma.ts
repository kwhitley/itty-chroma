type StyleFunction<T = string> = (value: T) => ColoredProxy

type OutputFunction = (...args: Array<any>) => Array<any>

type StyleMethods = {
  bold: ColoredProxy
  italic: ColoredProxy
  underline: ColoredProxy
  strikethrough: ColoredProxy
  font: StyleFunction
  size: StyleFunction
  bg: StyleFunction
  radius: StyleFunction
  color: StyleFunction
  padding: StyleFunction
  border: StyleFunction
  style: StyleFunction
  log: ColoredProxy
  warn: ColoredProxy
  error: ColoredProxy
}

type ColoredProxy = {
  [key: string]: ColoredProxy // Allows dynamic colors or methods like "red", "green", etc.
} & StyleMethods & OutputFunction

const createProxy = (styles: string = '', which?: string): ColoredProxy => {
  return new Proxy(
    // @ts-ignore
    (...args: any[]) => {
      if (args.length === 0 && !styles) return undefined
      
      let out = [styles]
      let base = '%c'
      let wasPadded: any = styles.match(/pad|dec/)
      let isPadded: any

      for (let a of args) {
        if (a?.zq) a = a() // any chroma functions should be executed first
        if (a?.[0]?.startsWith?.('%c')) {
          isPadded = a[1].match(/pad|dec/)
          if (wasPadded) {
            base = base.slice(0, -1)
          }
          if (wasPadded && !isPadded) {
            base += '%c '
            out.push('')
          }
          base += a[0]
          out.push(...a.slice(1))
          wasPadded = isPadded
        } else {
          base += typeof a == 'object' ? '%o ' : '%s '
          out.push(a)
        }
      }

      return which
      // @ts-ignore
      ? console[which](base.trim(), ...out)
      : [base, ...out]
    },
    {
      get(_, prop: string) {
        const add = (type: string) =>
          (value: string) => {
            const newStyles = styles + (type ? `${type}:${value}` : value) + ';'
            return createProxy(newStyles, which)
          }

        if (prop == 'color') return add(prop)
        if (prop == 'bold') return add('font-weight')(prop)
        if (prop == 'italic') return add('font-style')(prop)
        if (prop == 'underline') return add('text-decoration')(prop)
        if (prop == 'strike') return add('text-decoration')('line-through')
        if (prop == 'font') return add('font-family')
        if (prop == 'size') return add('font-size')
        if (prop == 'bg') return add('background')
        if (prop == 'radius') return add('border-radius')
        if (prop == 'padding') return add(prop)
        if (prop == 'border') return add(prop)
        if (prop == 'style') return add('')   
        if (prop == 'log') return createProxy(styles, prop)
        if (prop == 'warn') return createProxy(styles, prop)
        if (prop == 'error') return createProxy(styles, prop)

        return add('color')(prop)
      },
    }
  ) as ColoredProxy
}

// @ts-ignore
export const chroma: ColoredProxy = createProxy()