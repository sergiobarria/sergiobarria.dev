import { useEffect } from 'react';
import { scroll, animate } from 'motion';

export function ProgressBar() {
	useEffect(() => {
		scroll(animate('#progress-bar', { scaleX: [0, 1] }));
	}, []);

	return (
		<div
			id="progress-bar"
			className="fixed top-0 inset-x-0 h-1 bg-teal-500 dark:bg-teal-300 transform scale-x-0 origin-[0%] z-50"
		></div>
	);
}
