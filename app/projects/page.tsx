import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Header } from "@/app/components/header"; // Import the shared Header
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Star, GitFork } from "lucide-react"; // Import Star and GitFork icons
import { Navigation } from "../components/nav";
import { getAllRepoStats } from "@/lib/github"; // Import the new function

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  // Fetch views
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // Fetch GitHub stats
  const githubStats = await getAllRepoStats(allProjects);

  const featured = allProjects.find((project) => project.slug === "daymd")!;
  const top2 = allProjects.find((project) => project.slug === "gpt-translate")!;
  const top3 = allProjects.find((project) => project.slug === "weberpenn")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      {/* Replace Navigation with Header */}
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 container lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-600">
            A collection of my work, from personal projects to open-source
            contributions.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-900">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {/* Format date manually to avoid hydration mismatch */}
                        {new Date(featured.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  {/* Display stats for featured project */}
                  <div className="flex items-center gap-4 text-xs text-zinc-900">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                    {githubStats[featured.slug] && (
                      <>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />{" "}
                          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            githubStats[featured.slug].stars,
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />{" "}
                          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            githubStats[featured.slug].forks,
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-600 group-hover:text-black sm:text-4xl font-display transition-all duration-1000 ease-in-out"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm text-zinc-500 group-hover:text-zinc-900 transition-all duration-1000 ease-in-out">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-500 hover:text-zinc-900 lg:block transition-all duration-1000 ease-in-out">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                {/* Pass stats to Article */}
                <Article
                  project={project}
                  views={views[project.slug] ?? 0}
                  stars={githubStats[project.slug]?.stars ?? 0}
                  forks={githubStats[project.slug]?.forks ?? 0}
                />
              </Card>
            ))}
          </div>
        </div>

        {         sorted.length > 0 &&
          <div className="hidden w-full h-px md:block bg-zinc-800" />
        }

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  {/* Pass stats to Article */}
                  <Article
                    project={project}
                    views={views[project.slug] ?? 0}
                    stars={githubStats[project.slug]?.stars ?? 0}
                    forks={githubStats[project.slug]?.forks ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  {/* Pass stats to Article */}
                  <Article
                    project={project}
                    views={views[project.slug] ?? 0}
                    stars={githubStats[project.slug]?.stars ?? 0}
                    forks={githubStats[project.slug]?.forks ?? 0}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  {/* Pass stats to Article */}
                  <Article
                    project={project}
                    views={views[project.slug] ?? 0}
                    stars={githubStats[project.slug]?.stars ?? 0}
                    forks={githubStats[project.slug]?.forks ?? 0}
                  />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
