import clsx from 'clsx';
import type { Snippet } from '~/pages/snippets/_utils';

function SnippetCard({ snippet }: { snippet: Snippet }) {
	const { title, description, tags, url } = snippet;

	return (
		<div
			className={clsx(
				'flex flex-col gap-2 p-4 rounded-md shadow-md',
				'border-t border-brand bg-surface-two transition-colors duration-200 ease-in-out'
			)}
		>
			<a href={url}>
				<h5 className="hover:text-brand">{title}</h5>
			</a>
			<p className="text-sm md:text-base first-letter:uppercase">{description}</p>
			<div className="flex flex-wrap mt-auto gap-2">
				{tags.split(',').map((tag) => (
					<span
						key={tag}
						className={clsx(
							'text-xs px-2 py-1 rounded-sm',
							'first-letter:capitalize bg-surface-four'
						)}
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}

interface SnippetsListProps {
	snippets: Snippet[];
}

export function SnippetsList({ snippets }: SnippetsListProps) {
	return (
		<div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{snippets.map((snippet) => (
				<SnippetCard key={snippet.order} snippet={snippet} />
			))}
		</div>
	);
}
