import { ref } from '@vue/composition-api'
import useEvent from './useEvent'

export default function () {
  const visible = ref(null)
  const x = ref(0)
  const y = ref(0)

  function pathClick (path, event) {
    visible.value = path
    x.value = event.clientX
    y.value = event.clientY
  }

  function clickOutsideColor (event) {
    if (visible.value !== null) {
      visible.value = null
    }
  }

  useEvent(window, 'click', clickOutsideColor)

  return {
    visible,
    x,
    y,
    pathClick
  }
}
