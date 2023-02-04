import { useEffect } from 'react';

import { useViews } from '~/shared/hooks';

interface ViewsCounterProps {
	slug: string;
}

export function ViewsCounter({ slug }: ViewsCounterProps) {
	const { views, isLoading, isError } = useViews(slug);

	useEffect(() => {
		const registerView = () => fetch(`/api/views/${slug}.json`, { method: 'POST' });

		registerView();
	}, [slug]);

	if (isLoading || isError) return <small className="text-sm">--</small>;

	return <span className="text-sm">{`${views} views` ?? '--'}</span>;
}
