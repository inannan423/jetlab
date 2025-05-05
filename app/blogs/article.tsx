import type { Blog } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, Bookmark } from "lucide-react"; // Import Tag icon

type Props = {
	blog: Blog;
	views: number;
};

export const Article: React.FC<Props> = ({ blog, views }) => {
	return (
		<Link href={`/blogs/${blog.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-800 group-hover:text-black group-hover:border-zinc-800 drop-shadow-orange">
						{blog.date ? (
							<time dateTime={new Date(blog.date).toISOString()}>
								{/* Format date manually to avoid hydration mismatch */}
								{new Date(blog.date).toISOString().split("T")[0]}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-800 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 tracking-widest text-xl font-medium duration-1000 lg:text-2xl text-zinc-600 group-hover:text-black font-display">
					{blog.title}
				</h2>
				<p className="z-20 mt-4 text-sm duration-1000 text-zinc-600 group-hover:text-zinc-900">
					{blog.description}
				</p>
				{/* Display Tags */}
				{blog.tags && blog.tags.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{blog.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-200 text-zinc-800"
							>
								<Bookmark className="w-3 h-3 mr-1" />
								{tag}
							</span>
						))}
					</div>
				)}
			</article>
		</Link>
	);
};
