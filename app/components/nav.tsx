"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC<{ isHome?: boolean }> = ({ isHome }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const navItems = [
		{ label: "Blogs", href: "/blogs" },
		{ label: "Projects", href: "/projects" },
	];

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 duration-200 border-b  ${
					isIntersecting
                        ? "bg-zinc-50/0 border-transparent"
                        : "bg-zinc-50/80 backdrop-blur border-zinc-200"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between py-6 px-6 mx-auto">
					<div className="flex justify-between gap-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`duration-200 text-zinc-200 hover:text-zinc-100 ${
									isIntersecting
										? "text-zinc-800 hover:text-zinc-900"
										: "text-zinc-800 hover:text-zinc-900"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>

					{
						!isHome ? (
							<Link
								href="/"
								className={`duration-200 text-zinc-200 hover:text-zinc-100 ${
									isIntersecting
										? "text-zinc-800 hover:text-zinc-900"
										: "text-zinc-800 hover:text-zinc-900"
								}`}
							>
								<ArrowLeft className="w-4 h-4" />
							</Link>
						) : (
							<a
								href="/"
								className={`duration-200 text-zinc-200 font-bold font-mono text-xl hover:text-zinc-100 ${
									isIntersecting
										? "text-zinc-800 hover:text-zinc-900"
										: "text-zinc-800 hover:text-zinc-900"
								}`}
							>
								JETLAB
							</a>
						)
					}
				</div>
			</div>
		</header>
	);
};
