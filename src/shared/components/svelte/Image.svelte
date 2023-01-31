<script lang="ts">
	import ImageKit from 'imagekit-javascript';
	import clsx from 'clsx';

	export let path: string = '';
	export let src: string = '';
	export let alt: string = '';
	export let styles: string = '';
	export let transformations = {};

	const imagekit = new ImageKit({
		urlEndpoint: 'https://ik.imagekit.io/l5swuiqdn',
	});

	const imageUrlFromPath = imagekit.url({
		path,
		urlEndpoint: 'https://ik.imagekit.io/l5swuiqdn/personal-website',
		transformation: [
			{
				...transformations,
			},
		],
	});

	const imageUrlFromSrc = imagekit.url({
		src,
		transformation: [
			{
				...transformations,
			},
		],
	});

	const lowQualityImageFromSrc = imagekit.url({
		src,
		transformation: [
			{
				...transformations,
				blur: '100',
			},
		],
	});
</script>

{#if imageUrlFromSrc}
	<img
		loading="lazy"
		src={imageUrlFromSrc}
		{alt}
		class={clsx(styles)}
		style={`"background:url(${lowQualityImageFromSrc}) no-repeat; 
	width:1920px;
	height:1200px"`}
	/>
{:else if imageUrlFromPath}
	<img loading="lazy" src={imageUrlFromPath} {alt} class={clsx(styles)} />
{/if}
