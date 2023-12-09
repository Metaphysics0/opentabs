<script>
	import { page } from '$app/stores';
	import Logo from './typography/Logo.svelte';

	const navLinks = [
		{ label: 'About', href: '/about' },
		{ label: 'Home', href: '/' }
	];
</script>

<nav class="flex items-center w-full justify-between py-4 px-4 w-calc">
	<Logo />
	<div class="">
		{#each navLinks as navLink}
			<a
				href={navLink.href}
				class:font-extrabold={$page.url.pathname === navLink.href}
				class="text-xl mx-3">{navLink.label}</a
			>
		{/each}
	</div>
</nav>
