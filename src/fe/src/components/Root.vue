<template>
  <div
    class="root pt1 pb1 pl2 pr2"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mouseup.stop="$emit('mouseup', $event)"
    @mousedown.stop="$emit('mousedown', $event)"
  >
    <div
      class="plus"
      @click.prevent.stop="$emit('add', 0, 0)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"/>
      </svg>
    </div>
    <div
      class="node-text"
      contenteditable="true"
      @input="$emit('input', { id: 0, event: $event })"
    >{{ text }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'Root',
  props: {
    name: {
      type: String,
      default: ''
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const text = ref(props.name)

    return {
      text
    }
  }
}
</script>

<style scoped lang="scss">
.root{
  position: absolute;
  border-radius: var(--radius);
  border: 1px solid var(--black);
  transform: translate(-50%, -50%);
  background: var(--white);
  white-space: nowrap;

  &:hover{
    .plus{
      display: flex
    }
  }

  .plus{
    position: absolute;
    display: none;
    left: 50%;
    bottom: -10px;
    margin-left: -10px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid;
    border-color: var(--black);
    box-sizing: border-box;
    background: var(--white);
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover{
      border-color: var(--primary);

      svg{
        fill: var(--primary);
      }
    }

    svg{
      width: 14px;
      height: 14px;
    }
  }
}
</style>
