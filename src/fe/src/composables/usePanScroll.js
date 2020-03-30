import { identity } from 'lodash'
import useEvent from '@/composables/useEvent'
import isWheelUp from '@/utils/isWheelUp'
import isWheelRight from '@/utils/isWheelRight'

export default function ({ visibilityArea, offsetX, offsetY }) {
  function scroll (event) {
    const step = 10

    function up () {
      offsetY.value = offsetY.value - step
    }

    function down () {
      offsetY.value = offsetY.value + step
    }

    function left () {
      offsetX.value = offsetX.value - step
    }

    function right () {
      offsetX.value = offsetX.value + step
    }

    if (event.ctrlKey === false && event.altKey === false && event.shiftKey === false && event.metaKey === true) {
      const actionsMap = new Map([
        [1, up],
        [-1, down],
        [0, identity],
        [11, right],
        [9, left],
        [10, identity]
      ])

      actionsMap.get(isWheelUp(event))(event)
      actionsMap.get(10 + isWheelRight(event))(event)
      event.stopPropagation()
      event.preventDefault()
    }
  }

  useEvent(visibilityArea, 'wheel', scroll, { passive: false })
}
