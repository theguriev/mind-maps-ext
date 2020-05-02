<template>
  <div
    ref="visibilityArea"
    class="panno"
    @mousedown="startPan"
    @mousemove="panIfNotDisabled"
    @mouseup="endPan"
    @mouseleave="endPan"
  >
    <div
      class="panno-content"
      ref="zoomArea"
      :style="style"
    >
      <slot name="content" />
    </div>
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g :transform="`matrix(${scale}, 0.00, 0.00, ${scale}, ${offsetX}, ${offsetY})`">
        <slot name="svg" />
      </g>
    </svg>
    <slot name="footer" />
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import useZoomWheel from '@/composables/useZoomWheel'
import usePan from '@/composables/usePan'
import usePanScroll from '@/composables/usePanScroll'

export default {
  name: 'Panno',
  props: {
    pannedNode: {
      default: null
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    disablePan: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const visibilityArea = ref(null)
    const zoomArea = ref(null)
    const {
      scale,
      cursorX,
      cursorY,
      offsetX,
      offsetY
    } = useZoomWheel(visibilityArea)

    const node = computed(
      () => {
        if (props.pannedNode) {
          return {
            ...props.pannedNode,
            offsetX: ((event.clientX - zoomArea.value.getBoundingClientRect().x) / scale.value) - props.pannedNode.x,
            offsetY: ((event.clientY - zoomArea.value.getBoundingClientRect().y) / scale.value) - props.pannedNode.y
          }
        }
        return props.pannedNode
      }
    )

    const {
      startPan,
      pan,
      endPan,
      paning
    } = usePan({ visibilityArea, offsetX, offsetY, node, scale, zoomArea }, emit)

    const panIfNotDisabled = computed(() => props.disablePan ? () => {} : pan)

    const style = computed(() => ({
      transformOrigin: '0 0 0',
      transform: `matrix(${scale.value}, 0.00, 0.00, ${scale.value}, ${offsetX.value}, ${offsetY.value})`
    }))

    usePanScroll({ visibilityArea, offsetX, offsetY })

    return {
      scale,
      cursorX,
      cursorY,
      startPan,
      pan,
      endPan,
      paning,
      offsetX,
      offsetY,
      style,
      node,
      visibilityArea,
      zoomArea,
      panIfNotDisabled
    }
  }
}
</script>

<style scoped lang="scss">
.panno{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  background: white;

  svg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    g{
      transform-origin: 0 0 0;
    }
  }
}
</style>
