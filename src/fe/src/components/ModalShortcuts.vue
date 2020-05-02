<template>
  <a-modal
    title="Keyboard shortcuts ^⌥H"
    :visible="visibleModal"
    :footer="null"
    @change="$emit('input', $event)"
  >
    <h3>Global</h3>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Save</div>
      <div class="right">
        <a-tag title="Control">^</a-tag>
        <a-tag>S</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Close editing</div>
      <div class="right">
        <a-tag title="Control">⌥</a-tag>
        <a-tag>Enter</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Keyboard shortcuts</div>
      <div class="right">
        <a-tag title="Control">^</a-tag>
        <a-tag>⌥</a-tag>
        <a-tag>H</a-tag>
      </div>
    </div>
    <h3 class="mt3">Zoom</h3>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Zoom in</div>
      <div class="right">
        <a-tag title="Control">^</a-tag>
        <a-tag>Wheel up</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Zoom out</div>
      <div class="right">
        <a-tag title="Control">^</a-tag>
        <a-tag>Wheel down</a-tag>
      </div>
    </div>
    <a-divider />

    <h3 class="mt3">Branch controls</h3>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Remove branch</div>
      <div class="right">
        <a-tag title="Command or Super ( Windows )">⌘</a-tag>
        <a-tag>Click ( on plus button )</a-tag>
      </div>
    </div>
    <a-divider />

    <h3 class="mt3">Pan</h3>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Pan up</div>
      <div class="right">
        <a-tag title="Command or Super ( Windows )">⌘</a-tag>
        <a-tag>Wheel up</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Pan down</div>
      <div class="right">
        <a-tag title="Command or Super ( Windows )">⌘</a-tag>
        <a-tag>Wheel down</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Pan left</div>
      <div class="right">
        <a-tag title="Command or Super ( Windows )">⌘</a-tag>
        <a-tag>Wheel left</a-tag>
      </div>
    </div>
    <a-divider />
    <div class="flex justify-between">
      <div class="left">Pan right</div>
      <div class="right">
        <a-tag title="Command or Super ( Windows )">⌘</a-tag>
        <a-tag>Wheel right</a-tag>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
export default {
  name: 'ModalShortcuts',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const visibleModal = ref(props.value)

    watch(
      () => props.value,
      (newVal) => {
        visibleModal.value = newVal
      }
    )

    return {
      visibleModal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3{
  font-weight: 600;
}
.ant-tag{
  font-weight: bold;
}
.ant-divider-horizontal{
  margin: 12px 0;
}
</style>
