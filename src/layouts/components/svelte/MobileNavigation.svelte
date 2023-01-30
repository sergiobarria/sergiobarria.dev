<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		Popover,
		PopoverButton,
		PopoverPanel,
		PopoverOverlay,
	} from '@rgossiaux/svelte-headlessui';
	import clsx from 'clsx';

	import { navLinks } from '../../../../site.json';

	export let pathname: string;
	let links = [{ id: 99, label: 'Home', href: '/', number: 0 }, ...navLinks];
</script>

<Popover class="relative mr-3 md:hidden">
	<PopoverButton
		class={clsx(
			'flex items-center px-4 py-2 gap-3 rounded-full group bg-white/90 text-zinc-800',
			'shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90',
			'dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20'
		)}
		><span class="text-sm">Menu</span><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-3 h-3"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	</PopoverButton>

	<!-- Popover Overlay -->
	<PopoverOverlay class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />

	<!-- Popover Content -->
	<PopoverPanel
		focus
		class={clsx(
			'fixed z-50 origin-top inset-x-4 rounded-3xl bg-white dark:bg-zinc-900 p-8',
			'ring-zinc-900/50 dark:ring-zinc-800'
		)}
	>
		<div class="flex flex-row-reverse items-center justify-between">
			<PopoverButton>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</PopoverButton>
			<h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Mobile Navigation</h2>
		</div>

		<!-- Mobile Navigation Links -->
		<nav class="mt-6">
			<ul class="-my-2 text-base divide-y divide-zinc-100 text-zinc-800 dark:divide-zinc-100/5">
				{#each links as link, idx (link.id)}
					<li in:fade={{ duration: 500, delay: 100 * idx }}>
						<PopoverButton
							as="a"
							href={link.href}
							class={clsx('block text-zinc-800 dark:text-zinc-100 py-2', {
								'font-medium text-teal-500 dark:text-teal-500': pathname === link.href,
							})}
						>
							{link.label}
						</PopoverButton>
					</li>
				{/each}
			</ul>
		</nav>
	</PopoverPanel>
</Popover>
