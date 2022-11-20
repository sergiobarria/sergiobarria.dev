import { useEffect } from 'react';

import { useServerFunctions, useViews } from '~/shared/hooks';

interface ViewCounterProps {
	slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
	const { views } = useViews(slug);
	const { apiUrl } = useServerFunctions();

	useEffect(() => {
		const registerView = () => fetch(`${apiUrl}/views/${slug}`, { method: 'POST' });

		registerView();
	}, [slug]);

	return <span>{views ? `${views} views` : '---'}</span>;
}
