export default function (event) {
  if (event.wheelDeltaY === 0) {
    return 0
  }
  return event.wheelDeltaY > 0 ? 1 : -1
}
