import guid from 'lguid'
import { chain } from 'lodash'

export const PREFIX = 'map-'

/**
 * Add one more map.
 *
 * @param {object} data Map data.
 *
 * @returns {Promise}
 */
export function add (data) {
  const id = guid()
  const newData = {
    id,
    ...data
  }
  localStorage.setItem(PREFIX + id, JSON.stringify(newData))
  return Promise.resolve({ data: newData })
}

/**
 * Get maps.
 *
 * @returns {Promise}
 */
export function all () {
  const res = chain(Object.keys(localStorage))
    .filter(key => key.indexOf(PREFIX) === 0)
    .map(key => JSON.parse(localStorage.getItem(key)))
    .value()
  return Promise.resolve({ data: res })
}

/**
 * Delete Maps.
 *
 * @param {object} ids Maps id's.
 *
 * @returns {Promise}
 */
export function delMaps (ids) {
  const res = chain(ids)
    .forEach(id => localStorage.removeItem(PREFIX + id))
    .value()
  return Promise.resolve({ data: res })
}
