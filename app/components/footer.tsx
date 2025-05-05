import React from "react";
import { Redis } from "@upstash/redis";
import { VercelLogo } from "./vercel-logo";

const redis = Redis.fromEnv();

export const Footer = async () => {
  const views = (await redis.get<number>("pageviews:home:index")) ?? 0;

  return (
    <footer className="border-t border-zinc-200 mt-16">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-sm text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-zinc-700">JETLAB</span>
          <span>|</span>
          <span>{`${views.toLocaleString()} views`}</span>
        </div>
        <VercelLogo />
      </div>
    </footer>
  );
};
