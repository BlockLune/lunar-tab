import { useRef, useState } from "react";
import { THEME_COLORS } from "@/constants";
import { useSettings } from "@/context/settings-context";
import { performSearch } from "@/utils/search";

export function SearchBox() {
	const [query, setQuery] = useState("");
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { settings } = useSettings();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		const trimmedQuery = query.trim();
		if (trimmedQuery) {
			performSearch(trimmedQuery, {
				primaryEngine: settings.primaryEngine,
				fallbackEngine: settings.fallbackEngine,
				checkTimeout: settings.checkTimeout,
			});
		}
	};

	const backgroundColor = isFocused
		? THEME_COLORS.bgSecondary
		: isHovered
			? THEME_COLORS.surface
			: THEME_COLORS.bgSecondary;

	return (
		<form
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onSubmit={handleSubmit}
			className="w-full max-w-[600px]"
		>
			<label className="sr-only" htmlFor="search">
				搜索
			</label>
			<input
				ref={inputRef}
				id="search"
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onClick={(e) => e.currentTarget.select()}
				placeholder="搜索..."
				autoComplete="off"
				autoFocus
				className="w-full px-6 py-4 text-lg border-none outline-none transition rounded-lg"
				style={{
					backgroundColor,
					color: THEME_COLORS.fg,
					outline: isFocused ? `4px solid ${THEME_COLORS.accent}` : "none",
				}}
			/>
		</form>
	);
}
