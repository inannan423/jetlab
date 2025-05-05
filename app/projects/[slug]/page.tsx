import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
// Import shared Header
import { Header } from "@/app/components/header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getRepoStats } from "@/lib/github"; // Import the function

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  // Fetch views
  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  // Fetch GitHub stats
  const { stars, forks } = await getRepoStats(project.repository);

  return (
    <div className="min-h-screen">
      {/* Use shared Header with appropriate props, including stats */}
      <Header
        title={project.title}
        description={project.description}
        views={views}
        repository={project.repository}
        url={project.url}
        backLink="/projects"
        stars={stars} // Pass stars
        forks={forks} // Pass forks
      />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
