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

const createProxy = (styles = '', which?: string): ColoredProxy =>
  new Proxy(
    // @ts-ignore
    (...args: any[]) => {
      if (!args.length && !styles) return

      let out = [styles],
        base = '%c',
        wasPadded = styles.match(/pad|dec/),
        isPadded: any

      for (let a of args) {
        a?.zq && (a = a())
        if (a?.[0]?.startsWith?.('%c')) {
          isPadded = a[1].match(/pad|dec/)
          wasPadded && (base = base.slice(0, -1))
          wasPadded && !isPadded && (base += '%c ', out.push(''))
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
          (value: string) =>
            createProxy(styles + (type ? `${type}:${value}` : value) + ';', which)

        return prop == 'color' ? add(prop)
          : prop == 'bold' ? add('font-weight')(prop)
          : prop == 'italic' ? add('font-style')(prop)
          : prop == 'underline' ? add('text-decoration')(prop)
          : prop == 'strike' ? add('text-decoration')('line-through')
          : prop == 'font' ? add('font-family')
          : prop == 'size' ? add('font-size')
          : prop == 'bg' ? add('background')
          : prop == 'radius' ? add('border-radius')
          : prop == 'padding' || prop == 'border' ? add(prop)
          : prop == 'style' ? add('')
          : prop == 'log' || prop == 'warn' || prop == 'error' ? createProxy(styles, prop)
          : add('color')(prop)
      },
    }
  ) as ColoredProxy

// @ts-ignore
export const chroma: ColoredProxy = createProxy()