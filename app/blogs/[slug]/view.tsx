"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	useEffect(() => {
		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// Send type along with slug
			body: JSON.stringify({ slug, type: "blogs" }), 
		});
	}, [slug]);

	return null;
};
