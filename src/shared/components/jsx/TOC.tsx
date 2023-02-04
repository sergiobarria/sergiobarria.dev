import clsx from 'clsx';

interface Heading {
	depth: number;
	slug: string;
	text: string;
}

interface TOCProps {
	headings: Heading[];
}

export function TOC({ headings }: TOCProps) {
	return (
		<div>
			<h2 className="font-semibold text-2xl md:text-3xl">Table of Contents</h2>
			<ul className="mt-4">
				{headings.map((heading) => (
					<li className="mt-2">
						<a
							href={`#${heading.slug}`}
							className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
						>
							<span className={clsx(heading.depth === 3 && 'ml-6')}>{heading.text}</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
