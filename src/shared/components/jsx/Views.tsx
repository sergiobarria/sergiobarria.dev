import clsx from 'clsx';

import { useViews } from '~/shared/hooks/useViews';

function ViewsIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
			/>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
		</svg>
	);
}

interface ViewsProps {
	slug?: string;
	title?: string;
}

export function Views({ slug, title }: ViewsProps) {
	const postSlug = slug || title?.toLowerCase().replace(/ /g, '-') || '';
	const { views } = useViews(postSlug);

	return (
		<span
			className={clsx(
				'absolute bottom-2 right-2 flex items-center space-x-1',
				'bg-amber-500 px-2 py-[2px] rounded-md'
			)}
		>
			<ViewsIcon className="w-4 h-4" />
			<span>{views ?? '--'}</span>
		</span>
	);
}
