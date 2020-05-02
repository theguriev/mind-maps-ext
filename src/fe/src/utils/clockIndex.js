export const RIGHT_SIDE = 1
export const LEFT_SIDE = -1
export const UP_SIDE = 10
export const DOWN_SIDE = -10
export const HAVHE_CHILDREN = 100
export const NO_CHILDREN = -100

/**
 * Calculating clock index. This is to prevent use to much Switch cases or if's.
 *
 * 11 = Right side up.
 * 9 = Left side up.
 * -9 = Rigth side down.
 * -11 = Left side down.
 *
 * @param {Object} node Object with isRightSide and isUpSide.
 * @returns {Number} 11 || 9 || -9 || -11
 */
export function clockIndex ({ isRightSide, isUpSide }) {
  const leftRight = isRightSide ? RIGHT_SIDE : LEFT_SIDE
  const upDown = isUpSide ? UP_SIDE : DOWN_SIDE

  return leftRight + upDown
}

/**
 * Calculating clock index with children. This is to prevent use to much Switch cases or if's.
 *
 * left | up | have children    --- 11 = Right side up.
 * -1 + 10 + 100 = 109
 *
 * left | down | have children  --- -9 = Rigth side down.
 * -1 + -10 + 100 = 89
 *
 * left | up | no children      --- -11 = Left side down.
 * -1 + 10 + -100 = -91
 *
 * left | down | no children    --- -11 = Left side down.
 * -1 + -10 + -100 = -111
 *
 * right | up | have children   --- 9 = Left side up.
 * 1 + 10 + 100 = 111
 *
 * right | down | have children --- -11 = Left side down.
 * 1 + -10 + 100 = 91
 *
 * right | up | no children     --- -9 = Rigth side down.
 * 1 + 10 + -100 = -89
 *
 * right | down | no children   --- -9 = Rigth side down.
 * 1 + -10 + -100 = -109
 *
 * @param {Object} Node Node to count index.
 * @returns {Number} 11 || 9 || -9 || -11
 */
export function clockIndexWithChildren ({ isRightSide, isUpSide, isHaveChildren, component }) {
  if (component === 'root') {
    return -9
  }
  const leftRight = isRightSide ? RIGHT_SIDE : LEFT_SIDE
  const upDown = isUpSide ? UP_SIDE : DOWN_SIDE
  const haveNo = isHaveChildren ? HAVHE_CHILDREN : NO_CHILDREN
  const clock = new Map([
    [109, 11],
    [89, -9],
    [-91, -11],
    [-111, -11],
    [111, 9],
    [91, -11],
    [-89, -9],
    [-109, -9]
  ])
  return clock.get(leftRight + upDown + haveNo)
}
