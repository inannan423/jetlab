"use client";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import { Star, GitFork } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern"; // Import the component
import { cn } from "@/lib/utils"; // Import utility function

type Props = {
	title: string;
	description: string;
	views: number;
	repository?: string; // Optional repository link
	url?: string; // Optional website link
	backLink: string; // Link to go back to (e.g., /blogs or /projects)
    date?: string; // Optional date for the blog
    stars?: number; // Optional stars count
    forks?: number; // Optional forks count
};


interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number] // [horizontal, vertical]
  className?: string
  squaresClassName?: string
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName,
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}


export function InteractiveGridPatternDiv() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
        width={150}
        height={90}
        squares={[12, 12]}
        squaresClassName="hover:fill-zinc-200"
      />
    </div>
  );
}

export const Header: React.FC<Props> = ({ title, description, views, repository, url, backLink, date, stars, forks }) => {
	const titleRef = useRef<HTMLHeadingElement>(null); // Changed ref name and target element type
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${repository}`,
		});
	}
	if (url) {
		links.push({
			label: "Website",
			href: url,
		});
	}

	useEffect(() => {
		if (!titleRef.current) return; // Use titleRef
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
			{ rootMargin: "-100px 0px 0px 0px" } // Trigger when title is 100px above viewport top
		);

		observer.observe(titleRef.current); // Observe titleRef
		return () => observer.disconnect();
	}, []);

	return (
		<header
			// Removed isolate from the main header tag if it was causing issues,
			// or ensure its position doesn't conflict. Keeping relative for positioning context.
			className="relative overflow-hidden pt-20 border-b border-2 border-zinc-200"
		>
            {/* Fixed header part - Placed directly inside header, sibling to the content div */}
            <div
                className={`fixed inset-x-0 top-0 z-50 duration-200 border-b ${
                    isIntersecting
                        ? "bg-zinc-50/0 border-transparent"
                        : "bg-zinc-50/80 backdrop-blur border-zinc-200"
                }`}
            >
                <div className="container flex flex-row-reverse items-center justify-between py-6 px-3 mx-auto">
                    <div className="flex justify-between gap-8">
                        <span
                            title="View counter for this page"
                            className={`duration-200 hover:font-medium flex items-center gap-1 ${
                                isIntersecting
                                    ? " text-zinc-800 hover:text-zinc-900"
                                    : "text-zinc-800 hover:text-zinc-900"
                            } `}
                        >
                            <Eye className="w-5 h-5" />{" "}
                            {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                                views,
                            )}
                        </span>
                        {/* Conditionally render social links if needed, or pass them as props */}
                        {/* Example:
                        <Link target="_blank" href="https://twitter.com/your_handle">
                            <Twitter
                                className={`w-6 h-6 duration-200 hover:font-medium ${
                                    isIntersecting
                                        ? " text-zinc-400 hover:text-zinc-100"
                                        : "text-zinc-200 hover:text-zinc-100"
                                } `}
                            />
                        </Link>
                        <Link target="_blank" href="https://github.com/your_handle">
                            <Github
                                className={`w-6 h-6 duration-200 hover:font-medium ${
                                    isIntersecting
                                        ? " text-zinc-400 hover:text-zinc-100"
                                        : "text-zinc-200 hover:text-zinc-100"
                                } `}
                            />
                        </Link>
                        */}
                        <Link target="_blank" href="https://github.com/inannan423">
                            <img
                                src="/github-mark.svg"
                                className={`w-6 h-6 duration-200 hover:font-medium ${
                                    isIntersecting
                                        ? " text-zinc-800 hover:text-zinc-900"
                                        : "text-zinc-800 hover:text-zinc-900"
                                } `}
                            />
                        </Link>
                    </div>

                    <Link
                        href={backLink}
                        className={`duration-200 hover:font-medium ${
                            isIntersecting
                                    ? " text-zinc-800 hover:text-zinc-900"
                                    : "text-zinc-800 hover:text-zinc-900"
                        } `}
                    >
                        <ArrowLeft className="w-6 h-6 " />
                    </Link>
                </div>
            </div>

            <div className="relative">
                <div className="container mx-auto relative isolate py-24 sm:py-32"> {/* Keep isolate and z-40 here */}
                    <div className="absolute inset-0 -mt-20 flex justify-center items-center z-0"> {/* Removed z-10 */}
                        <InteractiveGridPatternDiv />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center z-50">
                        <div className="mx-auto max-w-2xl lg:mx-0 z-40">
                            <h1 ref={titleRef} className="text-4xl !leading-normal tracking-wide font-bold text-black sm:text-5xl font-display">
                                {title}
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-zinc-800">
                                {description}
                            </p>
                            {date && (
                                <p className="mt-4 text-sm text-zinc-800">
                                    <time dateTime={new Date(date).toISOString()}>
                                        {/* Format date manually to avoid hydration mismatch */}
                                        {new Date(date).toISOString().split('T')[0]}
                                    </time>
                                </p>
                            )}
                            <div className="flex gap-4 justify-center mt-2">
                                {stars !== undefined && stars !== 0 && (
                                    <a
                                        href={`https://github.com/${repository}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-zinc-800 flex items-center gap-1 px-3 py-1 rounded hover:bg-zinc-200/50 transition-colors"
                                    >
                                        <Star className="w-4 h-4" />
                                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(stars)}
                                    </a>
                                )}
                                {forks !== undefined && forks !== 0 && (
                                    <a
                                        href={`https://github.com/${repository}/forks`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-zinc-800 flex items-center gap-1 px-3 py-1 rounded hover:bg-zinc-200/50 transition-colors"
                                    >
                                        <GitFork className="w-4 h-4" />
                                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(forks)}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="mx-auto mt-5 max-w-2xl lg:mx-0 lg:max-w-none z-40">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
                                {links.map((link) => (
                                    <Link target="_blank" key={link.label} href={link.href}>
                                        {link.label} <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</header>
	);
};

