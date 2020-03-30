<template>
  <div class="home">
    <div class="content">
      <div class="flex flex-column">
        <h1>Mind maps</h1>
        <a-divider />
      </div>
      <div class="flex">
        <a-input
          placeholder="Find a map..."
          v-model="filterText"
        />
        <a-button
          class="ml2"
          type="primary"
          @click="addNew"
        >New</a-button>
      </div>
      <a-divider />
      <div
        class="maps"
        v-if="maps.length > 0"
      >
        <map-item
          v-for="map in filteredMaps"
          :key="map.id"
          :map="map"
          @go="go"
          @remove="remove"
        />
      </div>
      <a-empty v-if="maps.length === 0" />
    </div>
    <footer-logo />
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { all, add, delMaps } from '@/utils/api/maps'
import MapItem from '@/components/MapItem'
import FooterLogo from '@/components/FooterLogo'

let beforeRouteData = []

export default {
  name: 'Home',
  components: {
    MapItem,
    FooterLogo
  },
  beforeRouteEnter (to, from, next) {
    beforeRouteData = all()
    next()
  },
  setup (_, { root }) {
    const { $router } = root
    const maps = ref(beforeRouteData)
    const filterText = ref('')
    const filteredMaps = computed(
      () => maps.value.filter(
        el => el.title.toLocaleLowerCase().indexOf(filterText.value.toLocaleLowerCase()) > -1
      )
    )

    function go ({ id }) {
      $router.push('map/' + id)
    }

    function remove ({ map, callback }) {
      delMaps([map.id])
      maps.value = all()
      callback()
    }

    function addNew () {
      const width = document.getElementById('mmb').offsetWidth
      const height = document.getElementById('mmb').offsetHeight
      const name = 'Mind maps by Beagl ' + (maps.value.length + 1)

      const newMap = add({
        title: name,
        content: [
          [
            0,
            {
              name: name,
              x: width / 2,
              y: height / 2
            }
          ]
        ]
      })
      go(newMap)
    }

    return {
      addNew,
      filterText,
      filteredMaps,
      maps,
      go,
      remove
    }
  }
}
</script>

<style scoped lang="scss">
h1{
  font-size: 23px;
}
.content{
  width: 960px;
  margin: 24px auto;
}
</style>
