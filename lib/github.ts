import { cache } from 'react';

interface RepoStats {
  stars: number;
  forks: number;
  language?: string;
}

// Language color mapping based on GitHub's language colors
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
  Rust: '#dea584',
  Dart: '#00B4AB',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#1572B6',
  SCSS: '#c6538c',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
  'Jupyter Notebook': '#DA5B0B',
  R: '#198CE7',
  MATLAB: '#e16737',
  Lua: '#000080',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Scala: '#c22d40',
  Clojure: '#db5855',
  Elixir: '#6e4a7e',
  Erlang: '#B83998',
  OCaml: '#3be133',
  'F#': '#b845fc',
  Nim: '#ffc200',
  Crystal: '#000100',
  Zig: '#ec915c',
  Assembly: '#6E4C13',
  Verilog: '#b2b7f8',
  VHDL: '#adb2cb',
  Objective: '#438eff',
  'Objective-C': '#438eff',
};

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
    const language = data.language ?? undefined;

    return { stars, forks, language };
  } catch (error) {
    console.error(`Failed to fetch GitHub repo stats for ${repoFullName}:`, error);
    return { stars: 0, forks: 0, language: undefined }; // Return default stats on network or parsing error
  }
});

// Function to fetch stats for multiple repos concurrently
export async function getAllRepoStats(projects: Array<{ slug: string; repository?: string }>): Promise<Record<string, RepoStats>> {
    const statsPromises = projects.map(async (project) => {
        // Only fetch if repository exists
        const stats = project.repository ? await getRepoStats(project.repository) : { stars: 0, forks: 0, language: undefined };
        return { slug: project.slug, stats };
    });

    const results = await Promise.all(statsPromises);

    return results.reduce((acc, { slug, stats }) => {
        acc[slug] = stats;
        return acc;
    }, {} as Record<string, RepoStats>);
}
