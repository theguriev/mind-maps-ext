<template>
  <path
    :id="id"
    :d="`M ${x} ${y} C ${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`"
    :stroke-width="strokeWidth"
    :stroke="stroke"
  />
</template>

<script>
export default {
  name: 'SvgPath',
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
    strokeWidth: {
      type: Number,
      default: 9
    },
    stroke: {
      type: String,
      default: 'black'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
