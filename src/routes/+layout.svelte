<script>
	import '../app.pcss';
	import Header from '../ui/typography/Header.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Toast />
<Header />
<slot />
