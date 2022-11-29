import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { searchQuery as nSearchQuery } from '~/stores';
import { useDebounce } from '~/shared/hooks';

import clsx from 'clsx';

export const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		nSearchQuery.set(debouncedSearchQuery);
	}, [debouncedSearchQuery]);

	return (
		<form>
			<label htmlFor="search-bar" className="sr-only">
				Search
			</label>
			<div className="relative mb-7">
				<div className="absolute top-0 bottom-0 left-0 flex items-center pl-6">
					<MagnifyingGlassIcon width={24} height={24} />
				</div>
				<input
					id="search-bar"
					type="text"
					placeholder="Search posts by names..."
					aria-label="Search posts by names"
					onChange={(e) => setSearchQuery(e.target.value)}
					className={clsx(
						'block w-full mt-6 pl-14 pr-4 py-3 bg-surface-two',
						'text-font-two rounded-lg',
						'focus:ring-brand-accent focus:border-none'
					)}
				/>
			</div>
		</form>
	);
};
