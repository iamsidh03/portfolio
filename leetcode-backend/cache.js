// server/cache.js
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const cache = new Map();

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.time > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() });
}

module.exports = { getCache, setCache };