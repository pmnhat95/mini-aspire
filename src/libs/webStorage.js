const webStorage = {
  get(key) {
    if (typeof Storage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return window.__TEMP_STORAGE__ ? window.__TEMP_STORAGE__[key] : null;
  },
  set(key, data) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(key, data);
    }
    window.__TEMP_STORAGE__ = window.__TEMP_STORAGE__ || {};
    window.__TEMP_STORAGE__[key] = data;
  },
  remove(key) {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
    }
    window.__TEMP_STORAGE__ = window.__TEMP_STORAGE__ || {};
    window.__TEMP_STORAGE__[key] = null;
  },
};

export default webStorage;
