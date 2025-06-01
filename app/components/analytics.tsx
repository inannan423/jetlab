"use client";

import { VercelAnalytics } from './vercel-analytics';

export function Analytics() {
	const beamToken = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	
	return (
		<>
			{/* Vercel Analytics & Speed Insights */}
			<VercelAnalytics />
			
			{/* Beam Analytics (如果配置了 token) */}
			{beamToken && (
				<script
					src="https://beamanalytics.b-cdn.net/beam.min.js"
					data-token={beamToken}
					async
				/>
			)}
		</>
	);
}
