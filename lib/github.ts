import { cache } from 'react';

interface RepoStats {
  stars: number;
  forks: number;
}

// Use cache to memoize requests for the same repo during a single request lifecycle
export const getRepoStats = cache(async (repoFullName: string | undefined): Promise<RepoStats> => {
  if (!repoFullName || !repoFullName.includes('/')) {
    // console.warn(`Invalid or missing repository name provided: ${repoFullName}`);
    return { stars: 0, forks: 0 };
  }

  const apiUrl = `https://api.github.com/repos/${repoFullName}`;
  // console.log(`Fetching stats for: ${apiUrl}`); // Log the URL being fetched

  try {
    // Use Next.js fetch with revalidation (e.g., revalidate every hour)
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      // Log detailed error information
      const errorBody = await response.text();
      console.error(`GitHub API error for ${repoFullName}: ${response.status} ${response.statusText}. Body: ${errorBody}`);
      // Handle specific errors like 404 Not Found or 403 Rate Limit Exceeded
      if (response.status === 404) {
        console.warn(`Repository ${repoFullName} not found.`);
      } else if (response.status === 403) {
          console.warn(`GitHub API rate limit exceeded or forbidden access for ${repoFullName}. Check token if applicable.`);
      }
      return { stars: 0, forks: 0 }; // Return default stats on error
    }

    const data = await response.json();

    // Check if necessary fields exist
    const stars = data.stargazers_count ?? 0;
    const forks = data.forks_count ?? 0;

    return { stars, forks };
  } catch (error) {
    console.error(`Failed to fetch GitHub repo stats for ${repoFullName}:`, error);
    return { stars: 0, forks: 0 }; // Return default stats on network or parsing error
  }
});

// Function to fetch stats for multiple repos concurrently
export async function getAllRepoStats(projects: Array<{ slug: string; repository?: string }>): Promise<Record<string, RepoStats>> {
    const statsPromises = projects.map(async (project) => {
        // Only fetch if repository exists
        const stats = project.repository ? await getRepoStats(project.repository) : { stars: 0, forks: 0 };
        return { slug: project.slug, stats };
    });

    const results = await Promise.all(statsPromises);

    return results.reduce((acc, { slug, stats }) => {
        acc[slug] = stats;
        return acc;
    }, {} as Record<string, RepoStats>);
}
