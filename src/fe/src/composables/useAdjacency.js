import { ref, computed } from '@vue/composition-api'
import { chain } from 'lodash'
import guid from 'lguid'
import mapOf from '@/utils/mapOf'
import iif from '@/utils/iif'

function fillId ([id, value]) {
  return [
    id,
    {
      id,
      ...value
    }
  ]
}

function fillComponent ([id, value]) {
  return [
    id,
    {
      ...value,
      component: value.id === 0 ? 'root' : 'node'
    }
  ]
}

function fillEditing ([id, value]) {
  return [
    id,
    {
      ...value,
      editing: value.editing === true
    }
  ]
}

function fillWidthHeight ([id, value]) {
  return [
    id,
    {
      ...value,
      width: value.width || 140,
      height: value.height || 32
    }
  ]
}

function isUpSide ({ y: fromY }, { y: toY }) {
  return fromY > toY
}

function isRightSide ({ x: fromX }, { x: toX }) {
  return fromX < toX
}

function fillSide (adjacency) {
  return function ([id, value]) {
    const from = adjacency.get(value.parent)
    if (from) {
      return [
        id,
        {
          ...value,
          isRightSide: isRightSide(from, value),
          isUpSide: isUpSide(from, value)
        }
      ]
    }
    return [
      id,
      {
        ...value
      }
    ]
  }
}

function fillHaveChildren (adjacency) {
  return function ([id, value]) {
    return [
      id,
      {
        ...value,
        isHaveChildren: children(Array.from(adjacency.values()), value.id).length > 0
      }
    ]
  }
}

/**
 * Get paths calculation fn.
 *
 * @param {number} index Function index. Examples:
 * up right | 10 + 1 = 11
 * up left | 10 + -1 = 9
 * down right | -10 + 1 = -9
 * down left | -10 + -1 = -11
 */
function pathsCalculations (isRigth, from, to) {
  const offset = 30

  const xDistance = to.x - from.x
  const xHalf = xDistance / 2

  if (isRigth === true) {
    return {
      x2: from.x + xHalf + offset,
      y2: from.y,
      x3: from.x + xHalf - offset,
      y3: to.y
    }
  }

  return {
    x2: from.x + xHalf - offset,
    y2: from.y,
    x3: from.x + xHalf + offset,
    y3: to.y
  }
}

function createPath (list) {
  return function ([id, to]) {
    const from = list.get(to.parent)
    const newId = `${id}-${to.id}`

    const points23 = pathsCalculations(isRightSide(from, to), from, to)

    return [
      newId,
      {
        id: newId,
        fromID: id,
        toID: to.id,
        x: from.x,
        y: from.y,
        x2: points23.x2,
        y2: points23.y2,
        x3: points23.x3,
        y3: points23.y3,
        x4: to.x,
        y4: to.y,
        isRightSide: isRightSide(from, to),
        strokeWidth: 6,
        stroke: to.stroke || 'black'
      }
    ]
  }
}

function prepareList (adjacency) {
  return chain(adjacency.value)
    .thru(Array.from)
    .map(fillId)
    .map(fillComponent)
    .map(fillEditing)
    .map(fillWidthHeight)
    .map(fillSide(adjacency.value))
    .map(fillHaveChildren(adjacency.value))
    .thru(mapOf)
    .value()
}

function preparePaths (list) {
  return chain(list.value)
    .thru(Array.from)
    .map(
      iif(
        ([id, value]) => value.parent !== undefined,
        createPath(list.value),
        undefined
      )
    )
    .filter(el => el)
    .thru(mapOf)
    .value()
}

function getNewPosition (index = 1, pieces = 9, distance = 200) {
  let offset = 0
  if (index >= pieces) {
    offset = Math.floor(index / pieces) * 0.03
  }
  const pi = ((2 * Math.PI / pieces) + offset) * (index - 2)
  return {
    x: +Math.cos(pi).toFixed(2) * distance,
    y: +Math.sin(pi).toFixed(2) * distance
  }
}

function children (arr, parent) {
  return arr.filter(el => el.parent === parent)
}

function branch (arr, parent) {
  const test = arr.filter(el => el.parent === parent)
  const test2 = test.reduce(
    (acc, el) => ([...acc, el, ...branch(arr, el.id)]),
    []
  )
  return test2
}

export default function (map) {
  const adjacency = ref(map)
  const list = computed(() => prepareList(adjacency))
  const paths = computed(() => preparePaths(list))

  function add (parentID, offsetIndex) {
    const parent = adjacency.value.get(parentID)
    const index = children(Array.from(adjacency.value.values()), parentID).length
    const newPosition = getNewPosition(index + offsetIndex)

    const x = parent.x + newPosition.x
    const y = parent.y + newPosition.y

    adjacency.value.set(
      guid(),
      {
        name: '',
        x,
        y,
        parent: parentID,
        stroke: parent.stroke
      }
    )
    adjacency.value = new Map(adjacency.value.entries())
    return adjacency
  }

  function remove (id) {
    const old = list.value.get(id)
    chain(Array.from(list.value.values()))
      .thru(arr => branch(arr, id))
      .concat(old)
      .forEach(
        el => {
          adjacency.value.delete(el.id)
        }
      )
      .value()
    adjacency.value = new Map(adjacency.value.entries())
    return adjacency
  }

  function updatePosition (node) {
    const old = list.value.get(node.id)
    const offsetX = old.x - node.x
    const offsetY = old.y - node.y

    chain(Array.from(list.value.values()))
      .thru(arr => branch(arr, node.id))
      .concat(old)
      .map(
        el => ({
          ...el,
          x: el.x - offsetX,
          y: el.y - offsetY
        })
      )
      .forEach(
        el => {
          adjacency.value.set(el.id, el)
        }
      )
      .value()

    adjacency.value = new Map(adjacency.value.entries())
    return adjacency
  }

  function update (node) {
    adjacency.value.set(node.id, node)
    adjacency.value = new Map(adjacency.value.entries())
    return adjacency
  }

  function updateBranch (id, newData) {
    const old = list.value.get(id)
    chain(Array.from(list.value.values()))
      .thru(arr => branch(arr, id))
      .concat(old)
      .map(
        el => ({
          ...el,
          ...newData
        })
      )
      .forEach(
        el => {
          adjacency.value.set(el.id, el)
        }
      )
      .value()

    adjacency.value = new Map(adjacency.value.entries())
    return adjacency
  }

  return {
    adjacency,
    list,
    paths,
    add,
    updatePosition,
    update,
    updateBranch,
    remove
  }
}
