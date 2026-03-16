import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { DEFAULT_SETTINGS, STORAGE_KEY } from "@/constants";

export type PrimaryEngine = "google" | "duckduckgo";
export type FallbackEngine = "bing" | "baidu";

export interface Settings {
	primaryEngine: PrimaryEngine;
	fallbackEngine: FallbackEngine;
	checkTimeout: number;
}

interface SettingsContextType {
	settings: Settings;
	updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
	const [settings, setSettings] = useState<Settings>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
			}
		} catch (e) {
			console.error("[Lunar Tab] Failed to load settings:", e);
		}
		return DEFAULT_SETTINGS;
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
		} catch (e) {
			console.error("[Lunar Tab] Failed to save settings:", e);
		}
	}, [settings]);

	const updateSettings = (newSettings: Partial<Settings>) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	return (
		<SettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings() {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}
	return context;
}
