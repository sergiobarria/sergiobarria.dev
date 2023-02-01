<script lang="ts">
	import clsx from 'clsx';

	export let number: number;
	export let title: string;
</script>

<div class="flex items-center gap-x-3">
	<div
		class={clsx(
			'flex items-center justify-center w-8 h-8 font-semibold',
			'text-brand p-4 rounded-full border border-brand font-marker'
		)}
	>
		{number}
	</div>
	<h3 class="mt-2">{title}</h3>
</div>
