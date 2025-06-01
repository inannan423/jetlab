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
import { LanguageTag } from "../components/language-tag";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目展示 - JETLAB",
  description: "展示我的开源项目和技术作品，包含Web应用、工具软件、技术实验等。查看源代码、在线演示和技术详情。",
  keywords: "开源项目, Web应用, 技术作品, GitHub项目, 前端项目, 后端项目, 编程作品",
  openGraph: {
    title: "项目展示 - JETLAB",
    description: "展示我的开源项目和技术作品，包含Web应用、工具软件、技术实验等。",
    url: "https://jet-lab.site/projects",
    type: "website",
  },
};

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
  const top2 = allProjects.find((project) => project.slug === "leaforum")!;
  const top3 = allProjects.find((project) => project.slug === "redigo")!;
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
      <div className="px-4 sm:px-6 lg:px-8 pt-20 mx-auto space-y-8 container md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 lg:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600">
            A collection of my work, from personal projects to open-source
            contributions.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 mx-auto lg:grid-cols-2">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
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
                    {githubStats[featured.slug]?.language && (
                      <LanguageTag language={githubStats[featured.slug]!.language!} size="sm" />
                    )}
                  </div>
                  {/* Display stats for featured project */}
                  <div className="flex items-center gap-2 sm:gap-4 text-xs text-zinc-900 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[featured.slug] ?? 0,
                      )}
                    </span>
                    {githubStats[featured.slug] && (
                      <>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            githubStats[featured.slug].stars,
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
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
                  className="mt-4 text-2xl sm:text-3xl font-bold text-zinc-600 group-hover:text-black lg:text-4xl font-display transition-all duration-1000 ease-in-out"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm text-zinc-500 group-hover:text-zinc-900 transition-all duration-1000 ease-in-out">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8">
                  <p className="hidden text-zinc-500 hover:text-zinc-900 sm:block lg:block transition-all duration-1000 ease-in-out">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-6 sm:gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                {/* Pass stats to Article */}
                <Article
                  project={project}
                  views={views[project.slug] ?? 0}
                  stars={githubStats[project.slug]?.stars ?? 0}
                  forks={githubStats[project.slug]?.forks ?? 0}
                  language={githubStats[project.slug]?.language}
                />
              </Card>
            ))}
          </div>
        </div>

        {sorted.length > 0 && (
          <div className="hidden w-full h-px md:block bg-zinc-800" />
        )}

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 sm:grid-cols-2 lg:grid-cols-3">
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
                    language={githubStats[project.slug]?.language}
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
                    language={githubStats[project.slug]?.language}
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
                    language={githubStats[project.slug]?.language}
                  />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
