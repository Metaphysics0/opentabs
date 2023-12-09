<script lang="ts">
	import { apiService } from '$lib/apiService';
	import { originUrlMap } from '$lib/constants/origin-url';
	import { SupportedResources } from '$lib/types/enums';
	import { triggerDownloadFromResponse } from '$lib/utils/triggerDownloadFromResponse';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let searchResult: SearchResult;
	export let index: number;

	async function downloadTab() {
		try {
			const response = await apiService.download.fromAny(searchResult);
			if (response) {
				console.log('download response:', response);
				triggerDownloadFromResponse(response);
			}
			// if (searchResult.origin === SupportedResources.SONGSTERR) {
			// 	const response = await apiService.download.fromSongsterr({
			// 		songId: searchResult!.metadata!.songId! as string,
			// 		songTitle: searchResult.songTitle,
			// 		artist: searchResult.artistName
			// 	});
			// 	triggerDownloadFromResponse(response);
			// 	return;
			// }

			// if (searchResult.origin === SupportedResources.ULTIMATE_GUITAR) {
			// 	const response = await apiService.download.fromUltimateGuitar({
			// 		searchResult
			// 	});
			// 	triggerDownloadFromResponse(response);
			// 	return;
			// }
		} catch (error) {
			console.error('error fetching', error);
		}
	}

	const metadataTooltip: PopupSettings = {
		event: 'hover',
		target: `metadataTooltip-${index}`,
		placement: 'top'
	};

	const downloadTooltip: PopupSettings = {
		event: 'hover',
		target: `downloadTooltip-${index}`,
		placement: 'right'
	};
</script>

<div class="text-xl flex items-end justify-between rounded-md shadow p-3 my-3">
	<div class="flex">
		<p>
			<strong class="font-medium">
				{searchResult.songTitle}
			</strong>
			<span class="mx-1 font-light text-slate-700"> by </span>
			<strong class="font-medium">
				{searchResult.artistName}
			</strong>
		</p>
		<p class="text-lg"></p>
	</div>
	<div class="flex items-center">
		<div class="[&>*]:pointer-events-none mr-10" use:popup={metadataTooltip}>
			<Icon class="text-2xl opacity-50" icon="material-symbols:info" />
		</div>
		<button
			class="btn-icon bg-blue-400 text-white text-2xl"
			use:popup={downloadTooltip}
			on:click={downloadTab}
		>
			<Icon icon="material-symbols:download" />
		</button>
	</div>
</div>

<!-- metadata toolitp -->
<div class="card p-4 bg-white shadow" data-popup={metadataTooltip.target}>
	Origin: <a class="text-blue-500" href={searchResult.origin} target="_blank"
		>{originUrlMap[searchResult.origin]}</a
	>
	<div class="arrow bg-white shadow" />
</div>

<!-- Download Tooltip -->
<div class="card p-4 bg-white shadow" data-popup={downloadTooltip.target}>
	Download
	<div class="arrow bg-white shadow" />
</div>
