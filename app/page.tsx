import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Article } from "./blogs/article";
import { Card } from "./components/card";
import { Redis } from "@upstash/redis";
import { Navigation } from "./components/nav";
import { GitHubStats } from "./components/github-stats";
import { CobeModel } from "./components/cobe-model"; // Import the client component
import Image from "next/image"; // Import the Image component
// From lucide-react import Github
import { Github, Mail } from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import { ViewTracker } from "./components/view-tracker";
import { FriendLinks } from "./components/friend-links"; // Import the FriendLinks component
const redis = Redis.fromEnv();

export default async function Home() {
  const views = (
      await redis.mget<number[]>(
        ...allBlogs.map((p) => ["pageviews", "blogs", p.slug].join(":")),
      )
    ).reduce((acc, v, i) => {
      acc[allBlogs[i].slug] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);
  return (
    <div className="relative pb-16">
      <ViewTracker slug="index" type="home" />
      <Navigation isHome />
      <div className="px-6 pt-20 mx-auto space-y-8 container lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* Flex container for text and image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="max-w-2xl flex-1"> {/* Allow text to take available space */}
            <div className={'flex text-3xl lg:text-6xl font-bold w-full justify-start items-center'}>
              <div>I'm&nbsp;</div>
              <div>Cheng&nbsp;</div>
              <div className={'bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent'}>
                Zihan.
              </div>
            </div>
            <div className="mt-4 text-zinc-600">
              A graduate student majoring in CS at <b className="font-bold font-serif">Beijing Jiao Tong University</b>. I’m learning <b className={'underline decoration-dashed text-zinc-800 underline-offset-2 decoration-blue-500'}>Go, Redis, MySQL and LLM</b>.
            </div>
            <div className="mt-4"> {/* Add margin-top to GitHubStats */}
              <GitHubStats />
            </div>
            {/* Add GitHub profile button */}
            <div className="mt-4 first-letter:mb-4 flex gap-4">
              <a
                href="https://github.com/inannan423"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-zinc-300 text-sm font-medium rounded-md text-black bg-zinc-100 hover:bg-zinc-200"
              >
                <Github className="w-4 h-4 mr-2" />
                Follow me on GitHub
              </a>
              <a
                href="mailto:jetzihan@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-zinc-300 text-sm font-medium rounded-md text-black bg-zinc-100 hover:bg-zinc-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email me
              </a>

              <a
                href="https://github.com/inannan423/jetlab/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-zinc-300 text-sm font-medium rounded-md text-black bg-zinc-100 hover:bg-zinc-200"
              >
                <MessageCircleIcon className="w-4 h-4 mr-2" />
                Leave a message
              </a>
            </div>
            
          </div>
          {/* Image container */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Image
              src="/banner.svg" // Path relative to public folder
              alt="Banner"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              priority // Preload the image as it's likely above the fold
              className="object-contain" // Maintain aspect ratio
            />
          </div>
        </div>
        <div className={'w-full flex flex-col lg:grid lg:grid-flow-row-dense lg:grid-cols-5 gap-2'}>
            <div
                className={'flex p-3 justify-center relative overflow-hidden items-center bg-white col-span-3 h-96 w-full rounded-2xl forest-bg'}
            >
                <div className={'bg-black dark:bg-white absolute w-full h-full opacity-50 '}></div>
                <div className={'font-bold text-2xl lg:text-4xl text-white dark:text-white z-10 underline decoration-emerald-400 underline-offset-4 leading-relaxed'}>
                  fmt.Println("Hello, World!")
                </div>
            </div>
            <div className={'flex h-96 w-full justify-center items-center lg:col-span-2 shadow-inner relative bg-zinc-800 rounded-2xl overflow-hidden'}>
                <CobeModel /> {/* Use the imported component */}
                <div className={'absolute w-full opacity-30 flex justify-center items-center z-0 text-white text-2xl lg:text-4xl font-bold'}>
                    Now in Beijing, China.
                </div>
            </div>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto">
          {allBlogs.filter((blog) => blog.published)
            .sort(
              (a, b) =>
                new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
            )
            .slice(0, 20)
            .map((blog) => (
            <Card key={blog.slug}>
              <Article blog={blog} views={views[blog.slug] ?? 0} />
            </Card>
          ))}
          {/* Add "Read more blogs" link */}
          <div className="mt-8 text-center">
            <Link href="/blogs" className="text-sm font-medium text-zinc-500 hover:text-zinc-700">
              Read more blogs &rarr;
            </Link>
          </div>
        </div>
        
        <div className="mx-auto">
          <FriendLinks />
        </div>
      </div>
    </div>
  );
}
