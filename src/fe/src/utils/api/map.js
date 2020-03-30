import { PREFIX } from './maps'

/**
 * Get one map.
 *
 * @param {number} id Map id.
 *
 * @returns {Promise}
 */
export function one (id) {
  return JSON.parse(localStorage.getItem(PREFIX + id))
}

/**
 * Save map.
 *
 * @param {number} id Map id.
 * @param {object} map Map data.
 *
 * @returns {Promise}
 */
export function save (id, map) {
  localStorage.setItem(PREFIX + id, JSON.stringify(map))
  return one(id)
}
