<template>
  <g @click="$emit('click', $event)">
    <path
      :d="triangle"
      :fill="stroke"
      :transform="`translate(${x4}, ${y4})`"
      stroke="none"
    />
    <path
      :id="'p' + id"
      :d="`M ${x} ${y} C ${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`"
      :stroke-width="strokeWidth"
      :stroke="stroke"
    />
    <path
      :d="triangleWhite"
      :fill="stroke"
      :transform="`translate(${x}, ${y})`"
      stroke="#fff"
    />
  </g>
</template>

<script>
import { computed } from '@vue/composition-api'

function triangleD (width, isRightSide) {
  const half = width / 2
  const firstLine = `0 -${half}`
  const secondLine = isRightSide ? `${half} 0` : `-${half} 0`
  const thirdLine = `0 ${half}`

  return `M ${firstLine} ${secondLine} ${thirdLine}`
}

export default {
  name: 'NodeArrow',
  props: {
    id: {
      default: ''
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    x2: {
      type: Number,
      default: 0
    },
    y2: {
      type: Number,
      default: 0
    },
    x3: {
      type: Number,
      default: 0
    },
    y3: {
      type: Number,
      default: 0
    },
    x4: {
      type: Number,
      default: 0
    },
    y4: {
      type: Number,
      default: 0
    },
    isRightSide: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: 9
    },
    stroke: {
      type: String,
      default: 'black'
    }
  },
  setup (props) {
    const triangle = computed(() => triangleD(props.strokeWidth, props.isRightSide))
    const triangleWhite = computed(() => triangleD(props.strokeWidth + 1, !props.isRightSide))

    return {
      triangle,
      triangleWhite
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
g{
  cursor: pointer;
}
</style>
