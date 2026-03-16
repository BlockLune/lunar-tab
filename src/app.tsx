import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBox } from "@/components/search-box";
import { Settings } from "@/components/settings";
import { useSettings } from "@/context/settings-context";
import { performSearch } from "@/utils/search";

function App() {
	const [searchParams] = useSearchParams();
	const { settings } = useSettings();

	useEffect(() => {
		const query = searchParams.get("q");
		if (query) {
			performSearch(query, {
				primaryEngine: settings.primaryEngine,
				fallbackEngine: settings.fallbackEngine,
				checkTimeout: settings.checkTimeout,
			});
		}
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-5">
			<Settings />
			<SearchBox />
		</div>
	);
}

export default App;
