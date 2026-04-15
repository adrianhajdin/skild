import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	Bookmark,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import type { GetSkillsData } from "#/dataconnect-generated";

type SkillCardProps = GetSkillsData["skills"][number];

const SkillCard = ({
	createdAt,
	description,
	installCommand,
	tags,
	title,
	author,
}: SkillCardProps) => {
	const [copied, setCopied] = useState(false);
	const posthog = usePostHog();

	const category = tags[0] ?? "General";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(installCommand);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			posthog.capture("install_command_copied", {
				skill_title: title,
				skill_category: category,
				install_command: installCommand,
			});
		} catch {
			setCopied(false);
		}
	};

	return (
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>

			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<img
							src={author.imageUrl || "/logo512.png"}
							alt={`${author.username} avatar`}
							className="avatar"
						/>
						<div className="author-copy">
							<p>{author.username}</p>
							<p>
								{createdAt
									? new Date(createdAt).toLocaleDateString()
									: "Unknown date"}
							</p>
						</div>
					</div>

					<p className="category">{category}</p>
				</div>

				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>

					<p>{description}</p>
				</div>

				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button
						type="button"
						className="copy"
						onClick={handleCopy}
						aria-label="Copy install command"
					>
						{copied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>

				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{tags.length}</span>
						</button>

						<div className="comments">
							<MessageSquare size={14} />
							<span>{author.email ? 1 : 0}</span>
						</div>
					</div>

					<div className="actions">
						<Link
							to="/skills"
							className="open"
							title={`Open ${title}`}
							onClick={() =>
								posthog.capture("skill_opened", {
									skill_title: title,
									skill_category: category,
								})
							}
						>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>

						<button
							type="button"
							className="save"
							aria-label="Saved state"
							disabled
						>
							<Bookmark size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
