<template>
  <div
    class="root"
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
    <div
      class="plus"
      v-if="!editing"
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
      class="node-text pt1 pb1 pl2 pr2"
      :class="{ editing }"
      @dblclick="startEditing"
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
import useMarkdownToolbar from '@/composables/useMarkdownToolbar'
import TextToolBar from '@/components/TextToolBar'

export default {
  name: 'Root',
  components: {
    TextToolBar
  },
  props: {
    name: {
      type: String,
      default: ''
    },
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
        return text.value !== '' ? marked(text.value) : marked('🖱Double click to edit')
      }
    )

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

    return {
      editorEl,
      text,
      input,
      textCompiled,
      textarea,
      startEditing,
      mouseDown,
      mouseUp,
      ...useMarkdownToolbar(textarea)
    }
  }
}
</script>

<style scoped lang="scss">
.root{
  position: absolute;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  z-index: 1;

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

  .node-text{
    user-select: none;
    border-radius: var(--radius);
    border: 1px solid var(--black);
    background: var(--white);

    &.editing{
      opacity: 0;
    }
  }

  .node-text-editor{
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

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
      bottom: 0;
      right: 0;
      cursor: se-resize;

      &:after{
        content: '';
        width: 2px;
        background: var(--black);
        height: 10px;
        display: block;
        position: absolute;
        transform: rotate(45deg);
        bottom: 2px;
        right: 6px;
      }

      &:before{
        content: '';
        width: 2px;
        background: var(--black);
        height: 5px;
        display: block;
        position: absolute;
        transform: rotate(45deg);
        bottom: 2px;
        right: 4px;
      }
    }
  }
}
</style>
