import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FALLBACK_ENGINES, PRIMARY_ENGINES, THEME_COLORS } from "@/constants";
import { useSettings } from "@/context/settings-context";

export function Settings() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { settings, updateSettings } = useSettings();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const buttonBgColor = isFocused
		? THEME_COLORS.bg
		: isHovered
			? THEME_COLORS.surface
			: THEME_COLORS.bgSecondary;

	return (
		<div ref={containerRef} className="fixed top-4 right-4 z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className="p-2 transition rounded-lg"
				style={{
					color: THEME_COLORS.fg,
					backgroundColor: buttonBgColor,
					outline: isFocused ? `4px solid ${THEME_COLORS.accent}` : "none",
				}}
				title="设置"
			>
				<SettingsIcon size={24} />
			</button>

			{isOpen && (
				<div
					className="absolute top-12 right-0 w-72 p-5 rounded-lg"
					style={{
						backgroundColor: THEME_COLORS.bg,
						outline: `2px solid ${THEME_COLORS.surface}`,
					}}
				>
					<div className="flex items-center gap-2 mb-5">
						<SettingsIcon size={18} style={{ color: THEME_COLORS.accent }} />
						<span
							className="text-base font-medium"
							style={{ color: THEME_COLORS.fg }}
						>
							设置
						</span>
					</div>

					<div className="space-y-5">
						{/* Primary Engine Selection */}
						<div>
							<label
								className="block text-xs uppercase tracking-wider mb-2"
								style={{ color: THEME_COLORS.accent }}
							>
								主搜索引擎
							</label>
							<div className="flex gap-2">
								{PRIMARY_ENGINES.map((engine) => (
									<button
										key={engine.value}
										onClick={() =>
											updateSettings({ primaryEngine: engine.value })
										}
										className="flex-1 px-3 py-2 text-sm rounded-md transition"
										style={{
											backgroundColor:
												settings.primaryEngine === engine.value
													? THEME_COLORS.accent
													: THEME_COLORS.bgSecondary,
											color:
												settings.primaryEngine === engine.value
													? THEME_COLORS.bg
													: THEME_COLORS.fg,
										}}
									>
										{engine.label}
									</button>
								))}
							</div>
						</div>

						{/* Fallback Engine Selection */}
						<div>
							<label
								className="block text-xs uppercase tracking-wider mb-2"
								style={{ color: THEME_COLORS.accent }}
							>
								备用搜索引擎
							</label>
							<div className="flex gap-2">
								{FALLBACK_ENGINES.map((engine) => (
									<button
										key={engine.value}
										onClick={() =>
											updateSettings({ fallbackEngine: engine.value })
										}
										className="flex-1 px-3 py-2 text-sm rounded-md transition"
										style={{
											backgroundColor:
												settings.fallbackEngine === engine.value
													? THEME_COLORS.accent
													: THEME_COLORS.bgSecondary,
											color:
												settings.fallbackEngine === engine.value
													? THEME_COLORS.bg
													: THEME_COLORS.fg,
										}}
									>
										{engine.label}
									</button>
								))}
							</div>
						</div>

						{/* Timeout Setting */}
						<div>
							<label
								className="block text-xs uppercase tracking-wider mb-2"
								style={{ color: THEME_COLORS.accent }}
							>
								检测超时
							</label>
							<div className="flex items-center gap-3">
								<input
									type="range"
									min="100"
									max="1000"
									step="50"
									value={settings.checkTimeout}
									onChange={(e) =>
										updateSettings({ checkTimeout: Number(e.target.value) })
									}
									className="flex-1"
									style={{ accentColor: THEME_COLORS.accent }}
								/>
								<span
									className="text-sm w-16 text-right"
									style={{ color: THEME_COLORS.fg }}
								>
									{settings.checkTimeout}ms
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
