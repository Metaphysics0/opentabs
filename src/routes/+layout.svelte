<script>
	import '../app.pcss';
	import Navbar from '../ui/Navbar.svelte';
	import Logo from '../ui/typography/Logo.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Toast />
<Navbar />
<slot />
