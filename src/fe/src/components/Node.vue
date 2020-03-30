<template>
  <div
    class="node"
    :class="{
      isRightSide,
      isUpSide,
      isHaveChildren
    }"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mouseup.stop="$emit('mouseup', $event)"
    @mousedown.stop="$emit('mousedown', $event)"
  >
    <div class="triangle-point">
      <div
        class="circle-plus closed"
        :class="{ opened: metaPressing }"
        @click.prevent.stop="addOrRemove"
      >
        <div class="circle">
          <div class="horizontal"></div>
          <div class="vertical"></div>
        </div>
      </div>
    </div>
    <div
      class="node-text"
      contenteditable="true"
      @input="$emit('input', { id, event: $event })"
    >{{ text }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'Node',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
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
    },
    isRightSide: {
      type: Boolean,
      default: true
    },
    isUpSide: {
      type: Boolean,
      default: true
    },
    isHaveChildren: {
      type: Boolean,
      default: false
    },
    metaPressing: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const text = ref(props.name)

    function addOrRemove (event) {
      if (event.metaKey === true) {
        emit('remove', props.id)
      } else {
        add()
      }
    }
    function add () {
      const clockIndex = (props.isRightSide ? 1 : -1) + (props.isUpSide ? 10 : -10)
      const clock = new Map([
        [11, 0], // 11 Right side up
        [9, 7], // 9 Left side up
        [-9, 2], // -9 Rigth side down
        [-11, 5] // -11 Left side down
      ])

      emit('add', props.id, clock.get(clockIndex))
    }

    return {
      text,
      addOrRemove
    }
  }
}
</script>

<style scoped lang="scss">
.node{
  position: absolute;
  white-space: nowrap;

  .closed {
    .vertical {
      transition: all 0.5s ease-in-out;
      transform: rotate(-90deg);
    }
    .horizontal {
      transition: all 0.5s ease-in-out;
      transform: rotate(-90deg);
      opacity: 1;
    }
  }

  .opened {
    opacity: 1;
    .vertical {
      transition: all 0.5s ease-in-out;
      transform: rotate(90deg);
    }
    .horizontal {
      transition: all 0.5s ease-in-out;
      transform: rotate(90deg);
      opacity: 0;
    }
  }

  .circle-plus {
    position: absolute;
    display: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }

  &:hover{
    .circle-plus{
      display: block
    }
  }

  .circle-plus .circle {
    position: relative;
    background: var(--white);
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid;
  }
  .circle-plus .circle .horizontal {
    position: absolute;
    background-color: black;
    width: 12px;
    height: 2px;
    left: 50%;
    margin-left: -6px;
    top: 50%;
    margin-top: -1px;
  }
  .circle-plus .circle .vertical {
    position: absolute;
    background-color: black;
    width: 2px;
    height: 12px;
    left: 50%;
    margin-left: -1px;
    top: 50%;
    margin-top: -6px;
  }

  .plus{
    position: absolute;
    display: none;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid;
    border-color: var(--black);
    box-sizing: border-box;
    padding: 2px 0 0 2px;
    background: var(--white);
    cursor: pointer;
    transform: translate(-50%, -50%);

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

  &:hover{
    .plus{
      display: block
    }
  }

  .triangle-point{
    position: absolute;
  }

  .node-text{
    transform: translate(-100%, -50%);
    margin-left: -8px;
  }

  &.isHaveChildren .node-text{
    transform: translate(0, 0);
    margin-left: 0;
    margin-top: 8px
  }

  &.isUpSide.isHaveChildren .node-text{
    transform: translate(0, -100%);
    margin-top: -8px;
  }

  &.isRightSide .node-text{
    transform: translate(0%, -50%);
    margin-left: 8px;
  }

  &.isHaveChildren.isRightSide .node-text{
    transform: translate(-100%, 0);
    margin-left: 0;
    margin-top: 8px
  }

  &.isUpSide.isHaveChildren.isRightSide .node-text{
    transform: translate(-100%, -100%);
    margin-top: -8px;
  }
}
</style>
