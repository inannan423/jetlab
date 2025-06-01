import { allBlogs } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Article } from "@/app/blogs/article"; // Reuse the Article component
import { Redis } from "@upstash/redis";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);

  // Count blogs with this tag
  const blogsWithTag = allBlogs.filter(
    (blog) => blog.published && blog.tags?.includes(decodedTag),
  );

  return {
    title: `标签: ${decodedTag} - JETLAB`,
    description: `浏览所有标记为 "${decodedTag}" 的技术文章，共 ${blogsWithTag.length} 篇相关内容。`,
    keywords: `${decodedTag}, 技术标签, 技术博客, 编程文章`,
    openGraph: {
      title: `标签: ${decodedTag} - JETLAB`,
      description: `浏览所有标记为 "${decodedTag}" 的技术文章，共 ${blogsWithTag.length} 篇相关内容。`,
      url: `https://jet-lab.site/tags/${encodeURIComponent(decodedTag)}`,
      type: "website",
    },
    twitter: {
      title: `标签: ${decodedTag} - JETLAB`,
      description: `浏览所有标记为 "${decodedTag}" 的技术文章。`,
      card: "summary",
    },
  };
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Header section with responsive spacing */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
            <span className="break-all sm:break-words">Posts tagged with "{decodedTag}"</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600">
            Found {blogsWithTag.length} blog post{blogsWithTag.length !== 1 ? 's' : ''} with this tag.
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-zinc-200 max-w-4xl mx-auto" />

        {/* Content grid with responsive layout */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {blogsWithTag.length > 0 ? (
              blogsWithTag.map((blog) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-600 text-lg">No posts found with this tag.</p>
              </div>
            )}
          </div>
          
          {/* Back link with responsive positioning */}
          <div className="mt-8 sm:mt-12 text-center">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
