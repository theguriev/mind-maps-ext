<template>
  <div class="text-tool-bar">
    <a-tooltip>
      <template slot="title">
        Bold - <b>⌘ B</b>
      </template>
      <button @click="$emit('bold')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M314.52 238.78A119.76 119.76 0 0 0 232 32H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16v352H48a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h208a128 128 0 0 0 128-128c0-49.49-28.38-91.92-69.48-113.22zM128 80h88a72 72 0 0 1 0 144h-88zm112 352H128V272h112a80 80 0 0 1 0 160z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Italic - <b>⌘ I</b>
      </template>
      <button @click="$emit('italic')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M320 48v16a16 16 0 0 1-16 16h-67l-88 352h59a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h67l88-352h-59a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Strikethrough - <b>⌘ Shift X</b>
      </template>
      <button @click="$emit('strikethrough')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M150.39 208h113.17l-46.31-23.16a45.65 45.65 0 0 1 0-81.68A67.93 67.93 0 0 1 247.56 96H310a45.59 45.59 0 0 1 36.49 18.25l15.09 20.13a16 16 0 0 0 22.4 3.21l25.62-19.19a16 16 0 0 0 3.21-22.4L397.7 75.84A109.44 109.44 0 0 0 310.1 32h-62.54a132.49 132.49 0 0 0-58.94 13.91c-40.35 20.17-64.19 62.31-60.18 108 1.76 20.09 10.02 38.37 21.95 54.09zM496 240H16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h480a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm-92.5 80h-91.07l14.32 7.16a45.65 45.65 0 0 1 0 81.68 67.93 67.93 0 0 1-30.31 7.16H234a45.59 45.59 0 0 1-36.49-18.25l-15.09-20.13a16 16 0 0 0-22.4-3.21L134.4 393.6a16 16 0 0 0-3.21 22.4l15.11 20.17A109.44 109.44 0 0 0 233.9 480h62.54a132.42 132.42 0 0 0 58.93-13.91c40.36-20.17 64.2-62.31 60.19-108-1.19-13.69-5.89-26.27-12.06-38.09z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Code - <b>⌘ Shift C</b>
      </template>
      <button @click="$emit('code')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Link - <b>⌘ Shift U</b>
      </template>
      <button @click="$emit('link')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M314.222 197.78c51.091 51.091 54.377 132.287 9.75 187.16-6.242 7.73-2.784 3.865-84.94 86.02-54.696 54.696-143.266 54.745-197.99 0-54.711-54.69-54.734-143.255 0-197.99 32.773-32.773 51.835-51.899 63.409-63.457 7.463-7.452 20.331-2.354 20.486 8.192a173.31 173.31 0 0 0 4.746 37.828c.966 4.029-.272 8.269-3.202 11.198L80.632 312.57c-32.755 32.775-32.887 85.892 0 118.8 32.775 32.755 85.892 32.887 118.8 0l75.19-75.2c32.718-32.725 32.777-86.013 0-118.79a83.722 83.722 0 0 0-22.814-16.229c-4.623-2.233-7.182-7.25-6.561-12.346 1.356-11.122 6.296-21.885 14.815-30.405l4.375-4.375c3.625-3.626 9.177-4.594 13.76-2.294 12.999 6.524 25.187 15.211 36.025 26.049zM470.958 41.04c-54.724-54.745-143.294-54.696-197.99 0-82.156 82.156-78.698 78.29-84.94 86.02-44.627 54.873-41.341 136.069 9.75 187.16 10.838 10.838 23.026 19.525 36.025 26.049 4.582 2.3 10.134 1.331 13.76-2.294l4.375-4.375c8.52-8.519 13.459-19.283 14.815-30.405.621-5.096-1.938-10.113-6.561-12.346a83.706 83.706 0 0 1-22.814-16.229c-32.777-32.777-32.718-86.065 0-118.79l75.19-75.2c32.908-32.887 86.025-32.755 118.8 0 32.887 32.908 32.755 86.025 0 118.8l-45.848 45.84c-2.93 2.929-4.168 7.169-3.202 11.198a173.31 173.31 0 0 1 4.746 37.828c.155 10.546 13.023 15.644 20.486 8.192 11.574-11.558 30.636-30.684 63.409-63.457 54.733-54.735 54.71-143.3-.001-197.991z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Ordered list - <b>⌘ Shift 7</b>
      </template>
      <button @click="$emit('orderedList')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M61.77 401l17.5-20.15a19.92 19.92 0 0 0 5.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h22.84a154.82 154.82 0 0 0-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.3 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 0 1-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.73 6.13-3.2 11.72 2.62 15.94 7.71 4.69 20.39 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 392H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM16 160h64a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H64V40a8 8 0 0 0-8-8H32a8 8 0 0 0-7.14 4.42l-8 16A8 8 0 0 0 24 64h8v64H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm-3.9 160H80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H41.33c3.28-10.29 48.33-18.68 48.33-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.45 18.75-4.38 5.59-3 10.84 2.79 15.37l8.58 6.88c5.61 4.56 11 2.47 16.13-2.44a13.4 13.4 0 0 1 9.45-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.1 320z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Bulleted list - <b>⌘ Shift 8</b>
      </template>
      <button @click="$emit('bulletedList')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 368a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 24H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z"/></svg>
      </button>
    </a-tooltip>
    <a-tooltip>
      <template slot="title">
        Blockquote - <b>⌘ Shift 9</b>
      </template>
      <button @click="$emit('blockquote')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M504 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8c-101.5 0-184 82.5-184 184v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H376c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112zM200 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8C82.5 32 0 114.5 0 216v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H72c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112z"/></svg>
      </button>
    </a-tooltip>
  </div>
