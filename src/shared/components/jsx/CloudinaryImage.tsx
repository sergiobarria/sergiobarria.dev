import React, { useState } from 'react';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius, max, RoundCorners } from '@cloudinary/url-gen/actions/roundCorners';
import { BorderAction, Border, solid } from '@cloudinary/url-gen/actions/border';
import { outline } from '@cloudinary/url-gen/actions/effect';
import { outer } from '@cloudinary/url-gen/qualifiers/outlineMode';

const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_ID ?? '';

const myCloud = new Cloudinary({
	cloud: {
		cloudName: CLOUD_NAME,
	},
});

interface CloudinaryImageProps {
	publicId: string;
	alt: string;
	width?: number;
	height?: number;
	isThumbnail?: boolean;
	radius?: number;
	preview?: boolean;
	rounded?: boolean;
	square?: boolean;
	borders?: boolean;
}

export function CloudinaryImage({
	publicId,
	alt,
	width,
	height,
	isThumbnail = false,
	radius = 0,
	preview = false,
	rounded = false,
	square = false,
	borders = false,
}: CloudinaryImageProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const image = myCloud.image(publicId);

	if (isThumbnail) image.resize(thumbnail());

	if (radius) image.roundCorners(byRadius(radius));

	if (width) image.resize(fill().width(width));

	if (height) image.resize(fill().height(height));

	if (rounded) image.roundCorners(max());

	if (rounded) image.resize(fill().width(500).height(500)).roundCorners(max());

	// const imageUrl = image.toURL();

	// Transform image format from png to webp
	image.format('auto').quality('auto');

	return (
		<AdvancedImage
			cldImg={image}
			plugins={[lazyload(), responsive(), placeholder({ mode: 'blur' })]}
			alt={alt}
		/>
	);
}
