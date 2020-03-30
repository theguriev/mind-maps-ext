import { ref } from '@vue/composition-api'

export default function ({ visibilityArea, offsetX, offsetY, node, scale, zoomArea }, emit) {
  const x = ref(0)
  const y = ref(0)
  const paning = ref(false)

  function startPan (event) {
    paning.value = true
    x.value = event.clientX - visibilityArea.value.getBoundingClientRect().x
    y.value = event.clientY - visibilityArea.value.getBoundingClientRect().y
    x.value -= offsetX.value
    y.value -= offsetY.value
  }

  function pan (event) {
    if (paning.value === true) {
      offsetX.value = event.clientX - visibilityArea.value.getBoundingClientRect().x - x.value
      offsetY.value = event.clientY - visibilityArea.value.getBoundingClientRect().y - y.value
    }
    if (node.value) {
      emit(
        'updateNodePosition',
        {
          ...node.value,
          x: (event.clientX - zoomArea.value.getBoundingClientRect().x) / scale.value - node.value.offsetX,
          y: (event.clientY - zoomArea.value.getBoundingClientRect().y) / scale.value - node.value.offsetY
        }
      )
    }
  }

  function endPan () {
    paning.value = false
    emit('mouseup')
  }

  return {
    startPan,
    pan,
    endPan,
    offsetX,
    offsetY,
    paning,
    visibilityArea
  }
}
