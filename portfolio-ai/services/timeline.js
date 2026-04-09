export const buildSmartTimeline = (github, leetcode) => {
  const timeline = [];
  const now = Date.now();

  // GitHub Projects
  github?.projects?.slice(0, 3).forEach((repo) => {
    if (repo.lastUpdated) {
      timeline.push({
        type: "project",
        text: `Working on "${repo.name}" (${repo.language})`,
        time: new Date(repo.lastUpdated).getTime(),
      });
    }
  });

  // Active Project (avoid duplicate)
  if (
    github?.activeProject &&
    !github.projects?.some(
      (p) => p.name === github.activeProject.name
    )
  ) {
    timeline.push({
      type: "focus",
      text: `Currently focused on "${github.activeProject.name}"`,
      time: new Date(github.activeProject.lastUpdated).getTime(),
    });
  }

  // LeetCode
  leetcode?.recentAccepted?.slice(0, 3).forEach((q) => {
    timeline.push({
      type: "problem",
      text: `Solved "${q.title}" in ${q.lang}`,
      time: Number(q.timestamp) * 1000,
    });
  });

  // Sort
  const sorted = timeline.sort((a, b) => b.time - a.time);

  // Insights
  const insights = [];

  const recent = sorted.filter(
    (item) => now - item.time < 1000 * 60 * 60 * 48
  );

  if (recent.length > 0) {
    insights.push("Recently active in coding and development.");
  }

  if (leetcode?.recentAccepted?.length > 2) {
    insights.push("Strong focus on DSA problem solving.");
  }

  if (github?.activeProject) {
    insights.push(
      `Currently building "${github.activeProject.name}".`
    );
  }

  return {
    timeline: sorted.slice(0, 6),
    insights,
  };
};