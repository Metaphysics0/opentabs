<script lang="ts">
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { uniqueId } from 'lodash-es';

	export let searchResult: SearchResult;

	const visitPageTooltip: PopupSettings = {
		event: 'hover',
		target: `visitPageTooltip-${uniqueId()}`,
		placement: 'right'
	};
</script>

<a
	class="btn-icon bg-blue-400 text-white text-2xl"
	use:popup={visitPageTooltip}
	href={searchResult.originUrl}
	target="_blank"
>
	<Icon icon="tabler:external-link" />
</a>

<div class="text-base card p-4 bg-white shadow" data-popup={visitPageTooltip.target}>
	Go to download
	<div class="arrow bg-white shadow" />
</div>
