import clsx from 'clsx';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';

import { usePagination, SEPARATOR } from '~/shared/hooks';

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
		<nav className="flex items-center mt-5">
			<ul className="flex items-center justify-center w-full gap-6">
				{/* Left arrow */}
				<li
					onClick={onPrev}
					className={clsx(
						currentPage > 1 && 'cursor-pointer bg-white rounded-full p-1 text-surface-one',
						currentPage === 1 && 'cursor-not-allowed text-font-two opacity-60'
					)}
				>
					<ArrowLeftIcon width={18} height={18} />
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
								'flex items-center justify-center w-8 h-8 md:w-12 md:h-12 p-2 rounded-full',
								'cursor-pointer transform transition-all duration-200 ease-in-out',
								page !== currentPage &&
									'bg-surface-two opacity-90 hover:scale-105 bg-brand-accent/80 text-surface-one',
								page === currentPage && 'bg-brand-accent text-surface-one cursor-not-allowed'
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
						'hover:bg-surface-four',
						currentPage < lastPage &&
							'cursor-pointer bg-surface-three rounded-full p-1 text-surface-one',
						currentPage === lastPage && 'cursor-not-allowed text-font-two opacity-60'
					)}
				>
					<ArrowRightIcon width={18} height={18} />
				</li>
			</ul>
		</nav>
	);
};
