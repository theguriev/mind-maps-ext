import { watch } from '@vue/composition-api'
import wrapRef from '@/utils/wrapRef'

export default function (el, name, listener, options) {
  const element = wrapRef(el)

  watch(
    element,
    (newVal, _oldVal, onCleanup) => {
      newVal && newVal.addEventListener(name, listener, options)

      onCleanup(() => newVal && newVal.removeEventListener(name, listener))
    }
  )
}
