
const axios = require("axios");
const { getCache, setCache } = require("./cache");

const LEETCODE_URL = "https://leetcode.com/graphql";
const HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com",
};

async function graphqlRequest(query, variables) {
  const response = await axios.post(
    LEETCODE_URL,
    { query, variables },
    { headers: HEADERS, timeout: 8000 }
  );

  if (response.data.errors) {
    throw new Error("LeetCode GraphQL error");
  }

  return response.data.data;
}

/**
 * MAIN SERVICE FUNCTION
 */
async function getLeetCodeProfile(username) {
  const cached = getCache(username);
  if (cached) return cached;

  const [
    profileData,
    contestStats,
    contestHistory,
    totalQuestionsData, //
  ] = await Promise.allSettled([
    fetchProfile(username),
    fetchContestStats(username),
    fetchContestHistory(username),
    fetchTotalQuestions(), // 
  ]);

  if (profileData.status !== "fulfilled") {
    throw new Error("Failed to fetch LeetCode profile");
  }

  const profile = profileData.value.matchedUser;

  const response = {
    // ===== EXISTING (UNCHANGED) =====
    user: profile.username,
    avatar: profile.profile.userAvatar,
    ranking: profile.profile.ranking,

    solved: normalizeSolved(profile),

    contest: {
      rating:
        contestStats.status === "fulfilled"
          ? contestStats.value.userContestRanking?.rating ?? null
          : null,
      globalRank:
        contestStats.status === "fulfilled"
          ? contestStats.value.userContestRanking?.globalRanking ?? null
          : null,
      attended:
        contestStats.status === "fulfilled"
          ? contestStats.value.userContestRanking?.attendedContestsCount ?? 0
          : 0,
      history:
        contestHistory.status === "fulfilled"
          ? contestHistory.value.userContestRankingHistory ?? []
          : [],
    },

    // ===== NEW (FOR RING + UI) =====
    total:
      totalQuestionsData.status === "fulfilled"
        ? normalizeTotal(totalQuestionsData.value.allQuestionsCount)
        : null,
  };

  setCache(username, response);
  return response;
}

/* ---------------- GRAPHQL QUERIES ---------------- */

async function fetchProfile(username) {
  const query = `
    query ($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          userAvatar
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  return graphqlRequest(query, { username });
}

async function fetchContestStats(username) {
  const query = `
    query ($username: String!) {
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
      }
    }
  `;
  return graphqlRequest(query, { username });
}

async function fetchContestHistory(username) {
  const query = `
    query ($username: String!) {
      userContestRankingHistory(username: $username) {
        contest {
          title
          startTime
        }
        rating
      }
    }
  `;
  return graphqlRequest(query, { username });
}

/**
 * 
 * Total questions on LeetCode (Easy / Medium / Hard / All)
 */
async function fetchTotalQuestions() {
  const query = `
    query {
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;
  return graphqlRequest(query);
}

/* ---------------- HELPERS ---------------- */

function normalizeSolved(profile) {
  const solved = {};
  profile.submitStats.acSubmissionNum.forEach((item) => {
    solved[item.difficulty.toLowerCase()] = item.count;
  });
  return solved;
}

/**
 * Converts:
 * [{difficulty:"Easy",count:800}, ...]
 * → { easy:800, medium:..., hard:..., all:... }
 */
function normalizeTotal(allQuestionsCount) {
  const total = {};
  allQuestionsCount.forEach((item) => {
    total[item.difficulty.toLowerCase()] = item.count;
  });
  return total;
}

module.exports = { getLeetCodeProfile };
