export default function debounce(func, timeout) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this);
    }, timeout);
  };
}
