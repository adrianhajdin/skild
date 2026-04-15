import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
	ArrowLeft,
	Calendar,
	Check,
	CircleUser,
	Copy,
	FileCode2,
	Hash,
	TerminalSquare,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import z from "zod";
import { getSkillById } from "#/dataconnect-generated";
import { dataConnect } from "#/lib/firebase";

const getSkillSchema = z.object({
	id: z.string(),
});

export const getSkillFn = createServerFn({ method: "GET" })
	.inputValidator(getSkillSchema)
	.handler(async ({ data }) => {
		const response = await getSkillById(dataConnect, { id: data.id });
		return response.data.skill;
	});

export const Route = createFileRoute("/skills/$skillId")({
	loader: ({ params }) => getSkillFn({ data: { id: params.skillId } }),
	component: RouteComponent,
});

const prettifyMultiline = (value: string) =>
	value
		.split("\n")
		.map((line) => line.trimEnd())
		.join("\n");

const formatDate = (value?: string) => {
	if (!value) return "Unknown date";

	try {
		return new Date(value).toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return "Unknown date";
	}
};

function CodeBlock({
	title,
	icon,
	content,
}: {
	title: string;
	icon: ReactNode;
	content: string;
}) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};

	return (
		<section className="code-panel">
			<header>
				<div>
					<span>{icon}</span>
					<h2>{title}</h2>
				</div>
				<button
					type="button"
					onClick={handleCopy}
					aria-label={`Copy ${title.toLowerCase()}`}
				>
					{copied ? <Check size={14} /> : <Copy size={14} />}
					<span>{copied ? "Copied" : "Copy"}</span>
				</button>
			</header>
			<pre>
				<code>{prettifyMultiline(content)}</code>
			</pre>
		</section>
	);
}

function RouteComponent() {
	const skill = Route.useLoaderData();

	if (!skill) {
		return (
			<section id="skill-detail" className="missing">
				<Link
					to={"/skills" as string}
					search={{ q: "", page: 1 }}
					className="back"
				>
					<ArrowLeft size={16} />
					<span>Back to explore</span>
				</Link>
				<div className="missing-card">
					<h1>Skill not found</h1>
					<p>
						This skill may have been removed or the URL is incorrect. Return to
						the catalog to keep exploring.
					</p>
				</div>
			</section>
		);
	}

	const category = skill.tags[0] ?? "General";

	return (
		<div id="skill-detail">
			<div className="ambient ambient-one" />
			<div className="ambient ambient-two" />

			<div className="detail-shell animate-in fade-in duration-500">
				<Link
					to={"/skills" as string}
					search={{ q: "", page: 1 }}
					className="back"
				>
					<ArrowLeft size={16} />
					<span>Back to explore</span>
				</Link>

				<section className="hero animate-in slide-in-from-bottom-4 duration-500">
					<div className="copy">
						<p className="eyebrow">Skill details</p>
						<h1>{skill.title}</h1>
						<p className="description">{skill.description}</p>
						<div className="tags">
							{skill.tags.map((tag) => (
								<span key={tag}>{tag}</span>
							))}
						</div>
					</div>

					<aside className="author-card">
						<div className="author-row">
							<img
								src={skill.author.imageUrl || "/logo512.png"}
								alt={`${skill.author.username ?? "Author"} avatar`}
							/>
							<div>
								<p>{skill.author.username ?? "Unknown author"}</p>
								<p>Author</p>
							</div>
						</div>

						<div className="facts">
							<p>
								<Calendar size={14} />
								<span>{formatDate(skill.createdAt)}</span>
							</p>
							<p>
								<Hash size={14} />
								<span>{category}</span>
							</p>
							<p>
								<CircleUser size={14} />
								<span>{skill.author.email}</span>
							</p>
						</div>
					</aside>
				</section>

				<section className="content animate-in slide-in-from-bottom-4 duration-500 delay-100">
					<CodeBlock
						title="Installation"
						icon={<TerminalSquare size={15} />}
						content={skill.installCommand}
					/>
					<CodeBlock
						title="Configuration"
						icon={<FileCode2 size={15} />}
						content={skill.promptConfig}
					/>
					<CodeBlock
						title="Usage Example"
						icon={<FileCode2 size={15} />}
						content={skill.usageExample}
					/>
				</section>
			</div>
		</div>
	);
}
