<template>
  <div
    class="node"
    :class="{
      isRightSide,
      isLeftSide: !isRightSide,
      isUpSide,
      isDownSide: !isUpSide,
      isHaveChildren,
      isHaveNoChildren: !isHaveChildren,
      editing
    }"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mouseup="mouseUp"
    @mousedown="mouseDown"
    ref="editorEl"
  >
    <div
      v-if="editing"
      class="node-text-editor"
    >
      <text-tool-bar
        @bold="bold"
        @italic="italic"
        @strikethrough="strikethrough"
        @code="code"
        @link="link"
        @orderedList="orderedList"
        @bulletedList="bulletedList"
        @blockquote="blockquote"
      />
      <textarea
        class="node-editor"
        type="text"
        rows="1"
        ref="textarea"
        :value="text"
        @input="input"
        @click.stop=""
        :style="{
          width: width + 'px',
          height: height + 'px'
        }"
      />
      <div
        class="resizer"
        @mousedown="$emit('startResize', { id, textarea })"
      ></div>
    </div>
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
      @dblclick="startEditing"
      v-if="!editing"
    >
      <div
        class="node-text-value markdown-body"
        :class="{ placeholderText: text === '' }"
        v-html="textCompiled"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import marked from 'marked'
import { clockIndex } from '@/utils/clockIndex'
import TextToolBar from '@/components/TextToolBar'
import useMarkdownToolbar from '@/composables/useMarkdownToolbar'

export default {
  name: 'Node',
  components: {
    TextToolBar
  },
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
    },
    editing: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const text = ref(props.name)
    const editorEl = ref(null)
    const textarea = ref(null)
    const textCompiled = computed(
      () => {
        return text.value !== '' ? marked(text.value) : marked('🖱Double click to edit that')
      }
    )

    function addOrRemove (event) {
      if (event.metaKey === true) {
        emit('remove', props.id)
      } else {
        add()
      }
    }

    function add () {
      const clock = new Map([
        [11, 0], // 11 Right side up
        [9, 7], // 9 Left side up
        [-9, 2], // -9 Rigth side down
        [-11, 5] // -11 Left side down
      ])

      emit('add', props.id, clock.get(clockIndex(props)))
    }

    function mouseDown ($event) {
      if (props.editing === false) {
        emit('mousedown', $event)
      }
      $event.stopPropagation()
    }

    function mouseUp ($event) {
      if (props.editing === false) {
        emit('mouseup', $event)
        $event.stopPropagation()
      }
    }

    function input (event) {
      emit(
        'input',
        {
          id: props.id,
          event: event
        }
      )
      text.value = event.target.value
    }

    function startEditing () {
      emit('edit', editorEl)
      setTimeout(
        function () {
          textarea.value.focus()
        },
        0
      )
    }

    return {
      text,
      addOrRemove,
      mouseDown,
      mouseUp,
      editorEl,
      input,
      textCompiled,
      textarea,
      startEditing,
      ...useMarkdownToolbar(textarea)
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
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &:hover:not(.editing){
    .circle-plus{
      opacity: 1;
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

  .node-text-editor{
    position: absolute;
    z-index: 1;

    textarea {
      border: 2px solid;
      border-radius: var(--radius);
      background: var(--white);
      padding: 40px 10px 10px 10px;
      width: calc(100% + 16px);
      min-height: 74px;
      min-width: 300px;
      resize: none;
      line-height: 150%;
    }

    .resizer{
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;

      &:after{
        content: '';
        width: 2px;
        background: var(--black);
        height: 10px;
        display: block;
        position: absolute;
      }

      &:before{
        content: '';
        width: 2px;
        background: var(--black);
        height: 5px;
        display: block;
        position: absolute;
      }
    }
  }

  &.isLeftSide.isHaveNoChildren .node-text-editor{
    transform: translate(-100%, -50%);
    margin-left: 8px;

    .resizer{
      bottom: 0;
      left: 0;
      cursor: sw-resize;

      &:after{
        transform: rotate(-45deg);
        bottom: 2px;
        left: 6px;
      }

      &:before{
        transform: rotate(-45deg);
        bottom: 2px;
        left: 4px;
      }
    }
  }

  &.isLeftSide.isHaveChildren.isUpSide .node-text-editor{
    transform: translate(0, -100%);
    margin-left: -8px;
    margin-top: -4px;

    .resizer{
      top: 0;
      right: 0;
      cursor: ne-resize;

      &:after{
        transform: rotate(-45deg);
        top: 2px;
        right: 6px;
      }

      &:before{
        transform: rotate(-45deg);
        top: 2px;
        right: 4px;
      }
    }
  }

  &.isLeftSide.isHaveChildren.isDownSide .node-text-editor{
    margin-top: 4px;
    margin-left: -8px;

    .resizer{
      bottom: 0;
      right: 0;
      cursor: se-resize;

      &:after{
        transform: rotate(45deg);
        bottom: 2px;
        right: 6px;
      }

      &:before{
        transform: rotate(45deg);
        bottom: 2px;
        right: 4px;
      }
    }
  }

  /* right side */
  &.isRightSide.isHaveNoChildren .node-text-editor{
    transform: translate(0, -50%);
    margin-left: 0;

    .resizer{
      bottom: 0;
      right: 0;
      cursor: se-resize;

      &:after{
        transform: rotate(45deg);
        bottom: 2px;
        right: 6px;
      }

      &:before{
        transform: rotate(45deg);
        bottom: 2px;
        right: 4px;
      }
    }
  }

  &.isRightSide.isHaveChildren.isUpSide .node-text-editor{
    transform: translate(-100%, -100%);
    margin-left: 17px;
    margin-top: -4px;

    .resizer{
      top: 0;
      left: 0;
      cursor: nw-resize;

      &:after{
        transform: rotate(45deg);
        top: 2px;
        left: 6px;
      }

      &:before{
        transform: rotate(45deg);
        top: 2px;
        left: 4px;
      }
    }
  }

  &.isRightSide.isHaveChildren.isDownSide .node-text-editor{
    transform: translate(-100%, 0);
    margin-top: 4px;
    margin-left: 16px;

    .resizer{
      bottom: 0;
      left: 0;
      cursor: sw-resize;

      &:after{
        transform: rotate(-45deg);
        bottom: 2px;
        left: 6px;
      }

      &:before{
        transform: rotate(-45deg);
        bottom: 2px;
        left: 4px;
      }
    }
  }

  .node-text{
    transform: translate(-100%, -50%);
    margin-left: -8px;
    position: absolute;
    user-select: none;
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

  .node-text .placeholderText{
    opacity: .8;
  }
}
</style>
