import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<h1>Hello from Tanstack Start 👋 </h1>
		</main>
	);
}
