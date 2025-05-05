import React from "react";
import { GoStar, GoRepoForked, GoRepo, GoEye } from "react-icons/go";
import { Repository } from "../../types";

interface GitHubStates {
  totalStars: number;
  totalRepos: number;
  totalForks: number;
}

async function getGitHubRepoStates({
  username,
  perpage,
  pagenum,
}: {
  username: string;
  perpage: number;
  pagenum: number;
}): Promise<GitHubStates> {
  let data: Repository[] = [];
  try {
    for (let i = 1; i < pagenum + 1; i++) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perpage}&page=${i}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
      );
      if (!response.ok) {
        console.error(`GitHub API error: ${response.statusText}`);
        continue; // Skip this page if there's an error
      }
      const repos: Repository[] = await response.json();
      // Check if the response is an array before concatenating
      if (Array.isArray(repos)) {
        data = data.concat(repos);
      } else {
        console.error("GitHub API did not return an array for repos:", repos);
        // Handle potential rate limiting or other API errors
        // Maybe return default/cached values or throw an error
        break; // Stop fetching if the response format is unexpected
      }
    }
  } catch (error) {
    console.error("Failed to fetch GitHub repo states:", error);
    // Return default values or re-throw the error depending on desired behavior
    return { totalStars: 0, totalRepos: 0, totalForks: 0 };
  }

  const totalStars = data.reduce((prev, current) => prev + (current.stargazers_count || 0), 0);
  const totalRepos = data.length;
  const totalForks = data.reduce((prev, current) => prev + (current.forks_count || 0), 0);

  return {
    totalStars,
    totalRepos,
    totalForks,
  };
}

async function getGitHubFollowers(username: string): Promise<number> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
            console.error(`GitHub API error: ${response.statusText}`);
            return 0; // Return 0 if there's an error
        }
        const userData = await response.json();
        return userData.followers || 0;
    } catch (error) {
        console.error("Failed to fetch GitHub followers:", error);
        return 0; // Return 0 on failure
    }
}


export async function GitHubStats() {
  // Fetch data directly in the server component
  const { totalStars, totalRepos, totalForks } = await getGitHubRepoStates({
    username: "inannan423",
    perpage: 100,
    pagenum: 2,
  });
  const followers = await getGitHubFollowers("inannan423");


  return (
    <div className={'w-full h-full font-mono grid grid-cols-2 gap-y-4 gap-x-8 my-5 lg:flex lg:flex-row lg:space-x-5 lg:gap-0 justify-start items-stretch lg:items-center'}>
        <div className={'flex flex-col'}>
          <div className={'text-sm lg:text-base flex h-max justify-center items-center text-black dark:text-white'}>
            Stars Earned
          </div>
          <div className={'text-xl gap-2 flex h-max justify-start items-center text-black dark:text-white'}>
            <GoStar className={'text-black dark:text-white'} /> {totalStars}
          </div>
        </div>
      <div className={'flex flex-col'}>
        <div className={'text-sm lg:text-base flex h-max justify-center items-center text-black dark:text-white'}>
          Forks Earned
        </div>
        <div className={'text-xl gap-2 flex h-max justify-start items-center text-black dark:text-white'}>
          <GoRepoForked className={'text-black dark:text-white'} /> {totalForks}
        </div>
      </div>
      <div className={'flex flex-col'}>
        <div className={'text-sm lg:text-base flex h-max justify-center items-center text-black dark:text-white'}>
          Repositories
        </div>
        <div className={'text-xl gap-2 flex h-max justify-start items-center text-black dark:text-white'}>
          <GoRepo className={'text-black dark:text-white'} /> {totalRepos}
        </div>
      </div>
      <div className={'flex flex-col'}>
        <div className={'text-sm lg:text-base flex h-max justify-center items-center text-black dark:text-white'}>
          Followers
        </div>
        <div className={'text-xl gap-2 flex h-max justify-start items-center text-black dark:text-white'}>
          <GoEye className={'text-black dark:text-white'} /> {followers}
        </div>
      </div>
    </div>
  );
}
