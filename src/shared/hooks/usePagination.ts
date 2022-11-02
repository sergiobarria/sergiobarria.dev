import { useMemo } from 'react';

export const SEPARATOR = '...';

const range = (start: number, end: number) => {
	let length = end - start + 1;

	// Create array of certain length and set the elements within it from start value to end value
	return Array.from({ length }, (_, i) => i + start);
};

interface PaginationProps {
	totalCount: number;
	pageSize: number;
	currentPage: number;
	siblingCount?: number;
}

export const usePagination = ({
	totalCount,
	pageSize,
	currentPage,
	siblingCount = 1,
}: PaginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// Pages count is determined as a siblingCount + firstPage + lastPage + currentPage + 2*separator
		const totalPageNumbers = siblingCount + 5;

		// Case 1: Not enough pages to be sliced
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

		// We don't want to show the separator if there is no sibling page on the left
		const shouldShowLeftSeparator = leftSiblingIndex > 2;
		const shouldShowRightSeparator = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		// Case 2: No left separator, but right separator
		if (!shouldShowLeftSeparator && shouldShowRightSeparator) {
			const leftItemCount = 2 + siblingCount + 2;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, SEPARATOR, lastPageIndex];
		}

		// Case 3: No right separator, but left separator
		if (shouldShowLeftSeparator && !shouldShowRightSeparator) {
			const rightItemCount = 2 + siblingCount + 2;
			const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

			return [firstPageIndex, SEPARATOR, ...rightRange];
		}

		// Case 4: Both left and right separator
		if (shouldShowLeftSeparator && shouldShowRightSeparator) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);

			return [firstPageIndex, SEPARATOR, ...middleRange, SEPARATOR, lastPageIndex];
		}

		return [];
	}, [totalCount, pageSize, currentPage, siblingCount]);

	return paginationRange;
};
