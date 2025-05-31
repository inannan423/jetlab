"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface FriendLink {
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

const friendLinks: FriendLink[] = [
  {
    name: "愧怍",
    url: "https://kuizuo.cn/",
    description: "愧怍的小站",
    avatar: "https://kuizuo.cn/img/logo.webp"
  }
];

export const FriendLinks = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-zinc-900">Friends</h3>
        <div className="flex-1 h-px bg-black"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {friendLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="flex items-center gap-3 p-4 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:shadow-sm transition-all duration-200">
              {link.avatar && (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={link.avatar}
                    alt={`${link.name} avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e4e4e7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-size='14'%3E${link.name.charAt(0)}%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-zinc-900 group-hover:text-blue-600 transition-colors">
                    {link.name}
                  </h4>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-sm text-zinc-500 truncate">{link.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center font-mono">
        <p className="text-sm text-zinc-400">
          If you want to add your link here, please{" "}
          <Link 
            href="https://github.com/inannan423/jetlab/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Contact me
          </Link>
        </p>
      </div>
    </div>
  );
};
