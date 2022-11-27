import { EyeOpenIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { useViews } from '~/shared/hooks/useViews';

interface ViewsProps {
	slug: string;
	title?: string;
}

export function Views({ slug, title }: ViewsProps) {
	const { views } = useViews(slug as string);

	return (
		<span
			className={clsx(
				'absolute right-4 bottom-4 flex items-center gap-2 px-2 py-1 bg-surface-two/80 rounded-lg'
			)}
		>
			<EyeOpenIcon width={18} height={18} />
			<span className="text-xs">{views ?? '--'}</span>
		</span>
	);
}
