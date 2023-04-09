import { useState } from 'react';
import clsx from 'clsx';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ThemeSwitcher() {
	const [isDarkMode, setIsDarkModel] = useState<boolean>(() =>
		document?.documentElement?.classList?.contains('dark')
	);

	const toggleMode = () => {
		if (isDarkMode) {
			doc.classList.remove('dark');
			setIsDarkModel(false);
			window.localStorage.mode = 'light';
		} else {
			doc.classList.add('dark');
			setIsDarkModel(true);
			window.localStorage.mode = 'dark';
		}
	};

	return (
		<button
			type="button"
			aria-label="toggle dark mode"
			className={clsx(
				'p-3 transition rounded-full shadow-lg group bg-white/90 shadow-zinc-800/5',
				'ring-1 ring-zinc-900/5 backdrop-blur dark:bg-white dark:ring-white/10 dark:hover:ring-teal-500/50'
			)}
			onClick={toggleMode}
		>
			{isDarkMode ? (
				<img
					src="/images/moon-to-sun.svg"
					alt="sun icon"
					width={25}
					className="transition duration-200"
				/>
			) : (
				<img
					src="/images/sun-to-moon.svg"
					alt="moon icon"
					width={25}
					className="transition duration-200"
				/>
			)}
		</button>
	);
}
