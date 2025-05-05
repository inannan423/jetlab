import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import { Header } from "@/app/components/header";

const redis = Redis.fromEnv();

export const revalidate = 60;

// Define blogs per page
const BLOGS_PER_PAGE = 20;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get current page from search params, default to 1
  const currentPage = Number(searchParams?.page ?? 1);

  const views = (
    await redis.mget<number[]>(
      ...allBlogs.map((p) => ["pageviews", "blogs", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allBlogs[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const sorted = allBlogs
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  // Calculate pagination variables
  const totalBlogs = sorted.length;
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const paginatedBlogs = sorted.slice(startIndex, endIndex);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 container lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Blogs
          </h2>
          <p className="mt-4 text-zinc-600">
            Musings on technology, design, and life.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
        </div> */}
        <div className="grid grid-cols-1 gap-4 mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {paginatedBlogs // Use paginatedBlogs instead of sorted
              .map((blog) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            {hasPrevPage ? (
              <Link
                href={`/blogs?page=${currentPage - 1}`}
                className="px-4 py-2 border border-zinc-300 rounded-md text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 border border-zinc-200 rounded-md text-sm text-zinc-400 cursor-not-allowed">
                Previous
              </span>
            )}

            <span className="text-sm text-zinc-600">
              Page {currentPage} of {totalPages}
            </span>

            {hasNextPage ? (
              <Link
                href={`/blogs?page=${currentPage + 1}`}
                className="px-4 py-2 border border-zinc-300 rounded-md text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 border border-zinc-200 rounded-md text-sm text-zinc-400 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
