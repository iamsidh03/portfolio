const BASE_URL =
  process.env.LEETCODE_API_URL || "http://localhost:5001";

let cache = null;
let lastFetch = 0;

const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
};

export const getLeetCodeData = async () => {
  try {
    if (cache && Date.now() - lastFetch < 60000) {
      return cache;
    }

    if (!BASE_URL) {
      throw new Error("LEETCODE_API_URL not set");
    }

    const res = await withTimeout(
      fetch(`${BASE_URL}/api/user/siddharthraj3101`),
      5000
    );

    if (!res.ok) {
      throw new Error(`LeetCode API failed: ${res.status}`);
    }

    const data = await res.json();

    const recent = data.contest?.recent || [];

    const accepted = recent.filter(
      (q) => q.statusDisplay === "Accepted"
    );

    const lastSolved =
      accepted.sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp)
      )[0] || null;

    const summary = {
      totalSolved: data.solved?.all || 0,
      easy: data.solved?.easy || 0,
      medium: data.solved?.medium || 0,
      hard: data.solved?.hard || 0,
      ranking: data.ranking,
      contestRating: data.contest?.rating || null,
      globalRank: data.contest?.globalRank || null,
      contestsAttended: data.contest?.attended || 0,
    };

    const result = {
      summary,
      lastSolved,
      recentAccepted: accepted.slice(0, 5),
      contestHistory: data.contest?.history || [],
      totals: data.total || {},
      userInfo: {
        username: data.user,
        avatar: data.avatar,
      },
    };

    cache = result;
    lastFetch = Date.now();

    return result;

  } catch (error) {
    console.error("LeetCode fetch error:", error);

    return {
      summary: {
        totalSolved: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        ranking: null,
        contestRating: null,
        globalRank: null,
        contestsAttended: 0,
      },
      lastSolved: null,
      recentAccepted: [],
      contestHistory: [],
      totals: {},
      userInfo: {},
    };
  }
};