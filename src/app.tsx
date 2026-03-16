import { SearchBox } from "@/components/search-box";
import { Settings } from "@/components/settings";

function App() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-5">
			<Settings />
			<SearchBox />
		</div>
	);
}

export default App;
