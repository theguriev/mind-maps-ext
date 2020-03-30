<template>
  <svg
    :viewBox="`${x} ${y} ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @mousemove="$emit('mousemove', $event)"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'SvgBox',
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 5000
    },
    height: {
      type: Number,
      default: 5000
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
svg{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

path{
  stroke: black;
  stroke-width: 9;
}
</style>
