import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

type SearchProps = {
	query: string;
	onQueryChange: (value: string) => void;
};

const DEBOUNCE_MS = 250;

const Search = ({ query, onQueryChange }: SearchProps) => {
	const [draftQuery, setDraftQuery] = useState(query);

	useEffect(() => {
		setDraftQuery(query);
	}, [query]);

	useEffect(() => {
		if (draftQuery === query) return;

		const timeoutId = setTimeout(() => {
			onQueryChange(draftQuery);
		}, DEBOUNCE_MS);

		return () => clearTimeout(timeoutId);
	}, [draftQuery, query, onQueryChange]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (draftQuery !== query) {
			onQueryChange(draftQuery);
		}
	};

	return (
		<div className="search-bar">
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="field">
						<SearchIcon className="icon size-4" aria-hidden="true" />
						<Input
							name="q"
							type="text"
							value={draftQuery}
							onChange={(event) => setDraftQuery(event.target.value)}
							placeholder="Search skills..."
							className="search-input"
						/>

						{draftQuery.length > 0 ? (
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								onClick={() => {
									setDraftQuery("");
									if (query !== "") {
										onQueryChange("");
									}
								}}
								className="search-clear"
								aria-label="Clear search"
							>
								<X size={16} />
							</Button>
						) : null}
					</div>

					<Button
						type="button"
						variant="outline"
						className="search-filters"
						aria-label="Open filters"
					>
						<SlidersHorizontal size={16} />
						<span>Filters</span>
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Search;
