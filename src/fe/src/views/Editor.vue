<template>
  <div class="editor">
    <modal-shortcuts v-model="visibleShortcuts" />
    <tool-bar>
      <template v-slot:left>
        <button
          @click="$router.push('/')"
          title="Back"
          class="bgl-toolbar-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>
        </button>
        <div class="divider"></div>
        <h1 v-if="list.get(0)" class="mr2 ml1">{{ list.get(0).name }}</h1>
      </template>
      <template v-slot:right>
        <button
          class="bgl-toolbar-button"
          @click="saveMap"
          title="Save ^S"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM288 64v96H96V64h192zm128 368c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h16v104c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24V64.491a15.888 15.888 0 0 1 7.432 4.195l83.882 83.882A15.895 15.895 0 0 1 416 163.882V432zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 144c-30.879 0-56-25.121-56-56s25.121-56 56-56 56 25.121 56 56-25.121 56-56 56z"/>
          </svg>
        </button>
        <a-dropdown :trigger="['click']">
          <button
            class="bgl-toolbar-button"
            title="Download"
            @click.prevent=""
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M348.5 264l-148 148.5c-4.7 4.7-12.3 4.7-17 0L35.5 264c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l115.4 116V44c0-6.6 5.4-12 12-12h10c6.6 0 12 5.4 12 12v311.9L324.4 240c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.6 4.7 12.2 0 16.9zM384 468v-8c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h360c6.6 0 12-5.4 12-12z"/>
            </svg>
          </button>
          <a-menu slot="overlay">
            <a-menu-item
              @click="saveJpeg"
              class="flex justify-between"
              key="0"
            >
              <div class="left">
                JPEG
              </div>
              <div class="right">
                ^⌥J
              </div>
            </a-menu-item>
            <a-menu-item
              @click="savePng"
              class="flex justify-between"
              key="1"
            >
              <div class="left">
                PNG
              </div>
              <div class="right">
                ^⌥P
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item
              @click="saveSvg"
              class="flex justify-between"
              key="3"
            >
              <div class="left">
                SVG
              </div>
              <div class="right">
                ^⌥S
              </div>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <button
          class="bgl-toolbar-button bgl-shortcut-button"
          @click="visibleShortcuts = true"
          title="Keyboard shortcuts ^⌥H"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.823-7.177 16-16 16H48c-8.823 0-16-7.177-16-16V112c0-8.823 7.177-16 16-16h480c8.823 0 16 7.177 16 16v288zM168 268v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-336 80v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm384 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zM120 188v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-96 152v-8c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"/>
          </svg>
        </button>
      </template>
    </tool-bar>
    <div
      class="content"
      ref="content"
    >
      <panno
        ref="panno"
        :pannedNode="pannedNode"
        :width="width"
        :height="height"
        :disablePan="resizingTextarea !== null"
        @mouseup="pannedNode = null"
        @updateNodePosition="updatePosition"
      >
        <template v-slot:svg>
          <node-arrow
            v-for="([id, p]) in paths.entries()"
            :key="p.id"
            :id="p.id"
            :x="p.x"
            :y="p.y"
            :x2="p.x2"
            :y2="p.y2"
            :x3="p.x3"
            :y3="p.y3"
            :x4="p.x4"
            :y4="p.y4"
            :isRightSide="p.isRightSide"
            :strokeWidth="p.strokeWidth"
            :stroke="p.stroke"
            @click.stop="pathClick(p, $event)"
          />
        </template>
        <template v-slot:content>
          <component
            v-for="([id, el]) in list.entries()"
            :key="el.id"
            :is="el.component"
            :metaPressing="metaPressing"
            :class="`component-${id}`"
            @add="add"
            @remove="remove"
            @mouseup="pannedNode = null"
            @mousedown="pannedNode = el"
            @input="input($event, el)"
            @edit="editNode(id, $event)"
            @startResize="resizingTextarea = $event"
            v-bind="el"
          />
        </template>
        <template v-slot:footer>
          <footer-logo />
        </template>
      </panno>
      <color
        v-if="colorVisible"
        :x="colorX"
        :y="colorY"
        @changeColor="updateBranch(colorVisible.fromID, { stroke: $event })"
      />
    </div>
  </div>
</template>

<script>
import { chain } from 'lodash'
import { ref } from '@vue/composition-api'
import ToolBar from '@/views/ToolBar'
import Panno from '@/components/Panno'
import Root from '@/components/Root'
import Node from '@/components/Node'
import FooterLogo from '@/components/FooterLogo'
import Color from '@/components/Color'
import useOnResize from '@/composables/useOnResize'
import useAdjacency from '@/composables/useAdjacency'
import useColor from '@/composables/useColor'
import Box from '@/components/svg/Box'
import ModalShortcuts from '@/components/ModalShortcuts'
import NodeArrow from '@/components/svg/NodeArrow'
import useEvent from '@/composables/useEvent'
import useDownload from '@/composables/useDownload'
import { one, save } from '@/utils/api/map'
import iif from '@/utils/iif'
import { clockIndexWithChildren } from '@/utils/clockIndex'

let beforeRouteData = null

