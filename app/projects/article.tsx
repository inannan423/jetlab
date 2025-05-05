import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, View } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-700 group-hover:text-black group-hover:border-zinc-700 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{/* Format date manually to avoid hydration mismatch */}
								{new Date(project.date).toISOString().split("T")[0]}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-900 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium  lg:text-3xl text-zinc-600 group-hover:text-black font-display transition-all duration-1000 ease-in-out">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm text-zinc-500 group-hover:text-zinc-900 transition-all duration-1000 ease-in-out">
					{project.description}
				</p>
			</article>
		</Link>
	);
};
