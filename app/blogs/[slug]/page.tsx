import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
// Import shared Header
import { Header } from "@/app/components/header"; 
import "./mdx.css"; // Assuming shared MDX styles
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { TableOfContents } from "./sidebar"; // Import the sidebar
import Link from "next/link"; // Import Link
import { Bookmark } from "lucide-react"; // Import Tag icon
import GiscusComments from "@/app/components/GiscusComments"; // Import the Giscus component

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
      <div className="container mx-auto flex flex-col lg:flex-row pt-16 px-4 gap-8"> {/* Added gap for spacing */}
        <article className="prose prose-quoteless max-w-4xl flex-grow">
          {/* Display Tags below header/metadata */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-zinc-200 text-zinc-800 hover:bg-zinc-300 transition-all duration-500 ease-linear cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 mr-1.5" />
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          )}
          <Mdx code={blog.body.code} />
          {/* Add Giscus comments section below the article content */}
          <div className="mt-12">
            <GiscusComments />
          </div>
        </article>
        
        <TableOfContents /> {/* Add the sidebar component */} 
      </div>
    </div>
  );
}
