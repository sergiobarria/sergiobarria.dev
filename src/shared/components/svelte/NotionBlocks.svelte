<script lang="ts">
	import clsx from 'clsx';

	export let blocks: any[];
	const blockTypes = new Set(blocks.map((block) => block.type));
	const test = blocks.filter((block) => block.type === 'paragraph');
	console.log(
		'test: ',
		test[1].paragraph.rich_text[3]
		// test.forEach((block) => console.log(block.paragraph))
	);

	enum BlockType {
		Paragraph = 'paragraph',
		Heading1 = 'heading_1',
		Heading2 = 'heading_2',
		Heading3 = 'heading_3',
		BulletedList = 'bulleted_list_item',
		NumberedList = 'numbered_list_item',
		Code = 'code',
		Quote = 'callout',
		Image = 'image',
	}

	// Block types
	//   blockTypes Set(8) {
	//   'table_of_contents',
	//   'heading_2',
	//   'paragraph',
	//   'bulleted_list_item',
	//   'code',
	//   'heading_3',
	//   'image',
	//   'callout'
	// }
</script>

<!-- <div class={clsx(theme === 'night' ? 'dark:prose-invert' : 'prose')}> -->
<div>
	{#each blocks as block (block.id)}
		<!-- Headings -->
		{#if block.type === BlockType.Heading2}
			<h2>{block.heading_2.rich_text[0].plain_text}</h2>
		{/if}
		{#if block.type === BlockType.Heading3}
			<h3>{block.heading_3.rich_text[0].plain_text}</h3>
		{/if}

		<!-- Paragraph -->
		{#if block.type === BlockType.Paragraph}
			{#each block.paragraph.rich_text as p}
				{#if !p.href}
					{#if p.annotations.code}
						<code class="code-inline">{p.plain_text}</code>
					{:else if p.annotations.bold}
						<p class="inline font-semibold">{p.plain_text}</p>
					{:else}
						<p
							class={clsx('inline', {
								italic: p.annotations.italic,
								underline: p.annotations.underline,
								strikethrough: p.annotations.strikethrough,
							})}
						>
							{p.plain_text}
						</p>
					{/if}
				{:else}
					<a href={p.href} class="inline decoration-wavy decoration-brand">
						<span class="inline italic text-brand-accent hover:text-brand-accent/90"
							>{p.plain_text.trim()}</span
						>
					</a>
				{/if}
			{/each}
		{/if}

		<!-- Bullet list -->
		<ul>
			{#if block.type === BlockType.BulletedList}
				{#each block.bulleted_list_item.rich_text as p}
					{#if !p.href}
						<li>
							<p class="inline">{p.plain_text}</p>
						</li>
					{:else}
						<a href={p.href} class="inline">
							<span class="inline">{p.plain_text.trim()}</span>
						</a>
					{/if}
				{/each}
			{/if}
		</ul>

		<!-- Code blocks -->
		{#if block.type === BlockType.Code}
			<pre class="rounded-lg py-0 bg-slate-800">
        <code class="text-sm m-0 py-0 font-mono bg-transparent"
					>{block.code.rich_text[0].plain_text}</code
				>
      </pre>
		{/if}

		<!-- Images -->
		{#if block.type === BlockType.Image}
			<img
				src={block.image.external.url}
				alt={block.image.caption[0]?.plain_text || ''}
				class="w-full"
			/>
		{/if}
	{/each}
</div>
