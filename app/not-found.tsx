"use client";

import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "./components/nav";
import { Card } from "./components/card";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  // Get the latest 6 blogs to display (without view counts for now)
  const recentBlogs = allBlogs
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900/0 to-black/0 min-h-screen">
      <Navigation />
      
      {/* Main 404 Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Header */}
          <div className="mb-12">
            <h1 className="text-8xl font-serif md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-zinc-800 mb-6">
              Page Not Found
            </h2>
            <div className="text-lg text-zinc-600 space-y-2">
              <p>很抱歉，您访问的页面不存在。</p>
              <p className="text-blue-600 font-medium">
                网站最近进行了改版，但您要找的文章应该还在！
              </p>
              <p className="text-sm text-zinc-500">
                请尝试通过下方的最新文章或导航菜单找到您需要的内容。
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors duration-200"
            >
              <Search className="w-4 h-4 mr-2" />
              浏览所有文章
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上一页
            </button>
          </div>
        </div>

        {/* Recent Blogs Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-zinc-800 mb-2">
              最新文章
            </h3>
            <p className="text-zinc-600">
              看看这些最新发布的技术文章，或许您会找到感兴趣的内容
            </p>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <Card key={blog.slug}>
                <Link href={`/blogs/${blog.slug}`}>
                  <article className="p-4 sm:p-6 md:p-8">
                    <div className="flex justify-between gap-2 items-center flex-wrap">
                      <span className="text-xs duration-1000 text-zinc-800 group-hover:text-black group-hover:border-zinc-800 drop-shadow-orange">
                        {blog.date ? (
                          <time dateTime={new Date(blog.date).toISOString()}>
                            {new Date(blog.date).toISOString().split("T")[0]}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </span>
                    </div>
                    <h2 className="z-20 tracking-widest mt-4 text-lg sm:text-xl font-medium duration-1000 lg:text-2xl text-zinc-600 group-hover:text-black font-display break-words">
                      {blog.title}
                    </h2>
                    <p className="z-20 mt-4 text-sm duration-1000 text-zinc-500 group-hover:text-black line-clamp-3">
                      {blog.description}
                    </p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-zinc-100 text-zinc-600 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              </Card>
            ))}
          </div>

          {/* View All Blogs Link */}
          <div className="text-center mt-12">
            <Link
              href="/blogs"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              查看所有文章
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <div className="bg-zinc-50 rounded-lg p-8">
            <h4 className="text-lg font-semibold text-zinc-800 mb-4">
              需要帮助？
            </h4>
            <p className="text-zinc-600 mb-6">
              如果您认为这是一个错误，或者需要特定的内容，请随时联系我们。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/inannan423/jetlab/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-zinc-700 border border-zinc-300 rounded-lg hover:bg-white transition-colors duration-200"
              >
                反馈问题
              </Link>
              <Link
                href="mailto:jetzihan@outlook.com"
                className="inline-flex items-center px-4 py-2 text-zinc-700 border border-zinc-300 rounded-lg hover:bg-white transition-colors duration-200"
              >
                发送邮件
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
