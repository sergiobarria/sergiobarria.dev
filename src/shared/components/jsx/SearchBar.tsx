import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import { searchQuery as nSearchQuery } from '~/stores';
import { useDebounce } from '~/shared/hooks';

import styles from './SearchBar.module.scss';

export const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	useEffect(() => {
		nSearchQuery.set(debouncedSearchQuery);
	}, [debouncedSearchQuery]);

	return (
		<form>
			<label htmlFor="search-bar" className={styles.srOnly}>
				Search
			</label>
			<div className={styles.searchContainer}>
				<div className={styles.iconContainer}>
					<Icon icon="material-symbols:search" width={24} height={24} />
				</div>
				<input
					id="search-bar"
					type="text"
					placeholder="Search posts by names..."
					aria-label="Search posts by names"
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</form>
	);
};
