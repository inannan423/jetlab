import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
// Import shared Header
import { Header } from "@/app/components/header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getRepoStats } from "@/lib/github"; // Import the function
import { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    return {
      title: "项目未找到 - JETLAB",
      description: "抱歉，您访问的项目不存在。",
    };
  }

  return {
    title: `${project.title} - JETLAB`,
    description: project.description,
    keywords: `${project.title}, 开源项目, GitHub, 编程项目, Web应用, 技术作品`,
    openGraph: {
      title: `${project.title} - JETLAB`,
      description: project.description,
      url: `https://jet-lab.site/projects/${project.slug}`,
      type: "article",
      publishedTime: project.date,
    },
    twitter: {
      title: `${project.title} - JETLAB`,
      description: project.description,
      card: "summary_large_image",
    },
  };
}

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

      {/* Responsive container with proper mobile spacing */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <article className="prose prose-zinc prose-quoteless max-w-none prose-sm sm:prose-base lg:prose-lg">
          <Mdx code={project.body.code} />
        </article>
      </div>
    </div>
  );
}
