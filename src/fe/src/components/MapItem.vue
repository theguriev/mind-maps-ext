<template>
  <div class="flex flex-column">
    <div class="flex justify-between">
      <div class="left flex flex-column items-start">
        <a-button
          type="link"
          @click="$emit('go', map)"
        >{{ map.title }}</a-button>
        <span title="map.modified">Updated {{ fromNow }}</span>
      </div>
      <div class="right">
        <a-button
          ghost
          type="danger"
          :loading="loading"
          @click="remove"
        >Remove</a-button>
      </div>
    </div>
    <a-divider />
  </div>
</template>

<script>
import moment from 'moment'
import { ref, computed } from '@vue/composition-api'

export default {
  name: 'MapItem',
  props: {
    map: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { emit }) {
    const loading = ref(false)
    const fromNow = computed(() => moment.utc(props.map.modified).fromNow())

    function remove () {
      loading.value = true
      emit(
        'remove',
        {
          map: props.map,
          callback: () => {
            loading.value = false
          }
        }
      )
    }

    return {
      fromNow,
      loading,
      remove
    }
  }
}
</script>

<style scoped lang="scss">
.ant-btn-link{
  font-size: 20px;
  padding-left: 0;
  border: 0;
}

span{
  font-size: 12px;
}
</style>
