import { auth } from "@clerk/tanstack-react-start/server";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { createSkill } from "#/dataconnect-generated";
import { dataConnect } from "#/lib/firebase";

export const createSkillFn = createServerFn({ method: "POST" })
	.inputValidator((d: SubmitSkillFormValues) => d)
	.handler(async ({ data }) => {
		const { userId } = await auth();
		const {
			title,
			description,
			tags,
			installCommand,
			promptConfig,
			usageExample,
		} = data;

		if (!userId) throw new Error("You must be signed in to publish a skill.");

		const result = await createSkill(dataConnect, {
			authorClerkId: userId,
			title,
			description,
			tags: tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean),
			installCommand,
			promptConfig,
			usageExample,
		});

		return result.data.skill_insert;
	});

const submitSkillSchema = z.object({
	title: z
		.string()
		.trim()
		.min(3, "Title must be at least 3 characters long")
		.max(80, "Title must be 80 characters or fewer"),
	description: z
		.string()
		.trim()
		.min(20, "Description must be at least 20 characters long")
		.max(500, "Description must be 500 characters or fewer"),
	tags: z
		.string()
		.trim()
		.min(1, "Please add at least one tag")
		.refine(
			(value) =>
				value
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean).length > 0,
			{ message: "Tags must be comma-separated values (e.g. firebase, auth)" },
		),
	installCommand: z
		.string()
		.trim()
		.min(3, "Install command is required")
		.max(200, "Install command must be 200 characters or fewer"),
	promptConfig: z
		.string()
		.trim()
		.min(10, "Prompt configuration must be at least 10 characters long")
		.max(4000, "Prompt configuration must be 4000 characters or fewer"),
	usageExample: z
		.string()
		.trim()
		.min(20, "Usage example must be at least 20 characters long")
		.max(4000, "Usage example must be 4000 characters or fewer"),
});

type SubmitSkillFormValues = z.infer<typeof submitSkillSchema>;

const defaultValues: SubmitSkillFormValues = {
	title: "",
	description: "",
	tags: "",
	installCommand: "",
	promptConfig: "",
	usageExample: "",
};

export const Route = createFileRoute("/skills/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: submitSkillSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await createSkillFn({ data: value });

				toast.success("Skill published successfully");
				form.reset(defaultValues);
				navigate({ to: "/" });
			} catch (error) {
				console.error("Error creating skill:", error);
				toast.error("Failed to publish skill.");
			}
		},
	});

	const isSubmitting = form.state.isSubmitting;

	return (
		<div id="new-skill">
			<Link
				to={"/skills" as string}
				search={{ q: "", page: 1 }}
				className="back"
			>
				<ArrowLeft size={16} />
				<span>Back to Skills</span>
			</Link>

			<div className="intro">
				<h1>Submit a New Skill</h1>
				<p>Share your skill with the community.</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="content"
			>
				{/* Section 1: Basic Info */}
				<div className="block">
					<FieldGroup>
						<form.Field
							name="title"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Title</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="e.g. Firebase Authentication Helper"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="description"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Description</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Briefly describe what this skill does and when to use it..."
											rows={4}
											className="min-h-24 resize-none"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="tags"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Tags</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="e.g. firebase, auth, react (comma-separated)"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</div>

				{/* Divider */}
				<div className="divider" />

				{/* Section 2: Installation */}
				<div className="block">
					<FieldGroup>
						<form.Field
							name="installCommand"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Install Command
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="e.g. npx shadcn@latest add button"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="promptConfig"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Prompt Configuration
										</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Paste the prompt or agent instructions here..."
											rows={6}
											className="min-h-32 resize-none"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</div>

				{/* Divider */}
				<div className="divider" />

				{/* Section 3: Usage */}
				<div className="block">
					<FieldGroup>
						<form.Field
							name="usageExample"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Usage Example</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Show how to use this skill in a real scenario..."
											rows={6}
											className="min-h-32 resize-none"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</div>

				{/* Submit */}
				<div className="actions">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="animate-spin" />
								Publishing...
							</>
						) : (
							<>
								<Zap />
								Publish Skill
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
