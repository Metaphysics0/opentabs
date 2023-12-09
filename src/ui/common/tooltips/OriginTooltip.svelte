<script lang="ts">
	import { originUrlMap } from '$lib/constants/origin-url';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { uniqueId } from 'lodash-es';

	export let searchResult: SearchResult;

	const metadataTooltip: PopupSettings = {
		event: 'hover',
		target: `metadataTooltip-${uniqueId()}`,
		placement: 'top'
	};
</script>

<div class="[&>*]:pointer-events-none mr-10" use:popup={metadataTooltip}>
	<Icon class="text-2xl opacity-50" icon="material-symbols:info" />
</div>

<div class="text-base card p-4 bg-white shadow" data-popup={metadataTooltip.target}>
	Origin: <a class="text-blue-500" href={searchResult.origin} target="_blank"
		>{originUrlMap[searchResult.origin]}</a
	>
	<div class="arrow bg-white shadow" />
</div>
