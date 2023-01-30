<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { CollectionEntry } from 'astro:content';
	import clsx from 'clsx';
	import { format } from 'date-fns';

	export let post: CollectionEntry<'blog'>;

	const { title, coverImage, publishedDate, readingTime } = post?.data;

	const formattedDate = format(new Date(publishedDate), 'MMM dd, yyyy');
</script>

<article
	class={clsx(
		'flex flex-col h-full bg-surface-two rounded-lg shadow-lg overflow-hidden',
		'transition-all duration-200 ease-out hover:scale-105'
	)}
	transition:fade={{ duration: 100 }}
>
	<div class="relative rounded-tl-lg rounded-tr-lg">
		<!-- TODO: Add Lazy loading for cover image -->
		<img src={coverImage} alt={title} />
	</div>
	<div class="flex flex-col justify-between h-full p-3">
		<a href={`/blog/${post?.slug}`}>
			<h3 class="hover:text-brand-accent cursor-pointer">{title}</h3>
		</a>
		<div class="flex items-center mt-2 text-font-two">
			<p class="flex items-center gap-3 mr-4 pr-4 border-r-[1px] border-font-two">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
					/>
				</svg>

				<time>{formattedDate}</time>
			</p>
			<p class="flex items-center gap-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>

				<span>{readingTime ?? '--'} min read</span>
			</p>
		</div>
	</div>
</article>
