<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skild TanStack Start project. The following changes were made:

- **`posthog-js`** installed as a dependency.
- **`vite.config.ts`** — added a `/ingest` reverse proxy to route PostHog requests through the dev server, avoiding CORS issues and improving reliability.
- **`src/routes/__root.tsx`** — wrapped the app with `PostHogProvider` (outside `ClerkProvider`) using environment variables for the token and host. Added a `PostHogUserIdentifier` component inside `ClerkProvider` that calls `posthog.identify()` with the Clerk user ID, email, and name whenever a user signs in, and `posthog.reset()` on sign-out.
- **`src/components/SkillCard.tsx`** — tracks `install_command_copied` (with skill title, category, and command) on copy button click, and `skill_opened` (with skill title and category) on the Open link click.
- **`src/routes/index.tsx`** — tracks `browse_registry_clicked` on the Browse Registry CTA and `publish_skill_clicked` on the Publish Skill CTA.
- **`src/components/Navbar.tsx`** — tracks `sign_in_clicked` when a signed-out user clicks the Sign in button.

| Event | Description | File |
|---|---|---|
| `install_command_copied` | User copies the install command from a skill card | `src/components/SkillCard.tsx` |
| `skill_opened` | User clicks the Open button on a skill card | `src/components/SkillCard.tsx` |
| `browse_registry_clicked` | User clicks the Browse Registry CTA on the homepage hero section | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the Publish Skill CTA on the homepage hero section | `src/routes/index.tsx` |
| `sign_in_clicked` | Signed-out user clicks the Sign in button in the navbar | `src/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/382116/dashboard/1466389
- **Insight — Skill Discovery to Install Funnel**: https://us.posthog.com/project/382116/insights/8W6o78lB
- **Insight — Install Commands Copied Over Time**: https://us.posthog.com/project/382116/insights/z3yDzl5J
- **Insight — Sign-in Conversion Funnel**: https://us.posthog.com/project/382116/insights/AQlgBy0B
- **Insight — Homepage CTA Clicks**: https://us.posthog.com/project/382116/insights/ld3BjdhK
- **Insight — Install Copies by Skill Category**: https://us.posthog.com/project/382116/insights/9zF61Z5L

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
