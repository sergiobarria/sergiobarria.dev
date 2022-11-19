import clsx from 'clsx';
import { Icon } from '@iconify/react';

import { usePagination, SEPARATOR } from '~/shared/hooks';

import styles from './Pagination.module.scss';

interface PaginationProps {
	className?: string;
	currentPage: number;
	total: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
}

export const Pagination = ({
	className,
	currentPage,
	total,
	pageSize,
	onPageChange,
	siblingCount = 1,
}: PaginationProps) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount: total,
		siblingCount,
		pageSize,
	});

	// If there are less than 2 times in pagination rage then we don't need to render pagination
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		if (currentPage < paginationRange[paginationRange.length - 1]) {
			onPageChange(currentPage + 1);
		}
	};

	const onPrev = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	return (
		<nav className={styles.nav}>
			<ul className={styles.pagination}>
				{/* Left arrow */}
				<li
					onClick={onPrev}
					className={clsx(
						currentPage > 1 && styles.arrowActive,
						currentPage === 1 && styles.arrowDisabled
					)}
				>
					<Icon icon="material-symbols:arrow-circle-left-rounded" width={32} height={32} />
				</li>

				{/* Render pages numbers */}
				{paginationRange.map((page) => {
					// If the page is a separator then render separator
					if (page === SEPARATOR) {
						return (
							<li key={page}>
								<span>&#8230;</span>
							</li>
						);
					}

					return (
						<li
							key={page}
							className={clsx(
								styles.number,
								page !== currentPage && styles.numberInactive,
								page === currentPage && styles.numberActive
							)}
							onClick={() => onPageChange(Number(page))}
						>
							{page}
						</li>
					);
				})}

				{/* Right arrow */}
				<li
					onClick={onNext}
					className={clsx(
						currentPage < lastPage && styles.arrowActive,
						currentPage === lastPage && styles.arrowDisabled
					)}
				>
					<Icon icon="material-symbols:arrow-circle-right" width={32} height={32} />
				</li>
			</ul>
		</nav>
	);
};
