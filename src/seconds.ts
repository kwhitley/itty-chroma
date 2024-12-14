import { ms } from './ms'

export const seconds = (duration: string | number): number =>
  ms(duration) / 1000
