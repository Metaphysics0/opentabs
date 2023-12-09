<script lang="ts">
	import Icon from '@iconify/svelte';
	const socialLinks: { href: string; icon: string }[] = [
		{
			href: 'https://github.com/Metaphysics0/opentabs',
			icon: 'fa-github'
		},
		{
			href: 'https://www.instagram.com/mathrockryan/',
			icon: 'fa-instagram'
		},
		{
			href: 'https://www.linkedin.com/in/ryanroberts0/',
			icon: 'fa-linkedin'
		}
	];
</script>

<section class="flex items-center mx-auto w-fit text-2xl mt-32 mb-3">
	{#each socialLinks as socialLink}
		<a
			href={socialLink.href}
			target="_blank"
			rel="noreferrer"
			class="h-full mx-2.5 opacity-50 hover:opacity-100 transition-opacity"
		>
			<Icon icon={socialLink.icon} />
		</a>
	{/each}
</section>
