import axios from 'axios';

export const fetchGithubProfile = async (username) => {
  try {
    // Fetch user repos
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const repos = response.data;
    
    // Aggregate languages/technologies used
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    return {
      username,
      totalRepos: repos.length,
      topLanguages: Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([lang]) => lang),
      recentProjects: repos.slice(0, 5).map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count
      }))
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw new Error('Gagal mengambil data dari GitHub. Pastikan username valid.');
  }
};
