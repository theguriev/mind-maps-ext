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
  return newData
}

/**
 * Get maps.
 *
 * @returns {Promise}
 */
export function all () {
  return chain(Object.keys(localStorage))
    .filter(key => key.indexOf(PREFIX) === 0)
    .map(key => JSON.parse(localStorage.getItem(key)))
    .value()
}

/**
 * Delete Maps.
 *
 * @param {object} ids Maps id's.
 *
 * @returns {Promise}
 */
export function delMaps (ids) {
  return chain(ids)
    .forEach(id => localStorage.removeItem(PREFIX + id))
    .value()
}
