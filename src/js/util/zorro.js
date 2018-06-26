export const deg2rad = (deg) => deg * (Math.PI / 180)

/**
 * @function
 *
 * @desc Rounds a number to given decimal places.
 *
 * @param {number} number - Number to round
 * @param {number} decimals=2 - Decimal places
 * @returns {number} Rounded number
 */
export const round = (number, decimals = 2) => Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)

/**
 * @function
 *
 * @desc Returns a random value between two numbers, min and max value included.
 *
 * @param {number} min=0
 * @param {number} max=100
 * @param {number} decimals=0
 * @returns {number} Random value
 */
export const random = (min = 0, max = 100, decimals = 0) => Math.min(Math.floor(((((max + 1) - min) * Math.random()) + min) * Math.pow(10, decimals)) / Math.pow(10, decimals), max)

/**
 * @function
 *
 * @desc Returns first element in array which matches the given condition.
 *
 * @param {array} list
 * @param {function} predicate
 * @param {number} [index]
 * @returns {any}
 */
export const find = (list, predicate, index = 0) => {
  const isDone = index >= list.length

  return isDone
    ? undefined
    : predicate(list[index]) ? list[index] : find(list, predicate, ++index)
}

/**
 * @function
 *
 * @desc Returns index of element in array which matches the given condition.
 *
 * @param {array} list
 * @param {function} predicate
 * @param {number} [index]
 * @returns {number}
 */
export const findPos = (list, predicate, index = 0) => {
  const isDone = index >= list.length

  return isDone
    ? -1
    : predicate(list[index]) ? index : findPos(list, predicate, ++index)
}

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let tmp = arr[i]

    arr[i] = arr[j]
    arr[j] = tmp
  }

  return arr
}

export const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)

window.r = random
