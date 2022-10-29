import { useState, useEffect } from 'react';

export function useIsDarkMode(): boolean {
	const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(() => {
		if (import.meta.env.SSR) {
			return undefined;
		}

		return document.documentElement.classList.contains('dark') ? true : false;
	});

	useEffect(() => {
		const isDark = document.documentElement.classList.contains('dark');

		if (isDark) setIsDarkMode(true);
	}, [isDarkMode]);

	return isDarkMode !== undefined ? isDarkMode : false;
}
