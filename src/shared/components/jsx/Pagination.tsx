import React from 'react';
import clsx from 'clsx';

import { usePagination, SEPARATOR } from '~/shared/hooks';

const LeftArrowIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
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
			d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

const RightArrowIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
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
			d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

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
		<nav className="flex justify-center mt-6">
			<ul className="flex items-center space-x-3">
				{/* Left arrow */}
				<li
					onClick={onPrev}
					className={clsx({
						'cursor-pointer': currentPage > 1,
						'cursor-not-allowed text-neutral-200 dark:text-neutral-700': currentPage === 1,
					})}
				>
					<LeftArrowIcon />
				</li>

				{/* Render pages numbers */}
				{paginationRange.map((page) => {
					// If the page is a separator then render separator
					if (page === SEPARATOR) {
						return (
							<li key={page}>
								<span className="">&#8230;</span>
							</li>
						);
					}

					return (
						<li
							key={page}
							className={clsx(
								'px-3 py-1 rounded-md cursor-pointer transform transition-all duration-200',
								{
									'bg-neutral-500 hover:scale-[1.1]': page !== currentPage,
									'bg-accent cursor-not-allowed': page === currentPage,
								}
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
					className={clsx({
						'cursor-pointer': currentPage < lastPage,
						'cursor-not-allowed text-neutral-200 dark:text-neutral-700': currentPage === lastPage,
					})}
				>
					<RightArrowIcon />
				</li>
			</ul>
		</nav>
	);
};
