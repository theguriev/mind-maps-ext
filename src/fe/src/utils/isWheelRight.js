export default function (event) {
  if (event.wheelDeltaX === 0) {
    return 0
  }
  return event.wheelDeltaX < 0 ? 1 : -1
}