export default {
  name: 'Editor',
  components: {
    ToolBar,
    Panno,
    Root,
    Node,
    Color,
    Box,
    NodeArrow,
    ModalShortcuts,
    FooterLogo
  },
  beforeRouteEnter (to, from, next) {
    one(to.params.id)
      .then(res => res.data)
      .then(
        res => {
          if (!res.id) {
            return next('/')
          }
          beforeRouteData = res
          return next()
        }
      )
  },
  setup (_, { root }) {
    const panno = ref(null)
    const content = ref(null)
    const metaPressing = ref(false)
    const pannedNode = ref(null)
    const visibleShortcuts = ref(false)
    const resizingTextarea = ref(null)
    const { width, height } = useOnResize(panno)

    const {
      adjacency,
      list,
      paths,
      add,
      updatePosition,
      update,
      updateBranch,
      remove
    } = useAdjacency(new Map(beforeRouteData.content))
    window.t = beforeRouteData
    const {
      x: colorX,
      y: colorY,
      visible: colorVisible,
      pathClick
    } = useColor()

    const {
      saveSvg,
      savePng,
      saveJpeg
    } = useDownload(panno)

    function nodeMouseDown (event, el) {
      pannedNode.value = {
        ...el,
        offsetX: event.clientX - panno.value.$el.getBoundingClientRect().x - el.x,
        offsetY: event.clientY - panno.value.$el.getBoundingClientRect().y - el.y
      }
    }

    function input ({ event }, el) {
      update({
        ...el,
        name: event.target.value
      })
    }

    function keydown (event) {
      if (event.metaKey === true) {
        metaPressing.value = true
      }
    }

    function keyup (event) {
      if (event.metaKey === false) {
        metaPressing.value = false
      }
    }

    function shortcuts (event) {
      const dictionary = [
        // Ctr + Alt + H
        [event.ctrlKey === true && event.altKey === true && event.code === 'KeyH', () => { visibleShortcuts.value = true }],
        // Ctr + Alt + J
        [event.ctrlKey === true && event.altKey === true && event.code === 'KeyJ', saveJpeg],
        // Ctr + Alt + P
        [event.ctrlKey === true && event.altKey === true && event.code === 'KeyP', savePng],
        // Ctr + Alt + S
        [event.ctrlKey === true && event.altKey === true && event.code === 'KeyS', saveSvg],
        // Ctr + S
        [event.ctrlKey === true && event.code === 'KeyS', saveMap],
        // Alt + Enter
        [event.altKey === true && event.code === 'Enter', () => closeEditings({ target: null })]
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

    function saveMap () {
      beforeRouteData.title = adjacency.value.get(0).name
      beforeRouteData.content = Array.from(adjacency.value.entries())
      save(beforeRouteData.id, beforeRouteData)
    }

    function editNode (editID, $event) {
      adjacency.value = chain(adjacency.value)
        .thru(Array.from)
        .map(
          ([id, node]) => ([
            id,
            {
              ...node,
              editing: id === editID
            }
          ])
        )
        .thru(entries => new Map(entries))
        .value()
    }

    function endResizing () {
      if (resizingTextarea.value !== null) {
        resizingTextarea.value = null
      }
    }

    function closeEditings (event) {
      const editing = chain(adjacency.value)
        .thru(Array.from)
        .filter(([id, node]) => node.editing === true)
        .thru(current => current.length > 0 ? current[0][0] : false)
        .value()

      // Click outside div element
      if (editing !== false && !document.querySelector(`.component-${editing}`).contains(event.target)) {
        adjacency.value = chain(adjacency.value)
          .thru(Array.from)
          .map(
            ([id, node]) => ([
              id,
              {
                ...node,
                editing: false
              }
            ])
          )
          .thru(entries => new Map(entries))
          .value()
      }
    }

    function getScale () {
      return chain(panno).get('value.scale', 1).value()
    }

    function resizeRightSideUp ({ x, y }, { left, bottom }) {
      return {
        width: (x - left) / getScale(),
        height: (bottom - y) / getScale()
      }
    }

    function resizeRightSideDown ({ x, y }, { left, top }) {
      return {
        width: (x - left) / getScale(),
        height: (y - top) / getScale()
      }
    }

    function resizeLeftSideUp ({ x, y }, { right, bottom }) {
      return {
        width: (right - x) / getScale(),
        height: (bottom - y) / getScale()
      }
    }

    function resizeLeftSideDown ({ x, y }, { right, top }) {
      return {
        width: (right - x) / getScale(),
        height: (y - top) / getScale()
      }
    }

    function resizerMove (event) {
      if (resizingTextarea.value !== null) {
        const node = adjacency.value.get(resizingTextarea.value.id)
        if (node) {
          const index = clockIndexWithChildren(node)
          const clock = new Map([
            [11, resizeRightSideUp], // 11 Right side up
            [9, resizeLeftSideUp], // 9 Left side up
            [-9, resizeRightSideDown], // -9 Rigth side down
            [-11, resizeLeftSideDown] // -11 Left side down
          ])
          update({
            ...node,
            ...clock.get(index)(event, resizingTextarea.value.textarea.getBoundingClientRect())
          })
        }
      }
    }

    useEvent(window, 'keydown', keydown)
    useEvent(window, 'keyup', keyup)
    useEvent(window, 'keypress', shortcuts)
    useEvent(window, 'mouseup', endResizing)
    useEvent(window, 'mouseleave', endResizing)
    useEvent(window, 'mousedown', closeEditings)
    useEvent(window, 'mousemove', resizerMove)

    return {
      input,
      width,
      height,
      adjacency,
      list,
      paths,
      panno,
      add,
      updatePosition,
      nodeMouseDown,
      pannedNode,
      colorX,
      colorY,
      colorVisible,
      pathClick,
      updateBranch,
      remove,
      metaPressing,
      visibleShortcuts,
      saveMap,
      content,
      saveSvg,
      savePng,
      saveJpeg,
      editNode,
      resizingTextarea
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
}
.bgl-toolbar-normal-button{
  padding: 0 20px;
}

.bgl-shortcut-button svg{
  position: relative;
  top: -2px;
}

.ant-dropdown-menu-item{
  min-width: 200px;

  .right{
    font-weight: bold;
  }
}
</style>
