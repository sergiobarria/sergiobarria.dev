import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface SearchBarProps {
	label: string;
	setQuery: (query: string) => void;
}

export function SearchBar({ label, setQuery }: SearchBarProps) {
	return (
		<form>
			<label htmlFor="posts-search-bar" className="sr-only">
				{' '}
				{label}{' '}
			</label>
			<div className="relative mb-7">
				<div className="absolute top-0 bottom-0 left-0 flex items-center pl-6">
					<MagnifyingGlassIcon />
				</div>
				<input
					id="posts-search-bar"
					type="text"
					placeholder="Search posts..."
					aria-label="Search posts"
					className={clsx(
						'block w-full mt-6 pl-14 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800',
						'text-font-two rounded-full',
						'focus:ring-teal-500 focus:border-none'
					)}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
		</form>
	);
}