</template>

<script>
import { chain } from 'lodash'
import { onUnmounted } from '@vue/composition-api'
import useEvent from '@/composables/useEvent'
import iif from '@/utils/iif'
export default {
  name: 'TextToolBar',
  setup (_, { emit }) {
    function shortcuts (event) {
      const dictionary = [
        // Bold - ⌘ B
        [event.metaKey === true && event.code === 'KeyB', () => emit('bold')],
        // Italic - ⌘ I
        [event.metaKey === true && event.code === 'KeyI', () => emit('italic')],
        // Strikethrough - ⌘ Shift X
        [event.metaKey === true && event.shiftKey === true && event.code === 'KeyX', () => emit('strikethrough')],
        // Code - ⌘ Shift C
        [event.metaKey === true && event.shiftKey === true && event.code === 'KeyC', () => emit('code')],
        // Link - ⌘ Shift U
        [event.metaKey === true && event.shiftKey === true && event.code === 'KeyU', () => emit('link')],
        // Ordered list - ⌘ Shift 7
        [event.metaKey === true && event.shiftKey === true && event.code === 'Digit7', () => emit('orderedList')],
        // Bulleted list - ⌘ Shift 8
        [event.metaKey === true && event.shiftKey === true && event.code === 'Digit8', () => emit('bulletedList')],
        // Blockquote - ⌘ Shift 9
        [event.metaKey === true && event.shiftKey === true && event.code === 'Digit9', () => emit('blockquote')]
      ]

      chain(dictionary)
        .filter(([bl]) => bl)
        .thru(
          iif(
            arr => arr.length > 0,
            arr => arr[0][1]()
          )
        )
        .value()
    }

    useEvent(window, 'keydown', shortcuts)

    onUnmounted(
      () => {
        // Temporary fix before next vue composition api release
        window.removeEventListener('keydown', shortcuts)
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
b{
  font-weight: bold;
}
.text-tool-bar{
  position: absolute;
  top: 2px;
  left: 2px;

  button{
    width: 36px;
    height: 36px;
    line-height: 36px;
    border: none;
    font-size: 22px;
    border-radius: 4px;
    cursor: pointer;
    background: var(--white);
    padding: 2px 10px;
    opacity: .5;
    transition: all .2s;

    svg{
      height: 16px;
    }

    &:hover{
      opacity: 1;
    }
  }
}
</style>
