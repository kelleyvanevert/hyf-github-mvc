export function fakeWait(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
