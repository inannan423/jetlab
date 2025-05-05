"use client";

import { useEffect } from "react";

export const ViewTracker = ({ slug, type }: { slug: string; type: string }) => {
  useEffect(() => {
    fetch("/api/incr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, type }),
    });
  }, [slug, type]);

  return null;
};
