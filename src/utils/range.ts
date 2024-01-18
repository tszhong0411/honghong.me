const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, k) => k + start)

export default range
