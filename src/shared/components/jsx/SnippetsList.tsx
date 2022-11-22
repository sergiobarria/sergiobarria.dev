import type { Snippet } from '~/pages/snippets/_utils';

import styles from './SnippetsList.module.scss';

function SnippetCard({ snippet }: { snippet: Snippet }) {
	const { title, description, tags, url } = snippet;

	return (
		<div className={styles.card}>
			<a href={url}>
				<h5>{title}</h5>
			</a>
			<p>{description}</p>
			<div className={styles.tags}>
				{tags.split(',').map((tag) => (
					<span key={tag}>{tag}</span>
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
		<div className={styles.grid}>
			{snippets.map((snippet) => (
				<SnippetCard key={snippet.order} snippet={snippet} />
			))}
		</div>
	);
}
