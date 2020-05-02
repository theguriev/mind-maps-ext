import { get, omit } from 'lodash'
import { computed } from '@vue/composition-api'
import blank from '@/map-templates/blank'
import markdown from '@/map-templates/markdown'
import emojis from '@/map-templates/emojis'

export default function (maps) {
  function prepareTemplate (template, { centerX, centerY }, index) {
    const root = { ...template.content[0][1] }
    const offsetX = centerX - root.x
    const offsetY = centerY - root.y

    template.content = template.content.map(
      ([id, node]) => ([
        id,
        {
          ...node,
          x: node.x + offsetX,
          y: node.y + offsetY
        }
      ])
    )
    template.content[0][1].name = template.content[0][1].name.replace('{index}', index)

    return {
      ...template,
      title: template.content[0][1].name
    }
  }

  const templates = computed(
    () => ([
      blank,
      markdown,
      emojis
    ].concat(
      get(maps, 'value', [])
        .filter(
          el => get(el, 'meta.template.0', '0') === '1'
        ).map(
          el => ({
            ...el,
            description: 'Custom template'
          })
        )
    ).map(
      el => omit(el, ['id', 'date', 'modified'])
    ))
  )

  return {
    templates,
    prepareTemplate
  }
}
