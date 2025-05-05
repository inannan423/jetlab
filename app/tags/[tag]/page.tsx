import { allBlogs } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Article } from "@/app/blogs/article"; // Reuse the Article component
import { Redis } from "@upstash/redis";
import Link from "next/link";
import { Bookmark } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;

type Props = {
  params: {
    tag: string;
  };
};

// Function to generate static paths for each tag
export async function generateStaticParams(): Promise<Props["params"][]> {
  const tags = new Set<string>();
  allBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).map((tag) => ({ tag: decodeURIComponent(tag) })); // Decode URI component for safety
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag); // Decode the tag from the URL

  // Fetch all views
  const views = (
    await redis.mget<number[]>(
      ...allBlogs.map((p) => ["pageviews", "blogs", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allBlogs[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  // Filter blogs by the current tag and sort by date
  const blogsWithTag = allBlogs
    .filter((blog) => blog.published && blog.tags?.includes(decodedTag))
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 container lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl inline-flex items-center">
            <Bookmark className="w-9 h-9 mr-2" /> Posts tagged with "{decodedTag}"
          </h2>
          <p className="mt-4 text-zinc-600">
            Found {blogsWithTag.length} blog post{blogsWithTag.length !== 1 ? 's' : ''} with this tag.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto">
          {blogsWithTag.length > 0 ? (
            blogsWithTag.map((blog) => (
              <Card key={blog.slug}>
                <Article blog={blog} views={views[blog.slug] ?? 0} />
              </Card>
            ))
          ) : (
            <p className="text-zinc-600">No posts found with this tag.</p>
          )}
        </div>
         <div className="mt-8 text-center">
            <Link href="/blogs" className="text-sm font-medium text-zinc-500 hover:text-zinc-700">
              &larr; Back to all blogs
            </Link>
          </div>
      </div>
    </div>
  );
}
