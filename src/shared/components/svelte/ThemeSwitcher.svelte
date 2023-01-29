<script lang="ts">
	import clsx from 'clsx';
	import MoonIcon from '~/shared/icons/MoonIcon.svelte';
	import SunIcon from '~/shared/icons/SunIcon.svelte';

	function toggleMode() {
		const doc = document.documentElement;
		const isDarkMode = doc.classList.contains('dark');

		if (isDarkMode) {
			doc.classList.remove('dark');
			window.localStorage.mode = 'light';
		} else {
			doc.classList.add('dark');
			window.localStorage.mode = 'dark';
		}
	}
</script>

<button
	type="button"
	aria-label="Toggle dark mode"
	class={clsx(
		'px-3 py-2 transition rounded-full shadow-lg group bg-white/90 shadow-zinc-800/5',
		'ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-teal-500/50'
	)}
	on:click={toggleMode}
>
	<MoonIcon
		styles={clsx(
			'hidden h-6 w-6 fill-zinc-700 stroke-teal-500 transition dark:block',
			'[@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-400',
			'[@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10',
			'[@media_not_(prefers-color-scheme:dark)]:stroke-teal-500'
		)}
	/>
	<SunIcon
		styles={clsx(
			'h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200',
			' group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50',
			'[@media(prefers-color-scheme:dark)]:stroke-teal-500',
			'[@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50',
			'[@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600'
		)}
	/>
</button>
