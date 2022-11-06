import clsx from 'clsx';

import { useViews } from '~/shared/hooks/useViews';
import { ViewsIcon } from '~/shared/icons';

interface ViewsProps {
	slug: string;
	title?: string;
}

export function Views({ slug, title }: ViewsProps) {
	const { views } = useViews(slug as string);

	return (
		<span
			className={clsx(
				'absolute bottom-2 right-2 flex items-center space-x-1',
				'bg-amber-500 px-2 py-[2px] rounded-md'
			)}
		>
			<ViewsIcon className="w-4 h-4" />
			<span className="text-xs">{views ?? '--'}</span>
		</span>
	);
}
