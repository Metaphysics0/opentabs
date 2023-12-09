<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	const disclosureItems: { icon: string; summary: string; content: string; isOpen?: boolean }[] = [
		{
			icon: 'ph:question',
			summary: 'How does this website work?',
			content:
				'I am pulling the publicly hosted data from popular guitar tabliture viewing websites, and aggregating them to appear here.'
		},
		{
			icon: 'solar:code-bold-duotone',
			summary: 'Who developed this website?',
			content: `Just me, Ryan. I am the only developer of this project. You can see more of my works at
        <a href="/" class="text-blue-400 hover:text-blue-500 ease">&nbsp;fullstackservices.io</a>
      `
		}
	];
</script>

<main class="mt-10">
	<section class="w-5/6 mx-auto bg-slate">
		<Accordion hover="hover:bg-red text-2xl">
			{#each disclosureItems as disclosureItem, idx}
				<AccordionItem open>
					<svelte:fragment slot="lead">
						<Icon icon={disclosureItem.icon} />
					</svelte:fragment>
					<svelte:fragment slot="summary">{disclosureItem.summary}</svelte:fragment>
					<svelte:fragment slot="content">
						{@html disclosureItem.content}
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</section>
</main>
