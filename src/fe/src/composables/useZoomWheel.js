import { ref } from '@vue/composition-api'
import useEvent from '@/composables/useEvent'
import isWheelUp from '@/utils/isWheelUp'

export default function (visibilityArea, maxZoom = 10, zoomStep = 0.05, minZoom = 0.25) {
  const scale = ref(1)
  const cursorX = ref(0)
  const cursorY = ref(0)
  const offsetX = ref(0)
  const offsetY = ref(0)

  function increase () {
    const newScale = scale.value + scale.value * zoomStep
    if (maxZoom > newScale) {
      offsetX.value = cursorX.value * zoomStep * -1 + (offsetX.value * (zoomStep + 1))
      offsetY.value = cursorY.value * zoomStep * -1 + (offsetY.value * (zoomStep + 1))
      scale.value = newScale
    }
  }

  function decrease () {
    const newScale = scale.value - scale.value * zoomStep
    if (minZoom < newScale) {
      offsetX.value = cursorX.value - cursorX.value * (1 - zoomStep) + (offsetX.value * (1 - zoomStep))
      offsetY.value = cursorY.value - cursorY.value * (1 - zoomStep) + (offsetY.value * (1 - zoomStep))
      scale.value -= scale.value * zoomStep
    }
  }

  function wheel (event) {
    if (event.ctrlKey) {
      const actionsMap = new Map([
        [1, increase],
        [-1, decrease],
        [0, () => {}]
      ])
      cursorX.value = event.clientX - visibilityArea.value.getBoundingClientRect().x
      cursorY.value = event.clientY - visibilityArea.value.getBoundingClientRect().y
      actionsMap.get(isWheelUp(event))()
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const removeWheelListener = useEvent(visibilityArea, 'wheel', wheel, { passive: false })

  return {
    scale,
    cursorX,
    cursorY,
    offsetX,
    offsetY,
    removeWheelListener
  }
}
