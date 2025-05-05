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
export default async function BlogsPage() {
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
            {sorted
              .map((blog) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
