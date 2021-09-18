
export * from './format'

export function randomInt(max = Number.MAX_SAFE_INTEGER - 1, min = 0) {
  return Math.floor(min + Math.random() * ((max + 1) - min))
}

