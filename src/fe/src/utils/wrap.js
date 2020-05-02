export function isInner (str, start, end, wherewith) {
  const innerBefore = str.substr(start, wherewith.length)
  const innerAfter = str.substr(end - wherewith.length, wherewith.length)
  return innerBefore === wherewith && innerAfter === wherewith
}

export function isOuter (str, start, end, wherewith) {
  return isInner(str, start - wherewith.length, end + wherewith.length, wherewith)
}

function remove (str, start, end, wherewith) {
  return str.slice(0, start - wherewith.length) + str.slice(start, end) + str.slice(end + wherewith.length, str.length)
}

function add (str, start, end, wherewith) {
  return str.slice(0, start) + `${wherewith}${str.substr(start, end - start)}${wherewith}` + str.slice(end, str.length)
}

export function wrap (str, start, end, wherewith = '**') {
  const outerStart = start - wherewith.length
  const outerEnd = end + wherewith.length

  if (isInner(str, start, end, wherewith) === true) {
    return {
      str: remove(str, start + wherewith.length, end - wherewith.length, wherewith),
      start: start,
      end: end - wherewith.length - wherewith.length
    }
  }

  if (isInner(str, outerStart, outerEnd, wherewith) === true) {
    return {
      str: remove(str, start, end, wherewith),
      start: start - wherewith.length,
      end: end - wherewith.length
    }
  }

  return {
    str: add(str, start, end, wherewith),
    start: start + wherewith.length,
    end: end + wherewith.length
  }
}
