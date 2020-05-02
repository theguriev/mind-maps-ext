<template>
  <div class="bgl-templates">
    <div class="bgl-top">
      <div class="bgl-title">Select a Template</div>
      <div class="bgl-subtitle">To speed up the process, you can select from one of our pre-made templates.</div>
      <a-input
        clearable
        placeholder="Search for a template"
        v-model="search"></a-input>
    </div>

    <ul>
      <li
        v-for="(template, index) in filteredTemplates"
        v-on:click="$emit('choose', template)"
        :key="index">
        <b class="mb1">{{ template.title.replace('{index}', '') }}</b>
        <small>{{ template.description }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  name: 'templates',
  props: {
    templates: {
      type: Array
    }
  },
  setup (props) {
    const search = ref('')
    const filteredTemplates = computed(() => props.templates.filter(t => t.title.indexOf(search.value) > -1 || t.description.indexOf(search.value) > -1))

    return {
      search,
      filteredTemplates
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bgl-templates{
  min-height: 340px;
}
.bgl-top{
  padding: 0 12px;

  .bgl-title{
    font-size: 18px;
  }

  .bgl-subtitle{
    font-size: 12px;
    margin-bottom: 16px;
    opacity: .7;
  }
}

ul{
  margin: 16px 0;
  max-height: 220px;
  overflow-y: auto;

  li{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--border-light);
    padding: 16px 12px;
    cursor: pointer;

    &:hover{
      background: var(--primary);
      color: var(--white);
    }

    b{
      font-weight: bold;
    }

    small{
      font-size: 12px;
    }
  }
}
</style>

<style lang="scss">
.ant-popover-inner .ant-popover-inner-content{
  padding: 12px 0px;
  width: 350px;
}
</style>
