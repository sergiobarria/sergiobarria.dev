import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { searchQuery as nSearchQuery } from '~/stores';
import { useDebounce } from '~/shared/hooks';

export const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		nSearchQuery.set(debouncedSearchQuery);
	}, [debouncedSearchQuery]);

	return (
		<form>
			<label
				htmlFor="search-bar"
				className="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-neutral-300"
			>
				Search
			</label>
			<div className="relative">
				<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					id="search-bar"
					type="text"
					placeholder="Search posts by names..."
					aria-label="Search posts by names"
					onChange={(e) => setSearchQuery(e.target.value)}
					className={clsx(
						'block p-4 pl-10 w-full text-sm text-gray-900 bg-neutral-50 rounded-md',
						'boder boder-gray-300 focus:ring-accent focus:border-accent',
						'dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder:neutral-400',
						'dark:text-typography dark:focus:ring-accent dark:focus:border-accent'
					)}
				/>
			</div>
		</form>
	);
};
