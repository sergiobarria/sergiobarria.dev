<script lang="ts">
	import { onMount } from 'svelte';
	import clsx from 'clsx';
	import { Switch } from '@rgossiaux/svelte-headlessui';

	let checked = false;

	function toggleTheme(e: CustomEvent<boolean>) {
		checked = e.detail;
		const doc = document.firstElementChild;
		const themePreference = checked ? 'dark' : 'light';

		doc?.setAttribute('data-theme', themePreference);
		localStorage.setItem('theme-preference', themePreference);
	}

	onMount(() => {
		const themePreference = localStorage.getItem('theme-preference');
		if (themePreference) {
			checked = themePreference === 'dark';
		}
	});
</script>

<Switch
	{checked}
	on:change={(e) => toggleTheme(e)}
	class={clsx(
		'relative inline-flex items-center rounded-full h-6 w-11',
		checked ? 'bg-brand-accent' : 'bg-surface-four'
	)}
>
	<span class="sr-only">toggle theme</span>
	<span
		class={clsx(
			'flex items-center justify-center',
			'inline-block w-4 h-4 transform rounded-full transition ease-in-out duration-200',
			checked ? 'translate-x-6 bg-surface-four' : 'translate-x-1 bg-white'
		)}
	>
		{#if !checked}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-3 h-3 text-black"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-3 h-3 text-white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
				/>
			</svg>
		{/if}
	</span>
</Switch>
