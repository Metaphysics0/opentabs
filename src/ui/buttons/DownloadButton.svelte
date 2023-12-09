<script lang="ts">
	import { apiService } from '$lib/apiService';
	import { triggerDownloadFromResponse } from '$lib/utils/triggerDownloadFromResponse';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import { uniqueId } from 'lodash-es';
	const toastStore = getToastStore();

	export let searchResult: SearchResult;
	async function downloadTab() {
		try {
			const response = await apiService.download.fromAny(searchResult);
			if (response.error) {
				toastStore.trigger({
					message: 'Error downloading tab 😭',
					background: 'variant-filled-error'
				});
			}

			if (response) {
				triggerDownloadFromResponse(response);
			}
		} catch (error) {
			console.error('error fetching', error);
		}
	}

	const downloadTooltip: PopupSettings = {
		event: 'hover',
		target: `downloadTooltip-${uniqueId()}`,
		placement: 'right'
	};
</script>

<button
	class="btn-icon bg-blue-400 text-white text-2xl"
	use:popup={downloadTooltip}
	on:click={downloadTab}
>
	<Icon icon="material-symbols:download" />
</button>

<div class="text-base card p-4 bg-white shadow" data-popup={downloadTooltip.target}>
	Download
	<div class="arrow bg-white shadow" />
</div>
