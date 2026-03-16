export const PRIMARY_ENGINES = [
	{ value: "google" as const, label: "Google" },
	{ value: "duckduckgo" as const, label: "DuckDuckGo" },
];

export const FALLBACK_ENGINES = [
	{ value: "bing" as const, label: "Bing" },
	{ value: "baidu" as const, label: "Baidu" },
];

export const ENGINE_URLS: Record<string, string> = {
	google: "https://www.google.com/search?q=",
	bing: "https://www.bing.com/search?q=",
	baidu: "https://www.baidu.com/s?wd=",
	duckduckgo: "https://duckduckgo.com/?q=",
};
