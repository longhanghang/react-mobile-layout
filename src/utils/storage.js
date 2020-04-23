export default {
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
  set(key, data) {
    if (typeof data === "object") {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    }
  },
  get(key) {
    let rt = window.sessionStorage.getItem(key);
    if (rt) {
      return JSON.parse(rt);
    }
  }
};
