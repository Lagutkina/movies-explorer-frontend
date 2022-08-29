export function calcDisplayParams() {
  const width = window.innerWidth;
  if (width <= 604) {
    return [5, 2];
  }
  if (width <= 943) {
    return [8, 2];
  }
  if (width <= 1245) {
    return [12, 3];
  }
  if (width <= 1584) {
    return [16, 4];
  }
  return [20, 5];
}
