<script lang="ts">
	import clsx from 'clsx';

	interface Heading {
		depth: number;
		slug: string;
		text: string;
	}

	export let headings: Heading[];

	console.log('HEADINGS FROM TOC', headings);
</script>

<div>
	<h2 class="font-semibold text-2xl md:text-3xl">Table of Contents</h2>
	<ul class="mt-4">
		{#each headings as heading}
			<li class="mt-2">
				<a
					href={`#${heading.slug}`}
					class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
				>
					<span class={clsx(heading.depth === 3 && 'ml-6')}>{heading.text}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
