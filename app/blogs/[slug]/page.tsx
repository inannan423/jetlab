import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
// Import shared Header
import { Header } from "@/app/components/header"; 
import "./mdx.css"; // Assuming shared MDX styles
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { TableOfContents } from "./sidebar"; // Import the sidebar

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;

  return (
    <div className="min-h-screen text-zinc-900">
      {/* Use shared Header with appropriate props */}
      <Header 
        title={blog.title} 
        description={blog.description} 
        views={views} 
        backLink="/blogs"
        date={blog.date}
      />
      <ReportView slug={blog.slug} />

      {/* Increased top padding to push content below header */}
      <div className="container mx-auto flex flex-row pt-16 px-4">
        <article className="prose prose-quoteless max-w-4xl flex-grow">
          <Mdx code={blog.body.code} />
        </article>
        
        <TableOfContents /> {/* Add the sidebar component */} 
      </div>
    </div>
  );
}
