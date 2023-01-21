<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	onMount(() => {
		animate(
			'#bar1',
			{
				transform: [
					'scaleY(1.0) translateY(0rem)',
					'scaleY(1.5) translateY(-0.082rem)',
					'scaleY(1.0) translateY(0rem)',
				],
			},
			{
				duration: 0.5,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar2',
			{
				transform: [
					'scaleY(1.0) translateY(0rem)',
					'scaleY(3) translateY(-0.083rem)',
					'scaleY(1.0) translateY(0rem)',
				],
			},
			{
				delay: 0.2,
				duration: 0.75,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar3',
			{
				transform: [
					'scaleY(1.0)  translateY(0rem)',
					'scaleY(0.5) translateY(0.37rem)',
					'scaleY(1.0)  translateY(0rem)',
				],
			},
			{
				delay: 0.3,
				duration: 0.75,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
		animate(
			'#bar4',
			{
				transform: [
					'scaleY(1.0)  translateY(0rem)',
					'scaleY(0.5) translateY(0.37rem)',
					'scaleY(1.0)  translateY(0rem)',
				],
			},
			{
				delay: 0.4,
				duration: 1,
				repeat: Infinity,
				easing: ['ease-in-out'],
			}
		);
	});
</script>

<div class="flex items-end w-auto gap-0.5 overflow-hidden">
	<span id="bar1" class="w-[2px] h-[6px] bg-green-500" />
	<span id="bar2" class="w-[2px] h-[8px] bg-green-500" />
	<span id="bar3" class="w-[2px] h-[10px] bg-green-500" />
	<span id="bar4" class="w-[2px] h-[12px] bg-green-500" />
</div>
