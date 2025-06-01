import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, Star, GitFork } from "lucide-react";
import { LanguageTag } from "../components/language-tag";

type Props = {
	project: Project;
	views: number;
	stars: number;
	forks: number;
	language?: string;
};

export const Article: React.FC<Props> = ({ project, views, stars, forks, language }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 sm:p-6 md:p-8">
				<div className="flex justify-between gap-2 items-start sm:items-center flex-col sm:flex-row">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="text-xs duration-1000 text-zinc-700 group-hover:text-black group-hover:border-zinc-700 drop-shadow-orange">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{/* Format date manually to avoid hydration mismatch */}
									{new Date(project.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</time>
							) : (
								<span>SOON</span>
							)}
						</span>
						{language && <LanguageTag language={language} size="sm" />}
					</div>
					<div className="flex items-center gap-2 sm:gap-3 text-zinc-900 text-xs mt-2 sm:mt-0 flex-wrap">
						<span className="flex items-center gap-1" title={`${views} views`}>
							<Eye className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
						{project.repository && (
							<>
								<span className="flex items-center gap-1" title={`${stars} stars`}>
									<Star className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
									{Intl.NumberFormat("en-US", { notation: "compact" }).format(stars)}
								</span>
								<span className="flex items-center gap-1" title={`${forks} forks`}>
									<GitFork className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
									{Intl.NumberFormat("en-US", { notation: "compact" }).format(forks)}
								</span>
							</>
						)}
					</div>
				</div>
				<h2 className="z-20 text-lg sm:text-xl font-medium lg:text-3xl text-zinc-600 group-hover:text-black font-display transition-all duration-1000 ease-in-out mt-4 break-words">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm text-zinc-500 group-hover:text-zinc-900 transition-all duration-1000 ease-in-out">
					{project.description}
				</p>
			</article>
		</Link>
	);
};
