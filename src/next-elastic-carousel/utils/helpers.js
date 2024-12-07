export const noop = () => {}

export const numberToArray = (n) => [...Array(n).keys()]

export const cssPrefix = (...classNames) => {
  const prefix = 'rec'
  let result = `${prefix}` // initial it with global prefix;

  // in case of an array we add the class prefix per item;
  const chainedClasses = classNames.reduce((acc, current) => {
    if (current) {
      acc += ` ${prefix}-${current}` // we must keep spaces between class names
    }
    return acc
  }, '')
  result += chainedClasses

  return result
}

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)
