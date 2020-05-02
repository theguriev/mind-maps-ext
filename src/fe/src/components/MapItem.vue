<template>
  <div class="flex flex-column">
    <div class="flex justify-between">
      <div class="left flex flex-column items-start">
        <a-button
          type="link"
          @click="$emit('go', map)"
        >{{ map.title }}</a-button>
        <span :title="map.modified">Updated {{ fromNow }}</span>
      </div>
      <div class="right flex justify-between">
        <a-button
          v-if="isTemplate"
          class="mr2"
          icon="star"
          title="Make it map"
          :loading="starLoading"
          @click="unstar"
        >
          Unstar
        </a-button>
        <a-button
          v-if="!isTemplate"
          class="mr2"
          icon="star"
          title="Make it teamplate"
          :loading="starLoading"
          @click="star"
        >
          Star
        </a-button>
        <a-button
          ghost
          type="danger"
          :loading="loading"
          title="Remove map"
          @click="remove"
        >Remove</a-button>
      </div>
    </div>
    <a-divider />
  </div>
</template>

<script>
import moment from 'moment'
import { get } from 'lodash'
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
    const starLoading = ref(false)
    const fromNow = computed(() => moment.utc(props.map.modified).fromNow())
    const isTemplate = computed(() => get(props, 'map.meta.template.0', '0') === '1')

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

    function star () {
      starLoading.value = true
      emit(
        'star',
        {
          map: props.map,
          callback: () => {
            starLoading.value = false
          }
        }
      )
    }

    function unstar () {
      starLoading.value = true
      emit(
        'unstar',
        {
          map: props.map,
          callback: () => {
            starLoading.value = false
          }
        }
      )
    }

    return {
      fromNow,
      loading,
      remove,
      star,
      unstar,
      starLoading,
      isTemplate
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
