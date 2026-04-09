import LRU from "lru-cache";

export const cache = new LRU({
  max: 100,
  ttl: 1000 * 60 * 10, // 10 min
});