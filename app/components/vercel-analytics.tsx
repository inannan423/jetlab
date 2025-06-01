"use client";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function VercelAnalytics() {
  return (
    <>
      {/* Vercel Analytics - 页面浏览量和用户行为分析 */}
      <Analytics />
      
      {/* Vercel Speed Insights - 性能监控 */}
      <SpeedInsights />
    </>
  );
}
