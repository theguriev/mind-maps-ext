import { debounce } from 'lodash'
import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import wrapRef from '@/utils/wrapRef'

function getUpdater (el, width, height) {
  if (el !== window) {
    const elRef = wrapRef(el)
    const dom = elRef.value.$el instanceof HTMLElement ? elRef.value.$el : elRef.value

    return function () {
      width.value = dom.offsetWidth
      height.value = dom.offsetHeight
    }
  }
  return function () {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
}

export default function (el = window, options, wait = 0) {
  const width = ref(0)
  const height = ref(0)
  const remove = ref(() => {})
  const handler = ref(() => {})

  onMounted(() => {
    const update = getUpdater(el, width, height)
    handler.value = wait > 0 ? debounce(update, wait) : update
    window.addEventListener('resize', handler.value, options || { passive: true })
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handler.value)
  })

  return {
    height,
    width,
    remove
  }
}
