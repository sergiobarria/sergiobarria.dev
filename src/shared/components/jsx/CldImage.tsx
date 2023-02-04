import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, responsive, accessibility, placeholder } from '@cloudinary/react';
import { grayscale } from '@cloudinary/url-gen/actions/effect';
import { fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';

const CLOUD_NAME = 'sbarria-dev';

interface CldImageProps {
	publicId: string;
	alt: string;
	width?: number;
	height?: number;
	isGrayscale?: boolean;
	isThumbnail?: boolean;
	radius?: number;
	className?: string;
	rotate?: number;
}

export function CldImage({
	publicId,
	alt,
	width,
	height,
	radius,
	isGrayscale,
	isThumbnail,
	className,
	rotate,
}: CldImageProps) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: CLOUD_NAME,
		},
	});

	const img = cld.image(publicId);

	// image resize
	if (isThumbnail) img.resize(thumbnail());
	if (width) img.resize(fill().width(width));
	if (height) img.resize(fill().height(height));
	if (radius) img.roundCorners(byRadius(radius));

	// image transformations
	if (rotate) img.rotate(byAngle(rotate));

	// image effects
	if (isGrayscale) img.effect(grayscale());

	// image quality
	img.format('auto').quality('auto');

	return (
		<div className={className}>
			<AdvancedImage
				cldImg={img}
				alt={alt}
				plugins={[lazyload(), responsive(), accessibility(), placeholder({ mode: 'blur' })]}
			/>
		</div>
	);
}
