import { isRef, ref } from '@vue/composition-api'

export default function (el) {
  return isRef(el) ? el : ref(el)
}
