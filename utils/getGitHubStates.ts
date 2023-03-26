import { type Repository } from '../types'

interface GitHubStates {
  totalStars: number
  totalRepos: number
  totalForks: number
}

export default async function getGitHubStates ({ username, perpage, pagenum }: { username: string, perpage: number, pagenum: number }): Promise<GitHubStates> {
  let data: Repository[] = []
  for (let i = 1; i < pagenum + 1; i++) {
    await fetch(`https://api.github.com/users/${username}/repos?per_page=${perpage}&page=${i}`)
      .then(async response => await response.json())
      .then((repos: Repository) => {
        data = data.concat(repos)
      })
  }
  const totalStars = data.reduce((prev, current) => {
    return prev + current.stargazers_count
  }, 0)
  const totalRepos = data.length
  const totalForks = data.reduce((prev, current) => {
    return prev + current.forks_count
  }, 0)
  return {
    totalStars,
    totalRepos,
    totalForks
  }
}
