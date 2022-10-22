import React, { useEffect, useRef } from 'react';

interface Dimensions {
	width: number;
	height: number;
}

export function useDimensions(ref: React.MutableRefObject<any>): Dimensions {
	const dimensions = useRef<Dimensions>({ width: 0, height: 0 });

	useEffect(() => {
		dimensions.current.width = ref.current.offsetWidth;
		dimensions.current.height = ref.current.offsetHeight;
	}, []);

	return dimensions.current;
}
