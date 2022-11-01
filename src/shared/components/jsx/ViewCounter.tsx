import { useCallback, useEffect } from 'react';

import { useServerFunctions, useViews } from '~/shared/hooks';

interface ViewCounterProps {
	slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
	const { views } = useViews(slug);
	const { apiUrl } = useServerFunctions();

	const registerView = useCallback(() => {
		fetch(`${apiUrl}/views/${slug}`, {
			method: 'POST',
		});
	}, []);

	useEffect(() => {
		registerView();
	}, [slug]);

	return <span className="ml-2">{views ? views.total : '---'}</span>;
}
