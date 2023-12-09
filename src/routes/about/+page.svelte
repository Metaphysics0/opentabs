<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import SocialLinks from '../../ui/SocialLinks.svelte';

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

<main class="mt-10 w-5/6 mx-auto">
	<h3 class="text-center text-4xl font-bold mb-3">FAQ's</h3>
	<section class="mx-auto bg-slate rounded-md shadow-md">
		<Accordion hover="hover:bg-blue-300 hover:bg-opacity-40 transition ease text-2xl">
			{#each disclosureItems as disclosureItem, idx}
				<AccordionItem open={idx === 0}>
					<svelte:fragment slot="lead">
						<Icon icon={disclosureItem.icon} />
					</svelte:fragment>
					<svelte:fragment slot="summary">{disclosureItem.summary}</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="mt-2">
							{@html disclosureItem.content}
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</section>
</main>
