import { ENGINE_URLS } from "@/constants";
import type { FallbackEngine, PrimaryEngine } from "@/context/settings-context";

// Extract domain from search URL for favicon detection
function getEngineDomain(engine: string): string {
	return ENGINE_URLS[engine].split("/")[2];
}

// Check if primary engine is accessible (using image loading - avoids CORS)
function checkPrimaryConnection(
	engine: PrimaryEngine,
	timeout: number,
): Promise<boolean> {
	return new Promise((resolve) => {
		const img = new Image();
		const timeoutId = setTimeout(() => {
			resolve(false);
		}, timeout);

		img.onload = () => {
			clearTimeout(timeoutId);
			resolve(true);
		};

		img.onerror = () => {
			clearTimeout(timeoutId);
			resolve(false);
		};

		img.src = `https://${getEngineDomain(engine)}/favicon.ico?t=${Date.now()}`;
	});
}

// Perform search with primary engine and fallback
export async function performSearch(
	query: string,
	options: {
		primaryEngine: PrimaryEngine;
		fallbackEngine: FallbackEngine;
		checkTimeout: number;
	},
): Promise<void> {
	const encodedQuery = encodeURIComponent(query);
	const isPrimaryAvailable = await checkPrimaryConnection(
		options.primaryEngine,
		options.checkTimeout,
	);

	console.log("[Lunar Tab] Search query:", query);

	const engine = isPrimaryAvailable
		? options.primaryEngine
		: options.fallbackEngine;
	const url = ENGINE_URLS[engine] + encodedQuery;

	console.log("[Lunar Tab] Using search engine:", engine);
	console.log("[Lunar Tab] Redirecting to:", url);
	window.location.href = url;
}

export { ENGINE_URLS };
