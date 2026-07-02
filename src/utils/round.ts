export function round (number: number, decimal = 2) {
  const factor = Math.pow(10, decimal)
  return Math.round(number * factor) / factor
}
