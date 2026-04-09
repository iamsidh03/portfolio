const GITHUB_USERNAME = "iamsidh03";

let cache = null;
let lastFetch = 0;

export const getGitHubData = async () => {
  try {
    //  cache (1 min)
    if (cache && Date.now() - lastFetch < 60000) {
      return cache;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN || ""}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("GitHub API failed");
    }

    const repos = await res.json();

    const ownRepos = repos.filter((repo) => !repo.fork);

    const sorted = ownRepos.sort(
      (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
    );

    const projects = sorted.slice(0, 5).map((repo) => ({
      name: repo.name,
      description: repo.description || "No description",
      language: repo.language,
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      createdAt: repo.created_at,
      lastUpdated: repo.pushed_at,
      url: repo.html_url,
    }));

    const languagesUsed = [
      ...new Set(
        ownRepos.map((repo) => repo.language).filter(Boolean)
      ),
    ];

    const activeProject = projects[0] || null;

    const result = {
      projects,
      activeProject,
      languagesUsed,
    };

    //  store cache
    cache = result;
    lastFetch = Date.now();

    return result;

  } catch (error) {
    console.error("GitHub fetch error:", error);
    return {
      projects: [],
      activeProject: null,
      languagesUsed: [],
    };
  }
};