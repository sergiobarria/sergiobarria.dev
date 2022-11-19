import React, { useState } from 'react';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import Lightbox from 'react-image-lightbox';

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
}

export function CloudinaryImage({
	publicId,
	alt,
	width,
	height,
	isThumbnail = false,
	radius = 0,
	preview = false,
}: CloudinaryImageProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const image = myCloud.image(publicId);

	if (isThumbnail) image.resize(thumbnail());

	if (radius) image.roundCorners(byRadius(radius));

	if (width) image.resize(fill().width(width));

	if (height) image.resize(fill().height(height));

	const imageUrl = image.toURL();

	return (
		<figure>
			<div onClick={preview ? () => setIsOpen(true) : undefined}>
				<AdvancedImage
					cldImg={image}
					plugins={[lazyload(), responsive(), placeholder({ mode: 'blur' })]}
					alt={alt}
				/>
			</div>
			{isOpen && <Lightbox mainSrc={imageUrl} onCloseRequest={() => setIsOpen(false)} />}
		</figure>
	);
}
